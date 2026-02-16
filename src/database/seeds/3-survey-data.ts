
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SurveyQuestion } from '../../survey/entities/survey-question.entity';
import { SurveyOption } from '../../survey/entities/survey-option.entity';

export default class SurveySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const questionRepository = dataSource.getRepository(SurveyQuestion);

    await questionRepository.save([
      {
        question: '사용자 인터페이스를 설계하는 것이 재미있다.',
        options: [
          {
            text: '매우 그렇다',
            score: 3,
            subfieldScores: {
              UI: 3,
              CREATIVE: 2,
              COMM: 1,
              LOGIC: 1,
              AI: 0,
            },
          },
          {
            text: '그렇다',
            score: 2,
            subfieldScores: {
              UI: 2,
              CREATIVE: 1,
              COMM: 1,
              LOGIC: 1,
              AI: 0,
            },
          },
          {
            text: '아니다',
            score: 0,
            subfieldScores: {
              UI: 0,
              CREATIVE: 0,
              COMM: 0,
              LOGIC: 0,
            },
          },
        ],
      },
      {
        question: '서버 구조와 API 설계에 관심이 많다.',
        options: [
          {
            text: '매우 그렇다',
            score: 3,
            subfieldScores: {
              LOGIC: 3,
              SYSTEM: 2,
              SECURITY: 1,
              DATA: 1,
            },
          },
          {
            text: '그렇다',
            score: 2,
            subfieldScores: {
              LOGIC: 2,
              SYSTEM: 1,
              SECURITY: 1,
              DATA: 1,
            },
          },
          {
            text: '아니다',
            score: 0,
            subfieldScores: {
              LOGIC: 0,
              SYSTEM: 0,
              SECURITY: 0,
              DATA: 0,
            },
          },
        ],
      },
      {
        question: '데이터를 분석하고 패턴을 찾는 것이 흥미롭다.',
        options: [
          {
            text: '매우 그렇다',
            score: 3,
            subfieldScores: {
              DATA: 3,
              AI: 2,
              LOGIC: 1,
              SYSTEM: 1,
            },
          },
          {
            text: '그렇다',
            score: 2,
            subfieldScores: {
              DATA: 2,
              AI: 1,
              LOGIC: 1,
              SYSTEM: 1,
            },
          },
          {
            text: '아니다',
            score: 0,
            subfieldScores: {
              DATA: 0,
              AI: 0,
              LOGIC: 0,
              SYSTEM: 0,
            },
          },
        ],
      },
      {
        question: '컴포넌트 상태를 나누고 관리하는 작업이 익숙하다.',
        condition: { stage: 2, trackTarget: ['frontend'] },
        options: [
          { text: '매우 그렇다', score: 3, subfieldScores: { UI: 2, LOGIC: 2, SYSTEM: 1 } },
          { text: '그렇다', score: 2, subfieldScores: { UI: 1, LOGIC: 1, SYSTEM: 1 } },
          { text: '아니다', score: 0, subfieldScores: {} },
        ],
      },
      {
        question: 'API 설계 시 에러 케이스와 예외 흐름을 먼저 고려한다.',
        condition: { stage: 2, trackTarget: ['backend'] },
        options: [
          { text: '매우 그렇다', score: 3, subfieldScores: { LOGIC: 3, SYSTEM: 2, SECURITY: 1 } },
          { text: '그렇다', score: 2, subfieldScores: { LOGIC: 2, SYSTEM: 1, SECURITY: 1 } },
          { text: '아니다', score: 0, subfieldScores: {} },
        ],
      },
      {
        question: '데이터 파이프라인이나 ETL 작업 경험이 있다.',
        condition: { stage: 2, trackTarget: ['data'] },
        options: [
          { text: '매우 그렇다', score: 3, subfieldScores: { DATA: 3, SYSTEM: 2, LOGIC: 1 } },
          { text: '그렇다', score: 2, subfieldScores: { DATA: 2, SYSTEM: 1, LOGIC: 1 } },
          { text: '아니다', score: 0, subfieldScores: {} },
        ],
      },
      {
        question: '모델 성능 지표를 보고 개선 실험을 반복해본 적이 있다.',
        condition: { stage: 2, trackTarget: ['ai'] },
        options: [
          { text: '매우 그렇다', score: 3, subfieldScores: { AI: 3, DATA: 2, LOGIC: 1 } },
          { text: '그렇다', score: 2, subfieldScores: { AI: 2, DATA: 1, LOGIC: 1 } },
          { text: '아니다', score: 0, subfieldScores: {} },
        ],
      },
      {
        question: '장애 대응을 위해 로그/모니터링 지표를 확인하는 습관이 있다.',
        condition: { stage: 2, trackTarget: ['devops'] },
        options: [
          { text: '매우 그렇다', score: 3, subfieldScores: { SYSTEM: 3, LOGIC: 2, SECURITY: 1 } },
          { text: '그렇다', score: 2, subfieldScores: { SYSTEM: 2, LOGIC: 1, SECURITY: 1 } },
          { text: '아니다', score: 0, subfieldScores: {} },
        ],
      },
      {
        question: '협업 시 작업 내용을 문서로 정리하고 공유하는 편이다.',
        condition: { stage: 2 },
        options: [
          { text: '매우 그렇다', score: 3, subfieldScores: { COMM: 3, LOGIC: 1 } },
          { text: '그렇다', score: 2, subfieldScores: { COMM: 2, LOGIC: 1 } },
          { text: '아니다', score: 0, subfieldScores: {} },
        ],
      },
      {
        question: '문제가 발생하면 원인을 작은 단위로 분해해 접근한다.',
        condition: { stage: 2 },
        options: [
          { text: '매우 그렇다', score: 3, subfieldScores: { LOGIC: 3, SYSTEM: 1 } },
          { text: '그렇다', score: 2, subfieldScores: { LOGIC: 2, SYSTEM: 1 } },
          { text: '아니다', score: 0, subfieldScores: {} },
        ],
      },
    ]);
  }
}
