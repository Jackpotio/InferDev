
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyResult } from './entities/survey-result.entity';
import { SubmittedAnswer } from './entities/submitted-answer.entity';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
import { SurveyQuestion } from './entities/survey-question.entity';
import { SurveyOption } from './entities/survey-option.entity';
import { Job } from './entities/job.entity';
import { JobDetail } from './entities/job-detail.entity';
import { CareerTrack } from './entities/career-track.entity';

const DEFAULT_QUESTION_WEIGHT = 1.0;
const SPECIFIC_QUESTION_WEIGHT = 1.5;
const CORE_QUESTION_WEIGHT = 2.0;

const SPECIFIC_QUESTION_IDS = new Set<number>([2]);
const CORE_QUESTION_IDS = new Set<number>([3]);

type TraitScoreMap = Record<string, number>;

const JOB_TRAIT_WEIGHTS: Record<string, TraitScoreMap> = {
  web_frontend: { UI: 1.3, CREATIVE: 1.2, COMM: 1.0, LOGIC: 0.8 },
  frontend_platform: { LOGIC: 1.2, UI: 1.0, SYSTEM: 0.9, COMM: 0.7 },
  ui_engineer: { UI: 1.4, CREATIVE: 1.2, LOGIC: 0.8, COMM: 0.8 },
  api_backend: { LOGIC: 1.3, SYSTEM: 1.1, DATA: 0.8, SECURITY: 0.8 },
  server_architect: { LOGIC: 1.4, SYSTEM: 1.3, SECURITY: 0.9, DATA: 0.8 },
  backend_platform: { SYSTEM: 1.3, LOGIC: 1.2, DATA: 0.9, SECURITY: 0.8 },
  ios_dev: { UI: 1.1, LOGIC: 1.1, CREATIVE: 0.9, COMM: 0.7 },
  android_dev: { UI: 1.0, LOGIC: 1.2, SYSTEM: 0.8, COMM: 0.7 },
  cross_mobile: { UI: 1.1, LOGIC: 1.1, COMM: 0.8, CREATIVE: 0.8 },
  ml_engineer: { AI: 1.4, DATA: 1.3, LOGIC: 1.0, SYSTEM: 0.8 },
  ai_researcher: { AI: 1.5, DATA: 1.1, LOGIC: 1.1, CREATIVE: 0.7 },
  data_scientist: { DATA: 1.4, AI: 1.1, LOGIC: 1.0, COMM: 0.8 },
  data_engineer: { DATA: 1.4, SYSTEM: 1.1, LOGIC: 1.0, SECURITY: 0.6 },
  bigdata_engineer: { DATA: 1.4, SYSTEM: 1.1, LOGIC: 1.0, SECURITY: 0.6 },
  devops_engineer: { SYSTEM: 1.4, LOGIC: 1.1, SECURITY: 1.0, DATA: 0.7 },
  sre: { SYSTEM: 1.5, LOGIC: 1.1, SECURITY: 1.0, DATA: 0.7 },
  cloud_engineer: { SYSTEM: 1.4, LOGIC: 1.0, SECURITY: 0.9, DATA: 0.7 },
  game_client: { CREATIVE: 1.3, UI: 1.1, LOGIC: 0.9, COMM: 0.7 },
  game_server: { LOGIC: 1.3, SYSTEM: 1.1, DATA: 0.8, COMM: 0.6 },
  security_engineer: { SECURITY: 1.5, SYSTEM: 1.1, LOGIC: 1.0, DATA: 0.7 },
  penetration_tester: { SECURITY: 1.6, SYSTEM: 1.0, LOGIC: 1.0, DATA: 0.6 },
  pm: { COMM: 1.4, CREATIVE: 1.1, LOGIC: 0.9, UI: 0.8 },
  service_planner: { COMM: 1.3, CREATIVE: 1.2, UI: 1.0, LOGIC: 0.8 },
  ux_designer: { UI: 1.5, CREATIVE: 1.3, COMM: 0.9, LOGIC: 0.6 },
  ui_designer: { UI: 1.6, CREATIVE: 1.3, COMM: 0.8, LOGIC: 0.5 },
  qa_engineer: { LOGIC: 1.2, SYSTEM: 1.0, COMM: 0.9, SECURITY: 0.7 },
  test_automation: { LOGIC: 1.3, SYSTEM: 1.1, COMM: 0.8, SECURITY: 0.7 },
};

type ResultSummaryV1 = {
  version: 1;
  createdAt: string;
  topJobId: string;
  ranking: Array<{
    jobId: string;
    score: number;
  }>;
  scoresByJob: Record<string, number>;
};

type SurveyQuestionCondition = {
  stage?: number;
  trackTarget?: string[];
  [key: string]: unknown;
};

const getQuestionWeight = (questionId: number): number => {
  if (CORE_QUESTION_IDS.has(questionId)) {
    return CORE_QUESTION_WEIGHT;
  }
  if (SPECIFIC_QUESTION_IDS.has(questionId)) {
    return SPECIFIC_QUESTION_WEIGHT;
  }
  return DEFAULT_QUESTION_WEIGHT;
};

@Injectable()
export class SurveyRepository {
  constructor(
    @InjectRepository(SurveyResult)
    private readonly surveyResultRepository: Repository<SurveyResult>,
    @InjectRepository(SubmittedAnswer)
    private readonly submittedAnswerRepository: Repository<SubmittedAnswer>,
    @InjectRepository(SurveyQuestion)
    private readonly surveyQuestionRepository: Repository<SurveyQuestion>,
    @InjectRepository(SurveyOption)
    private readonly surveyOptionRepository: Repository<SurveyOption>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobDetail)
    private readonly jobDetailRepository: Repository<JobDetail>,
    @InjectRepository(CareerTrack)
    private readonly careerTrackRepository: Repository<CareerTrack>,
  ) {}

  private isQuestionInStage(
    condition: SurveyQuestionCondition | null | undefined,
    stage: number,
    track?: string,
  ): boolean {
    const questionStage = condition?.stage ?? 1;
    if (questionStage !== stage) {
      return false;
    }

    if (stage === 2 && track) {
      const trackTarget = condition?.trackTarget;
      if (Array.isArray(trackTarget) && trackTarget.length > 0) {
        return trackTarget.includes(track);
      }
    }

    return true;
  }

  private async calculateStage1FromAnswers(answers: Array<{ questionId: number; optionId: number }>) {
    const jobScores: Record<string, number> = {};
    const userTraitScores: TraitScoreMap = {};
    const allJobs = await this.jobRepository.find({ relations: ['track'] });
    allJobs.forEach((job) => {
      jobScores[job.id] = 0;
    });

    for (const answer of answers) {
      const { questionId, optionId } = answer;
      const option = await this.surveyOptionRepository.findOne({
        where: { id: optionId },
        relations: ['question'],
      });

      if (!option || option.question?.id !== questionId) {
        continue;
      }

      const questionWeight = getQuestionWeight(questionId);
      for (const traitKey in option.subfieldScores) {
        const delta = option.subfieldScores[traitKey] * questionWeight;
        userTraitScores[traitKey] = (userTraitScores[traitKey] || 0) + delta;
      }
    }

    for (const job of allJobs) {
      const traitWeights = JOB_TRAIT_WEIGHTS[job.id] || {};
      const score = Object.entries(traitWeights).reduce(
        (sum, [traitKey, weight]) => sum + (userTraitScores[traitKey] || 0) * weight,
        0,
      );
      jobScores[job.id] = Number(score.toFixed(2));
    }

    const ranking = Object.entries(jobScores)
      .map(([jobId, score]) => ({ jobId, score }))
      .sort((a, b) => b.score - a.score);
    const topJobId = ranking[0]?.jobId ?? '';
    const topTrackId = allJobs.find((job) => job.id === topJobId)?.track?.id ?? '';

    return { allJobs, jobScores, ranking, topJobId, topTrackId, userTraitScores };
  }

  private async calculateStage2FromAnswers(
    answers: Array<{ questionId: number; optionId: number }>,
    topTrack: string,
    allJobs: Job[],
  ) {
    const jobScores: Record<string, number> = {};
    const userSkillScores: TraitScoreMap = {};
    allJobs.forEach((job) => {
      jobScores[job.id] = 0;
    });

    for (const answer of answers) {
      const { questionId, optionId } = answer;
      const option = await this.surveyOptionRepository.findOne({
        where: { id: optionId },
        relations: ['question'],
      });

      if (!option || option.question?.id !== questionId) {
        continue;
      }

      const condition = option.question.condition as SurveyQuestionCondition | undefined;
      if (!this.isQuestionInStage(condition, 2, topTrack)) {
        continue;
      }

      for (const skillKey in option.subfieldScores) {
        userSkillScores[skillKey] =
          (userSkillScores[skillKey] || 0) + option.subfieldScores[skillKey];
      }
    }

    const targetJobs = allJobs.filter((job) => job.track?.id === topTrack);
    for (const job of targetJobs) {
      const traitWeights = JOB_TRAIT_WEIGHTS[job.id] || {};
      const score = Object.entries(traitWeights).reduce(
        (sum, [skillKey, weight]) => sum + (userSkillScores[skillKey] || 0) * weight,
        0,
      );
      jobScores[job.id] = Number(score.toFixed(2));
    }

    return { jobScores, userSkillScores };
  }

  async submitStage1(submitSurveyDto: SubmitSurveyDto): Promise<any> {
    const { userId, answers } = submitSurveyDto;
    const { jobScores, ranking, topJobId, topTrackId, userTraitScores } =
      await this.calculateStage1FromAnswers(answers);

    const submittedAnswers: SubmittedAnswer[] = [];

    for (const answer of answers) {
      const { questionId, optionId } = answer;
      const option = await this.surveyOptionRepository.findOne({
        where: { id: optionId },
        relations: ['question']
      });

      if (option && option.question?.id === questionId) {
        const newSubmittedAnswer = this.submittedAnswerRepository.create({
            surveyQuestion: option.question,
            surveyOption: option,
        });
        submittedAnswers.push(newSubmittedAnswer);
      }
    }

    const totalScore = answers.length;

    const resultSummary: ResultSummaryV1 = {
      version: 1,
      createdAt: new Date().toISOString(),
      topJobId,
      scoresByJob: jobScores,
      ranking,
    };

    const recommendedJob = await this.jobRepository.findOne({ where: { id: topJobId } });

    const newSurveyResult = this.surveyResultRepository.create({
      userId,
      totalScore,
      resultSummary,
      submittedAnswers,
      recommendedJob: recommendedJob || undefined,
    });

    await this.surveyResultRepository.save(newSurveyResult);

    const topScore = ranking[0]?.score ?? 0;
    const secondScore = ranking[1]?.score ?? 0;
    const confidence = topScore > 0 ? Number(((topScore - secondScore) / topScore).toFixed(2)) : 0;

    return {
      stage: 1,
      topTrack: topTrackId,
      topJob: topJobId,
      scores: jobScores,
      ranking,
      traitScores: userTraitScores,
      confidence,
    };
  }

  async submitFinal(submitSurveyDto: SubmitSurveyDto): Promise<any> {
    const { userId, stage1Answers, stage2Answers, track, answers = [] } = submitSurveyDto;
    const resolvedStage1Answers = stage1Answers ?? answers;
    const resolvedStage2Answers = stage2Answers ?? answers;

    const stage1 = await this.calculateStage1FromAnswers(resolvedStage1Answers);
    const topTrack = track || stage1.topTrackId;
    const stage2 = await this.calculateStage2FromAnswers(
      resolvedStage2Answers,
      topTrack,
      stage1.allJobs,
    );

    const finalScores: Record<string, number> = {};
    stage1.allJobs.forEach((job) => {
      const stage1Fit = stage1.jobScores[job.id] || 0;
      const stage2Fit = stage2.jobScores[job.id] || 0;
      finalScores[job.id] = Number((stage1Fit * 0.6 + stage2Fit * 0.4).toFixed(2));
    });

    const ranking = Object.entries(finalScores)
      .map(([jobId, score]) => ({ jobId, score }))
      .sort((a, b) => b.score - a.score);
    const topJobId = ranking[0]?.jobId ?? '';
    const topTrackId = stage1.allJobs.find((job) => job.id === topJobId)?.track?.id ?? topTrack;

    const resultSummary: ResultSummaryV1 = {
      version: 1,
      createdAt: new Date().toISOString(),
      topJobId,
      scoresByJob: finalScores,
      ranking,
    };

    const recommendedJob = await this.jobRepository.findOne({ where: { id: topJobId } });

    const newSurveyResult = this.surveyResultRepository.create({
      userId,
      totalScore: resolvedStage1Answers.length + resolvedStage2Answers.length,
      resultSummary,
      submittedAnswers: [],
      recommendedJob: recommendedJob || undefined,
    });
    await this.surveyResultRepository.save(newSurveyResult);

    const topScore = ranking[0]?.score ?? 0;
    const secondScore = ranking[1]?.score ?? 0;
    const confidence = topScore > 0 ? Number(((topScore - secondScore) / topScore).toFixed(2)) : 0;
    const readinessRaw = Object.values(stage2.userSkillScores).reduce((sum, value) => sum + value, 0);
    const readiness = Number(Math.min(1, readinessRaw / 30).toFixed(2));

    return {
      stage: 2,
      topTrack: topTrackId,
      topJob: topJobId,
      scores: finalScores,
      ranking,
      traitScores: stage1.userTraitScores,
      skillScores: stage2.userSkillScores,
      readiness,
      confidence,
    };
  }

  async submitSurvey(submitSurveyDto: SubmitSurveyDto): Promise<any> {
    return this.submitStage1(submitSurveyDto);
  }

  async findAllJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async findAllJobDetails(): Promise<JobDetail[]> {
    return this.jobDetailRepository.find();
  }

  async findAllCareerTracks(): Promise<CareerTrack[]> {
    return this.careerTrackRepository.find();
  }

  async findAllSurveyQuestions(stage = 1, track?: string): Promise<SurveyQuestion[]> {
    const questions = await this.surveyQuestionRepository.find({ relations: ['options'] });
    return questions.filter((question) =>
      this.isQuestionInStage(question.condition as SurveyQuestionCondition | undefined, stage, track),
    );
  }

  async countSurveyQuestions(): Promise<number> {
    return this.surveyQuestionRepository.count();
  }
}
