// 추가 목업 데이터들
export const mockActivityData = [
  {
    id: 1,
    type: 'project_update',
    title: '베트남 스마트농업 프로젝트 중간 성과 발표',
    description: '드론 기반 작물 모니터링 시스템 도입으로 생산성 23% 향상',
    timestamp: new Date('2024-06-15T10:30:00'),
    project: '베트남 스마트 농업 프로젝트',
    location: '베트남 호치민시'
  },
  {
    id: 2,
    type: 'citizen_feedback',
    title: '인도네시아 태양광 발전소 주민 만족도 조사 결과',
    description: '지역 주민 87%가 프로젝트에 만족한다고 응답',
    timestamp: new Date('2024-06-14T14:20:00'),
    project: '인도네시아 재생에너지 확산 사업',
    location: '인도네시아 발리'
  },
  {
    id: 3,
    type: 'milestone',
    title: '필리핀 디지털 헬스케어 1단계 완료',
    description: '원격진료 플랫폼 구축 완료, 월 5천명 이용',
    timestamp: new Date('2024-06-13T09:15:00'),
    project: '필리핀 디지털 헬스케어 구축',
    location: '필리핀 마닐라'
  }
]

export const mockStatsData = {
  totalVisitors: 45230,
  participationRate: 73.5,
  globalReach: 47,
  projectEfficiency: 89.2,
  monthlyGrowth: 15.8,
  userSatisfaction: 4.7
}

export const mockPollsData = [
  {
    id: 1,
    question: '다음 중 가장 우선적으로 지원해야 할 분야는?',
    options: [
      { id: 1, text: '친환경 에너지', votes: 1250 },
      { id: 2, text: '디지털 교육', votes: 980 },
      { id: 3, text: '헬스케어', votes: 1430 },
      { id: 4, text: '스마트시티', votes: 890 }
    ],
    totalVotes: 4550,
    endDate: new Date('2024-06-30'),
    isActive: true
  },
  {
    id: 2,
    question: 'KIND 프로젝트의 성과 투명성 수준은?',
    options: [
      { id: 1, text: '매우 투명함', votes: 2100 },
      { id: 2, text: '투명함', votes: 1800 },
      { id: 3, text: '보통', votes: 420 },
      { id: 4, text: '개선 필요', votes: 180 }
    ],
    totalVotes: 4500,
    endDate: new Date('2024-06-25'),
    isActive: true
  }
]

export const mockMessagesData = [
  {
    id: 1,
    sender: '베트남 호치민 농민협회',
    message: '스마트농업 프로젝트 덕분에 우리 마을 농업이 완전히 바뀌었습니다. 한국 국민 여러분께 진심으로 감사드립니다!',
    timestamp: new Date('2024-06-15T16:30:00'),
    project: '베트남 스마트 농업 프로젝트',
    likes: 428,
    isVerified: true
  },
  {
    id: 2,
    sender: '인도네시아 발리 환경단체',
    message: '태양광 발전소가 설치된 후 우리 지역의 대기 질이 눈에 띄게 개선되었습니다. 지속가능한 미래를 만들어주셔서 고맙습니다.',
    timestamp: new Date('2024-06-14T11:20:00'),
    project: '인도네시아 재생에너지 확산 사업',
    likes: 356,
    isVerified: true
  },
  {
    id: 3,
    sender: '필리핀 마닐라 의료진',
    message: '원격 의료 시스템으로 더 많은 환자들을 도울 수 있게 되었습니다. 한국의 기술 지원에 깊이 감사드립니다.',
    timestamp: new Date('2024-06-13T14:45:00'),
    project: '필리핀 디지털 헬스케어 구축',
    likes: 512,
    isVerified: true
  }
]

export const mockRecommendationsData = [
  {
    id: 1,
    title: '베트남 스마트 농업 확장 프로젝트',
    description: '드론과 AI 기술을 활용한 정밀농업 시스템 확산',
    category: '농업기술',
    impact: 'HIGH',
    budget: '350억원',
    timeline: '2025-2027',
    sdgs: [2, 8, 9],
    matchScore: 94
  },
  {
    id: 2,
    title: '동남아시아 청정에너지 네트워크',
    description: '국가간 재생에너지 전력망 연결 프로젝트',
    category: '에너지',
    impact: 'VERY_HIGH',
    budget: '1,200억원',
    timeline: '2025-2030',
    sdgs: [7, 9, 13],
    matchScore: 91
  },
  {
    id: 3,
    title: '중앙아시아 디지털 헬스케어 허브',
    description: '지역 의료 서비스 디지털화 및 원격진료 확산',
    category: '헬스케어',
    impact: 'HIGH',
    budget: '280억원',
    timeline: '2024-2026',
    sdgs: [3, 8, 9],
    matchScore: 87
  }
]