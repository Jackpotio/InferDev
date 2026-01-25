import { Injectable } from '@nestjs/common';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
import { maxDate } from 'class-validator';

@Injectable()
export class SurveyService {
  submitSurvey(dto: SubmitSurveyDto) {
    console.log('설문 결과 수신: ', dto);
    const { scores } = dto;
    const result = this.calculateResult(scores);

    return {
      success: true,
      result,
    };
  }

  /*ScoreDto 기반 설문 결과 계산 */
  private calculateResult(scores: {
    frontend: number;
    backend: number;
    ai: number;
  }): 'frontend' | 'backend' | 'ai' {
    let maxScore = -Infinity;
    let selectedField: 'frontend' | 'backend' | 'ai' = 'frontend';

    if (scores.frontend > maxScore) {
      maxScore = scores.frontend;
      selectedField = 'frontend';
    }

    if (scores.backend > maxScore) {
      maxScore = scores.backend;
      selectedField = 'backend';
    }

    if (scores.ai > maxScore) {
      maxScore = scores.ai;
      selectedField = 'ai';
    }
    return selectedField;
  }
}
