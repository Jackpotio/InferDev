import { Injectable } from '@nestjs/common';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Injectable()
export class SurveyService {
  submitSurvey(dto: SubmitSurveyDto) {
    const { scores } = dto;

    const rankedThemes = this.buildRankedThemes(scores);
    const { topTheme, maxScore } = this.extractMaxScore(rankedThemes);

    return {
      success: true,
      result: {
        rankedThemes,
        topTheme,
        maxScore,
      },
    };
  }

  /* scores 객체를 점수 기준 내림차순으로 정렬 */
  private buildRankedThemes(
    scores: Record<string, number>,
  ): { theme: string; score: number }[] {
    return Object.entries(scores)
      .map(([theme, score]) => ({ theme, score }))
      .sort((a, b) => b.score - a.score);
  }

  /*랭킹 결과에서 최고 점수 및 대표 테마 추출 */
  private extractMaxScore(rankedThemes: { theme: string; score: number }[]): {
    topTheme: string;
    maxScore: number;
  } {
    const top = rankedThemes[0];
    return {
      topTheme: top.theme,
      maxScore: top.score,
    };
  }
}
