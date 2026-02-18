# InferDev Backend (NestJS)

InferDev의 백엔드 서버입니다.  
설문 데이터/추천 로직, 인증(JWT + Google OAuth), 프로필 설정 API를 제공합니다.

---

## 1. 현재 구현 상태

- 설문/추천 API 구현 완료 (stage1, final 분리 계산)
- JWT 로컬 인증 구현 완료 (`register`, `login`, `me`)
- Google OAuth 로그인 연동 완료 (JWT 발급 통합)
- 프로필 설정 API 구현 완료 (알림/표시 이름/플랜)
- TypeORM Migration 체계 적용 완료 (`synchronize: false`)
- Naver OAuth는 코드 골격만 있고 현재 비활성 상태

---

## 2. 기술 스택

- NestJS 10
- TypeScript
- PostgreSQL
- TypeORM
- Passport (`jwt`, `google-oauth20`)
- bcryptjs
- class-validator / class-transformer

---

## 3. 핵심 모듈 구조

```txt
src/
 ├─ app.module.ts
 ├─ main.ts
 ├─ auth/
 │  ├─ auth.controller.ts
 │  ├─ auth.service.ts
 │  ├─ auth.module.ts
 │  ├─ jwt.strategy.ts
 │  ├─ jwt-auth.guard.ts
 │  ├─ dto/
 │  │  ├─ login.dto.ts
 │  │  ├─ register.dto.ts
 │  │  └─ update-profile.dto.ts
 │  ├─ guards/
 │  │  ├─ google-auth.guard.ts
 │  │  └─ naver-auth.guard.ts
 │  └─ strategies/
 │     ├─ google.strategy.ts
 │     └─ naver.strategy.ts
 ├─ users/
 │  ├─ user.entity.ts
 │  ├─ users.service.ts
 │  └─ users.module.ts
 ├─ survey/
 │  ├─ survey.controller.ts
 │  ├─ survey.service.ts
 │  ├─ survey.repository.ts
 │  ├─ dto/submit-survey.dto.ts
 │  └─ entities/*.entity.ts
 └─ database/
    ├─ data-source.ts
    ├─ migrations/
    └─ seeds/
```

---

## 4. 인증/프로필 API

기본 prefix: `/api`

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (JWT 필요)

### Google OAuth

- `GET /api/auth/google`
- `GET /api/auth/google/redirect`

성공 시 프론트로 리다이렉트:
- `${FRONTEND_URL}/oauth/callback#token=<jwt>`

### Profile (JWT 필요)

- `GET /api/auth/profile`
- `POST /api/auth/profile`

프로필 응답 예시 필드:
- `displayName`
- `notifyResultSaved`
- `notifyPremium`
- `plan`
- `account.email`
- `account.providerLabel`
- `account.joinedAt`

---

## 5. 설문/추천 API

- `GET /api/jobs`
- `GET /api/job-details`
- `GET /api/career-tracks`
- `GET /api/survey-questions?stage=1|2&track=<id>`
- `POST /api/recommendation/stage1`
- `POST /api/recommendation/final`
- `POST /api/recommendation` (호환용)

---

## 6. DB 및 마이그레이션

`src/database/migrations` 기준 운영.

주요 마이그레이션:
- `CreateUsersTable1760000000000`
- `AddOAuthColumnsToUsers1760000001000`
- `AddProfileSettingsToUsers1760000002000`

실행:

```bash
pnpm run migration:run
```

---

## 7. 환경변수

필수:

- `JWT_SECRET`
- `SESSION_SECRET`
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`
- `FRONTEND_URL`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`

선택:

- `JWT_EXPIRES_IN` (default: `30m`)
- `BCRYPT_ROUNDS` (default: `10`)
- `NODE_ENV`

---

## 8. 실행 방법

```bash
pnpm install
pnpm run migration:run
pnpm run start:dev
```

기본 포트: `3000`

---

## 9. 앞으로의 설계/구현 방향

### 단기

- Naver OAuth 재활성화 (환경변수/콘솔 설정 후 provider 등록)
- 설문 결과 저장 API에 `req.user.userId` 강제 적용 (`userId` body 의존 제거)
- 프로필/알림 API 스펙 고정 및 e2e 테스트 추가

### 중기

- Refresh Token 도입 및 토큰 재발급 정책 정리
- 알림 저장소 DB 테이블 분리 (`notifications`) + 읽음/전체읽음 API
- 관리자 RBAC API 확장 (`RolesGuard` 실제 적용)

### 운영 안정화

- OAuth state/세션 저장소 Redis 전환
- 보안 헤더/로그 마스킹/Rate Limit 적용
- CI에서 migration + test 자동 검증

---

## 10. 참고

- 현재 인증은 `JWT access token` 중심이며, 쿠키 기반 세션 로그인은 미도입 상태입니다.
- Naver는 추후 재활성화 예정이며, 구글 기준으로 인증 흐름을 먼저 안정화한 상태입니다.
