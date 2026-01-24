import { Body, Controller, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('submit')
  submitSurvey(@Body() dto: SubmitSurveyDto) {
    return this.surveyService.submitSurvey(dto);
  }
}
