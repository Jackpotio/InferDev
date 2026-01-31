
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Controller('api')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get('jobs')
  getJobs() {
    return this.surveyService.getJobs();
  }

  @Get('job-details')
  getJobDetails() {
    return this.surveyService.getJobDetails();
  }

  @Get('survey-questions')
  getSurveyQuestions() {
    return this.surveyService.getSurveyQuestions();
  }

  @Post('recommendation')
  recommendation(@Body() submitSurveyDto: SubmitSurveyDto) {
    return this.surveyService.recommendation(submitSurveyDto);
  }
}
