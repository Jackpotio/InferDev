
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

  async submitSurvey(submitSurveyDto: SubmitSurveyDto): Promise<any> {
    const { userId, answers } = submitSurveyDto;

    const jobScores: { [key: string]: number } = {};
    const allJobs = await this.jobRepository.find();
    allJobs.forEach(job => {
      jobScores[job.id] = 0;
    });

    let totalScore = 0;
    const submittedAnswers: SubmittedAnswer[] = [];

    for (const answer of answers) {
      const { questionId, optionId } = answer;
      const option = await this.surveyOptionRepository.findOne({ 
        where: { id: optionId },
        relations: ['question', 'question.options'] // Eagerly load relations
      });

      if (option) {
        totalScore += option.score;
        for (const key in option.subfieldScores) {
            if (jobScores.hasOwnProperty(key)) {
                jobScores[key] += option.subfieldScores[key];
            }
        }

        const question = await this.surveyQuestionRepository.findOne({ 
          where: { id: questionId },
          relations: ['options'] // Eagerly load relations
        });
        if (question) {
            const newSubmittedAnswer = this.submittedAnswerRepository.create({
                surveyQuestion: question,
                surveyOption: option,
            });
            submittedAnswers.push(newSubmittedAnswer);
        }
      }
    }

    let topJobId = '';
    let maxScore = -1;
    for (const jobId in jobScores) {
      if (jobScores[jobId] > maxScore) {
        maxScore = jobScores[jobId];
        topJobId = jobId;
      }
    }

    const recommendedJob = await this.jobRepository.findOne({ where: { id: topJobId } });

    const newSurveyResult = this.surveyResultRepository.create({
      userId,
      totalScore,
      resultSummary: JSON.stringify(jobScores),
      submittedAnswers,
      recommendedJob: recommendedJob || undefined,
    });

    await this.surveyResultRepository.save(newSurveyResult);

    return {
      topJob: topJobId,
      scores: jobScores,
    };
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

  async findAllSurveyQuestions(): Promise<SurveyQuestion[]> {
    return this.surveyQuestionRepository.find({ relations: ['options'] });
  }

  async countSurveyQuestions(): Promise<number> {
    return this.surveyQuestionRepository.count();
  }
}
