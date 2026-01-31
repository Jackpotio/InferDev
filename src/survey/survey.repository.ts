
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
  ) {}

  async submitSurvey(submitSurveyDto: SubmitSurveyDto): Promise<SurveyResult> {
    const { userId, answers } = submitSurveyDto;

    let totalScore = 0;
    const submittedAnswers: SubmittedAnswer[] = [];

    for (const answer of answers) {
      const { questionId, optionId } = answer;
      const question = await this.surveyQuestionRepository.findOne({ where: { id: questionId } });
      const option = await this.surveyOptionRepository.findOne({ where: { id: optionId } });

      if (question && option) {
        const newSubmittedAnswer = this.submittedAnswerRepository.create({
          surveyQuestion: question,
          surveyOption: option,
        });
        submittedAnswers.push(newSubmittedAnswer);

        for (const key in option.score) {
          if (Object.prototype.hasOwnProperty.call(option.score, key)) {
            totalScore += option.score[key];
          }
        }
      }
    }

    const newSurveyResult = this.surveyResultRepository.create({
      userId,
      totalScore,
      resultSummary: ' ',
      submittedAnswers,
    });

    return this.surveyResultRepository.save(newSurveyResult);
  }

  async findAllJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async findAllJobDetails(): Promise<JobDetail[]> {
    return this.jobDetailRepository.find();
  }

  async findAllSurveyQuestions(): Promise<SurveyQuestion[]> {
    return this.surveyQuestionRepository.find({ relations: ['options'] });
  }
}
