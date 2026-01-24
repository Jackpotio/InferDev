import { Injectable } from '@nestjs/common';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Injectable()
export class SurveyService {
  submitSurvey(dto: SubmitSurveyDto) {
    console.log('설문 결과 수신: ', dto);

    return {
      success: true,
      message: '설문이 정상적으로 접수되었습니다.',
    };
  }
}
