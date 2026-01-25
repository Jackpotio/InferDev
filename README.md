# Survey Backend (NestJS)

## 1. 프로젝트 개요

이 프로젝트는 **설문 기반 진로/역량 분석 서비스의 백엔드**를 목표로 한다.
프론트엔드(React)에서 수집된 설문 데이터를 API를 통해 전달받아, 검증·가공·저장·분석하는 역할을 담당한다.

본 백엔드는 단기적으로는 단순 설문 수집 API를 제공하지만,
중장기적으로는 **점수 계산 로직, 추천 알고리즘, 사용자 이력 관리**까지 확장 가능한 구조를 전제로 설계된다.

---

## 2. 기술 스택 및 선택 이유

### Core Runtime

* **Node.js**

  * 프론트엔드(React)와 언어 생태계 공유
  * 비동기 I/O 기반으로 API 서버에 적합

### Framework

* **NestJS**

  * Express/Fastify 위에서 동작하는 구조적 프레임워크
  * Controller / Service / Module 분리로 확장성과 유지보수성 확보
  * DTO + ValidationPipe를 통한 입력값 검증 내장

> 내부적으로는 Express를 사용하지만, 필요 시 Fastify로 교체 가능하도록 설계한다.

### Language

* **TypeScript**

  * API 계약의 명확성
  * DTO, 인터페이스 기반 타입 안정성
  * 프론트엔드와 타입 개념 공유 가능

### Validation

* **class-validator / class-transformer**

  * 런타임 입력 검증
  * 잘못된 요청을 초기에 차단하여 로직 복잡도 감소

---

## 3. 아키텍처 방향성

본 프로젝트는 다음 원칙을 따른다.

1. **Controller는 얇게**

   * 요청 수신 및 응답 반환만 담당

2. **Service에 비즈니스 로직 집중**

   * 점수 계산, 설문 해석, 추천 로직 등

3. **DTO는 API 계약서 역할**

   * 프론트엔드와의 약속
   * README의 API 명세와 항상 동기화

4. **기술 교체 가능성 고려**

   * Express → Fastify
   * REST API → GraphQL
   * In-memory → DB (MongoDB / PostgreSQL)

---

## 4. 디렉토리 구조 (현재 기준)

```
backend/
├─ src/
│  ├─ app.module.ts
│  ├─ main.ts
│  └─ survey/
│     ├─ survey.controller.ts
│     ├─ survey.service.ts
│     └─ dto/
│        └─ submit-survey.dto.ts
├─ package.json
└─ README.md
```

---

## 5. API 설계 철학

* RESTful API를 기본으로 한다.
* 하나의 요청은 하나의 책임만 가진다.
* 모든 입력은 DTO로 검증한다.
* 실패는 명확한 HTTP Status Code로 반환한다.

### 예시 API

#### POST /survey/submit

설문 결과 제출

```json
{
  "major": "it",
  "codingExp": "yes",
  "scores": {
    "frontend": 3,
    "backend": 2,
    "ai": 1
  }
}
```

응답:

```json
{
  "success": true,
  "message": "설문이 정상적으로 접수되었습니다."
}
```

---

## 6. 향후 확장 계획

### 1단계 (현재)

* 설문 수집 API
* DTO 기반 입력 검증

### 2단계

* 점수 계산 로직 분리 (SurveyResultService)
* 설문 결과 해석 로직 추가

### 3단계

* DB 연동 (MongoDB 또는 PostgreSQL)
* 설문 결과 저장
* 사용자별 이력 관리

### 4단계

* 추천 알고리즘 도입
* 직무/학습 경로 추천 API

---

## 7. 프론트엔드와의 관계

* 프론트엔드는 별도 레포지토리로 관리한다.
* API 스펙은 본 README를 단일 진실 소스로 사용한다.
* DTO 변경 시 반드시 README를 함께 수정한다.

---
