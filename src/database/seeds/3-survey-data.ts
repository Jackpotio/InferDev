
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
              frontend: 3,
              backend: 0,
              data: 0,
              ai: 0,
            },
          },
          {
            text: '그렇다',
            score: 2,
            subfieldScores: {
              frontend: 2,
              backend: 0,
              data: 0,
              ai: 0,
            },
          },
          {
            text: '아니다',
            score: 0,
            subfieldScores: {
              frontend: 0,
              backend: 0,
              data: 0,
              ai: 0,
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
              frontend: 0,
              backend: 3,
              data: 0,
              ai: 0,
            },
          },
          {
            text: '그렇다',
            score: 2,
            subfieldScores: {
              frontend: 0,
              backend: 2,
              data: 0,
              ai: 0,
            },
          },
          {
            text: '아니다',
            score: 0,
            subfieldScores: {
              frontend: 0,
              backend: 0,
              data: 0,
              ai: 0,
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
              frontend: 0,
              backend: 0,
              data: 3,
              ai: 1,
            },
          },
          {
            text: '그렇다',
            score: 2,
            subfieldScores: {
              frontend: 0,
              backend: 0,
              data: 2,
              ai: 1,
            },
          },
          {
            text: '아니다',
            score: 0,
            subfieldScores: {
              frontend: 0,
              backend: 0,
              data: 0,
              ai: 0,
            },
          },
        ],
      },
    ]);
  }
}
