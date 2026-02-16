
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Controller() // 'api' 접두사를 제거합니다.
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

  @Get('career-tracks')
  getCareerTracks() {
    return this.surveyService.getCareerTracks();
  }

  @Get('survey-questions')
  getSurveyQuestions(
    @Query('stage') stage?: string,
    @Query('track') track?: string,
  ) {
    return this.surveyService.getSurveyQuestions(stage ? Number(stage) : 1, track);
  }

  @Post('recommendation')
  recommendation(@Body() submitSurveyDto: SubmitSurveyDto) {
    return this.surveyService.recommendation(submitSurveyDto);
  }

  @Post('recommendation/stage1')
  recommendationStage1(@Body() submitSurveyDto: SubmitSurveyDto) {
    return this.surveyService.recommendationStage1(submitSurveyDto);
  }

  @Post('recommendation/final')
  recommendationFinal(@Body() submitSurveyDto: SubmitSurveyDto) {
    return this.surveyService.recommendationFinal(submitSurveyDto);
  }
}
