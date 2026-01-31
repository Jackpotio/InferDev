# InferDev Backend (NestJS)

IT 진로 적성검사 서비스 **InferDev**의 백엔드 서버입니다.
설문 데이터 제공, 사용자 응답 수집, 진로 추천 결과 계산을 담당합니다.

---

## 1. 현재 개발 상태 요약

✅ NestJS 기본 구조 구성 완료
✅ PostgreSQL Entity 설계 완료
✅ 설문/직무/옵션 조회 API 구현 완료
⚠️ 추천(점수 계산) 로직은 **미구현 (Mock 단계)**

---

## 2. 기술 스택

* NestJS
* TypeScript
* PostgreSQL
* TypeORM (Repository 패턴)
* class-validator / class-transformer

---

## 3. 프로젝트 구조

```
src/
 ├─ app.module.ts
 ├─ main.ts
 ├─ survey/
 │  ├─ survey.controller.ts   # API 엔드포인트
 │  ├─ survey.service.ts      # 비즈니스 로직 (추천 로직 예정)
 │  ├─ survey.repository.ts   # DB 접근 계층
 │  ├─ dto/
 │  │  └─ submit-survey.dto.ts
 │  └─ entities/
 │     ├─ job.entity.ts
 │     ├─ job-detail.entity.ts
 │     ├─ survey-question.entity.ts
 │     ├─ survey-option.entity.ts
 │     ├─ submitted-answer.entity.ts
 │     └─ survey-result.entity.ts
```

---

## 4. Entity 설계 현황

### Job

* IT 직무(Frontend, Backend, AI 등)를 표현

### JobDetail

* 직무 상세 설명, 이미지, 유사 직무 정보

### SurveyQuestion

* 설문 질문
* 조건부 질문(전공, 경험 등)을 고려한 확장 구조

### SurveyOption

* 질문에 대한 선택지
* 향후 점수 매핑 예정

### SubmittedAnswer

* 사용자의 질문-선택지 응답 기록

### SurveyResult

* 최종 추천 결과 저장용 (확장 대비)

---

## 5. API 엔드포인트

### 조회 API

| Method | Endpoint          | Description |
| ------ | ----------------- | ----------- |
| GET    | /jobs             | 직무 목록 조회    |
| GET    | /job-details      | 직무 상세 정보 조회 |
| GET    | /survey-questions | 설문 질문 조회    |

### 추천 API

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | /recommendation | 설문 응답 제출 및 추천 결과 반환 |

⚠️ 현재 `/recommendation` 은 **mock 문자열만 반환**

---

## 6. 추천 로직 구현 위치 (예정)

```
SurveyService.recommendation()
```

* 프론트엔드는 계산 로직을 절대 포함하지 않음
* 모든 점수 계산 및 직무 매칭은 백엔드에서 처리

---

## 7. 실행 방법

```bash
pnpm install
pnpm run start:dev
```

* 기본 포트: 3000

---

## 8. 다음 구현 목표

* 설문 옵션 → 직무 점수 매핑 테이블 설계
* recommendation 로직 구현
* 결과 JSON 스펙 확정
* 테스트 코드 추가

---

## 9. 설계 의도

이 백엔드는 단순 설문 저장 서버가 아니라,

> **설문 데이터를 기반으로 직무 적합도를 계산하는 분석 서버**

를 목표로 설계되었습니다.
