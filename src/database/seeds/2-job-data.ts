
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { CareerTrack } from '../../survey/entities/career-track.entity';
import { Job } from '../../survey/entities/job.entity';
import { JobDetail } from '../../survey/entities/job-detail.entity';

const CAREER_TRACKS = [
  { id: 'frontend', name: '프론트엔드' },
  { id: 'backend', name: '백엔드' },
  { id: 'mobile', name: '모바일' },
  { id: 'ai', name: 'AI · 데이터' },
  { id: 'devops', name: '인프라 · 데브옵스' },
  { id: 'game', name: '게임 개발' },
  { id: 'security', name: '보안' },
  { id: 'data', name: '데이터 엔지니어링' },
  { id: 'product', name: '기획 · PM' },
  { id: 'design', name: 'UI/UX · 디자인' },
  { id: 'qa', name: 'QA · 테스트' },
];

const JOBS = [
  // ================= FRONTEND =================
  { id: 'web_frontend', trackId: 'frontend', name: '웹 프론트엔드 개발자' },
  { id: 'frontend_platform', trackId: 'frontend', name: '프론트엔드 플랫폼 엔지니어' },
  { id: 'ui_engineer', trackId: 'frontend', name: 'UI 엔지니어' },

  // ================= BACKEND =================
  { id: 'api_backend', trackId: 'backend', name: 'API 백엔드 개발자' },
  { id: 'server_architect', trackId: 'backend', name: '서버 아키텍트' },
  { id: 'backend_platform', trackId: 'backend', name: '백엔드 플랫폼 엔지니어' },

  // ================= MOBILE =================
  { id: 'ios_dev', trackId: 'mobile', name: 'iOS 개발자' },
  { id: 'android_dev', trackId: 'mobile', name: 'Android 개발자' },
  { id: 'cross_mobile', trackId: 'mobile', name: '크로스플랫폼 앱 개발자' },

  // ================= AI / DATA =================
  { id: 'ml_engineer', trackId: 'ai', name: '머신러닝 엔지니어' },
  { id: 'ai_researcher', trackId: 'ai', name: 'AI 연구원' },
  { id: 'data_scientist', trackId: 'ai', name: '데이터 사이언티스트' },

  // ================= DATA ENGINEERING =================
  { id: 'data_engineer', trackId: 'data', name: '데이터 엔지니어' },
  { id: 'bigdata_engineer', trackId: 'data', name: '빅데이터 엔지니어' },

  // ================= DEVOPS =================
  { id: 'devops_engineer', trackId: 'devops', name: '데브옵스 엔지니어' },
  { id: 'sre', trackId: 'devops', name: 'SRE' },
  { id: 'cloud_engineer', trackId: 'devops', name: '클라우드 엔지니어' },

  // ================= GAME =================
  { id: 'game_client', trackId: 'game', name: '게임 클라이언트 개발자' },
  { id: 'game_server', trackId: 'game', name: '게임 서버 개발자' },

  // ================= SECURITY =================
  { id: 'security_engineer', trackId: 'security', name: '보안 엔지니어' },
  { id: 'penetration_tester', trackId: 'security', name: '모의해킹 전문가' },

  // ================= PRODUCT =================
  { id: 'pm', trackId: 'product', name: '프로덕트 매니저(PM)' },
  { id: 'service_planner', trackId: 'product', name: '서비스 기획자' },

  // ================= DESIGN =================
  { id: 'ux_designer', trackId: 'design', name: 'UX 디자이너' },
  { id: 'ui_designer', trackId: 'design', name: 'UI 디자이너' },

  // ================= QA =================
  { id: 'qa_engineer', trackId: 'qa', name: 'QA 엔지니어' },
  { id: 'test_automation', trackId: 'qa', name: '테스트 자동화 엔지니어' },
];

const JOB_DETAILS = [
  {
    jobId: 'web_frontend',
    title: '웹 사용자 경험을 책임지는 프론트엔드 개발자',
    img: '/images/frontend.png',
    subfields: ['React', '상태관리', '웹 성능 최적화', '웹 접근성'],
    strengths: ['시각적 사고', '디자인 감각', '사용자 중심 사고'],
    similarJobs: ['UI 엔지니어', '크로스플랫폼 앱 개발자'],
  },
  {
    jobId: 'api_backend',
    title: '대규모 트래픽을 처리하는 API 백엔드 개발자',
    img: '/images/backend.png',
    subfields: ['REST API', 'DB 설계', '트랜잭션 처리', '보안'],
    strengths: ['논리적 사고', '시스템 이해', '문제 해결력'],
    similarJobs: ['서버 아키텍트', '데이터 엔지니어'],
  },
  {
    jobId: 'ml_engineer',
    title: '모델을 실제 서비스로 만드는 머신러닝 엔지니어',
    img: '/images/ml.png',
    subfields: ['모델 서빙', '파이프라인', 'MLOps', '모델 최적화'],
    strengths: ['수학적 사고', '데이터 해석', '실험 설계'],
    similarJobs: ['AI 연구원', '데이터 사이언티스트'],
  },
  {
    jobId: 'devops_engineer',
    title: '개발과 운영을 자동화하는 데브옵스 엔지니어',
    img: '/images/devops.png',
    subfields: ['CI/CD', 'Docker', 'Kubernetes', '모니터링'],
    strengths: ['시스템 통합 능력', '자동화 사고', '문제 대응력'],
    similarJobs: ['SRE', '클라우드 엔지니어'],
  },
];

export default class JobSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const careerTrackRepository = dataSource.getRepository(CareerTrack);
    await careerTrackRepository.upsert(CAREER_TRACKS, ['id']);

    const jobRepository = dataSource.getRepository(Job);
    await jobRepository.upsert(JOBS, ['id']);

    const jobDetailRepository = dataSource.getRepository(JobDetail);
    await jobDetailRepository.upsert(JOB_DETAILS, ['jobId']);
  }
}
