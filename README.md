# KIND 글로벌 임팩트 투명성 플랫폼 - 데모 웹사이트

> 2025 KIND 국민제안 아이디어 공모전 출품작

ESG 시대, 세금으로 만든 글로벌 성과를 국민이 직접 체감할 수 있는 혁신적인 투명성 플랫폼의 프로토타입입니다.

## 📋 프로젝트 개요

**제안명**: KIND 글로벌 임팩트 투명성 플랫폼  
**목적**: 심사위원 대상 인터랙티브 프로토타입 데모  
**제안자**: 박용환 (sanoramyun8@gmail.com)

## 🎯 4가지 핵심 혁신 기능

### 1. ESG 임팩트 투명성 대시보드
- 환경(E), 사회(S), 거버넌스(G) 성과 실시간 시각화
- CO2 감축량, 일자리 창출, 투명성 지수 등 핵심 지표 제공
- 프로젝트별, 지역별 성과 비교 분석

### 2. SDGs 기여도 실시간 측정 시스템
- UN 지속가능발전목표 17개 항목별 한국의 기여도 측정
- 글로벌 임팩트 지수 및 국가별 성과 비교
- 시계열 진행률 애니메이션

### 3. AI 기반 개인화 추천 시스템
- 사용자 관심사에 맞춘 프로젝트 정보 추천
- AI 챗봇을 통한 실시간 질의응답
- 맞춤형 콘텐츠 큐레이션

### 4. 국민 참여형 글로벌 소통 시스템
- 실시간 투표를 통한 정책 의견 수렴
- 해외 현지와 국민 간 직접 소통 채널
- 프로젝트 성과 평가 및 피드백 참여

## 🏗️ 기술 스택

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** 컴포넌트
- **Framer Motion** (애니메이션)
- **Recharts** (데이터 시각화)
- **Lucide React** (아이콘)

### Backend & Database
- **Neon PostgreSQL** (Serverless)
- **Prisma ORM**
- **Next.js API Routes**

### Deployment
- **Vercel** (호스팅)
- **GitHub** (버전 관리)

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
# 루트 디렉토리에서 (워크스페이스 공용 node_modules 사용)
cd C:\MYCLAUDE_PROJECT
npm install
```

### 2. 환경변수 설정
```bash
# demo-website 폴더에서
cp .env.example .env.local
```

`.env.local` 파일을 열어서 다음 값들을 설정하세요:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="postgresql://username:password@host:5432/dbname?sslmode=require"
```

### 3. 데이터베이스 설정 (선택사항)
```bash
# Prisma 설정 (Neon DB 연동 시)
npx prisma generate
npx prisma db push
```

### 4. 개발 서버 실행
```bash
# 루트에서 실행 (워크스페이스 스크립트 사용)
npm run dev:kind

# 또는 demo-website 폴더에서 직접 실행
cd KIND_IDEA_CONTEST_2025/demo-website
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
demo-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 메인 랜딩 페이지
│   │   ├── esg-dashboard/     # ESG 임팩트 대시보드
│   │   ├── sdgs-impact/       # SDGs 기여도 측정
│   │   ├── ai-recommendations/ # AI 추천 시스템
│   │   ├── citizen-engagement/ # 국민 참여 소통
│   │   └── admin/             # 관리자 대시보드
│   ├── components/
│   │   ├── ui/                # shadcn/ui 컴포넌트
│   │   └── features/          # 기능별 컴포넌트
│   ├── lib/
│   │   ├── utils.ts           # 유틸리티 함수
│   │   └── data/              # 목업 데이터
│   └── types/                 # TypeScript 타입 정의
├── prisma/
│   └── schema.prisma          # 데이터베이스 스키마
└── public/                    # 정적 파일
```

## 🎨 주요 기능 데모

### 메인 페이지 (`/`)
- 4대 핵심 기능 소개
- 전체 성과 통계 요약
- 인터랙티브 네비게이션

### ESG 대시보드 (`/esg-dashboard`)
- 환경, 사회, 거버넌스 성과 카드
- 프로젝트별 성과 비교
- 실시간 데이터 시각화

### SDGs 임팩트 (`/sdgs-impact`)
- 17개 UN SDGs 목표별 진행률
- 글로벌 공여국 비교
- 우수 성과 목표 하이라이트

### AI 추천 (`/ai-recommendations`)
- 개인화 설정 인터페이스
- 맞춤형 프로젝트 추천
- AI 챗봇 질의응답

### 국민 참여 (`/citizen-engagement`)
- 실시간 투표 시스템
- 글로벌 메시지 소통
- 프로젝트 성과 평가

### 관리자 대시보드 (`/admin`)
- 전체 KPI 모니터링
- 실시간 사용자 활동
- 시스템 상태 체크

## 📊 목업 데이터

현재 다음과 같은 목업 데이터를 제공합니다:

- **7개 글로벌 프로젝트** (베트남, 인도네시아, 필리핀, 방글라데시, 우즈베키스탄, 카자흐스탄, 페루)
- **ESG 성과 지표** (CO2 감축 85만톤/년, 일자리 1.5만개 창출)
- **SDGs 기여도** (17개 목표별 달성률 58-94%)
- **실시간 KPI** (방문자 4.5만명, 참여율 73.5%)

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 코드 린팅
npm run lint

# Prisma 스키마 생성
npm run db:generate

# 데이터베이스 스키마 푸시
npm run db:push
```

## 🌐 배포

이 프로젝트는 Vercel에 배포하도록 설계되었습니다:

1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 연결
3. 환경변수 설정
4. 자동 배포 완료

## 🎯 심사위원을 위한 체험 가이드

1. **메인 페이지**에서 전체 개요 확인
2. **ESG 대시보드**에서 환경/사회/거버넌스 성과 체험
3. **SDGs 임팩트**에서 UN 목표별 기여도 확인
4. **AI 추천**에서 개인화 기능 테스트
5. **국민 참여**에서 실시간 소통 기능 체험
6. **관리자 대시보드**에서 전체 시스템 모니터링 확인

## 📈 기대 효과

- **국민 인지도 500% 증가** (월 10만명 방문 목표)
- **글로벌 벤치마킹 30건** (해외 공공기관 벤치마킹)
- **언론 보도 300% 증가** (월 20건 보도 목표)
- **국민 신뢰도 4.7/5.0** (투명성 확보를 통한 신뢰도 향상)

## 🤝 기여

이 프로젝트는 2025 KIND 국민제안 아이디어 공모전 출품작입니다.

**제안자**: 박용환  
**이메일**: sanoramyun8@gmail.com  
**연락처**: 010-7939-3123

## 📄 라이선스

이 프로젝트는 공모전 출품작으로, 모든 권리는 제안자에게 있습니다.

---

**"ESG 시대, 세금으로 만든 글로벌 성과를 국민이 직접 체감하다"**