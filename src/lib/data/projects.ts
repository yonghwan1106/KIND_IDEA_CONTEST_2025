import { Project, ESGMetrics, SDGData, CountryData } from '@/types'

// 프로젝트 목업 데이터
export const mockProjects: Project[] = [
  {
    id: 1,
    name: '베트남 하노이 스마트시티',
    location: '베트남 하노이',
    category: '도시개발',
    status: 'active',
    startDate: new Date('2021-03-15'),
    endDate: new Date('2025-12-31'),
    budget: 50000000000, // 500억원
    latitude: 21.0285,
    longitude: 105.8542,
    description: '지능형 교통시스템과 친환경 에너지를 결합한 미래형 스마트시티 구축',
    createdAt: new Date('2021-01-01'),
    updatedAt: new Date('2024-06-01')
  },
  {
    id: 2,
    name: '인도네시아 발리 신재생에너지',
    location: '인도네시아 발리',
    category: '에너지',
    status: 'active',
    startDate: new Date('2022-01-10'),
    endDate: new Date('2026-06-30'),
    budget: 35000000000, // 350억원
    latitude: -8.3405,
    longitude: 115.0920,
    description: '태양광과 풍력을 활용한 청정에너지 전환 프로젝트',
    createdAt: new Date('2021-10-15'),
    updatedAt: new Date('2024-05-20')
  },
  {
    id: 3,
    name: '필리핀 마닐라 교통시스템',
    location: '필리핀 마닐라',
    category: '교통',
    status: 'completed',
    startDate: new Date('2020-05-01'),
    endDate: new Date('2024-03-31'),
    budget: 28000000000, // 280억원
    latitude: 14.5995,
    longitude: 120.9842,
    description: '지하철 및 버스 급행 시스템 구축을 통한 교통 체증 해소',
    createdAt: new Date('2019-12-01'),
    updatedAt: new Date('2024-04-01')
  },
  {
    id: 4,
    name: '방글라데시 다카 홍수방지시스템',
    location: '방글라데시 다카',
    category: '환경/재해',
    status: 'active',
    startDate: new Date('2023-02-01'),
    endDate: new Date('2027-01-31'),
    budget: 42000000000, // 420억원
    latitude: 23.8103,
    longitude: 90.4125,
    description: '첨단 배수 시설과 조기 경보 시스템을 통한 홍수 피해 최소화',
    createdAt: new Date('2022-08-15'),
    updatedAt: new Date('2024-06-10')
  },
  {
    id: 5,
    name: '우즈베키스탄 타슈켄트 도시재생',
    location: '우즈베키스탄 타슈켄트',
    category: '도시개발',
    status: 'planning',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2028-08-31'),
    budget: 38000000000, // 380억원
    latitude: 41.2995,
    longitude: 69.2401,
    description: '낙후된 도심지역의 친환경 재개발 및 문화시설 확충',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-06-15')
  },
  {
    id: 6,
    name: '카자흐스탄 알마티 스마트그리드',
    location: '카자흐스탄 알마티',
    category: '에너지',
    status: 'active',
    startDate: new Date('2022-08-15'),
    endDate: new Date('2025-12-31'),
    budget: 31000000000, // 310억원
    latitude: 43.2220,
    longitude: 76.8512,
    description: '전력 공급 효율성 극대화를 위한 지능형 전력망 구축',
    createdAt: new Date('2022-03-01'),
    updatedAt: new Date('2024-05-30')
  },
  {
    id: 7,
    name: '페루 리마 상하수도 시스템',
    location: '페루 리마',
    category: '인프라',
    status: 'active',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2026-12-31'),
    budget: 25000000000, // 250억원
    latitude: -12.0464,
    longitude: -77.0428,
    description: '깨끗한 식수 공급과 하수 처리 시설 현대화',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-06-05')
  }
]

// ESG 메트릭 목업 데이터
export const mockESGMetrics: ESGMetrics[] = [
  {
    id: 1,
    projectId: 1,
    co2Reduction: 120000,
    renewableEnergyRatio: 75,
    jobsCreated: 2500,
    localSatisfaction: 4.8,
    transparencyScore: 92,
    measurementDate: new Date('2024-06-01'),
    createdAt: new Date('2024-06-01')
  },
  {
    id: 2,
    projectId: 2,
    co2Reduction: 180000,
    renewableEnergyRatio: 85,
    jobsCreated: 1800,
    localSatisfaction: 4.6,
    transparencyScore: 88,
    measurementDate: new Date('2024-06-01'),
    createdAt: new Date('2024-06-01')
  },
  {
    id: 3,
    projectId: 3,
    co2Reduction: 95000,
    renewableEnergyRatio: 45,
    jobsCreated: 3200,
    localSatisfaction: 4.4,
    transparencyScore: 85,
    measurementDate: new Date('2024-06-01'),
    createdAt: new Date('2024-06-01')
  },
  {
    id: 4,
    projectId: 4,
    co2Reduction: 65000,
    renewableEnergyRatio: 60,
    jobsCreated: 2100,
    localSatisfaction: 4.7,
    transparencyScore: 89,
    measurementDate: new Date('2024-06-01'),
    createdAt: new Date('2024-06-01')
  },
  {
    id: 5,
    projectId: 6,
    co2Reduction: 140000,
    renewableEnergyRatio: 90,
    jobsCreated: 1500,
    localSatisfaction: 4.5,
    transparencyScore: 91,
    measurementDate: new Date('2024-06-01'),
    createdAt: new Date('2024-06-01')
  },
  {
    id: 6,
    projectId: 7,
    co2Reduction: 45000,
    renewableEnergyRatio: 35,
    jobsCreated: 1900,
    localSatisfaction: 4.3,
    transparencyScore: 86,
    measurementDate: new Date('2024-06-01'),
    createdAt: new Date('2024-06-01')
  }
]

// SDGs 데이터
export const mockSDGsData: SDGData[] = [
  { id: 1, title: '빈곤 종식', progress: 78, impact: 'HIGH', projects: 8, color: 'bg-red-500' },
  { id: 2, title: '기아 종식', progress: 65, impact: 'MEDIUM', projects: 5, color: 'bg-yellow-500' },
  { id: 3, title: '건강과 웰빙', progress: 84, impact: 'HIGH', projects: 12, color: 'bg-green-500' },
  { id: 4, title: '양질의 교육', progress: 72, impact: 'HIGH', projects: 9, color: 'bg-red-600' },
  { id: 5, title: '성 평등', progress: 69, impact: 'MEDIUM', projects: 7, color: 'bg-orange-500' },
  { id: 6, title: '깨끗한 물과 위생', progress: 91, impact: 'VERY_HIGH', projects: 15, color: 'bg-blue-400' },
  { id: 7, title: '깨끗한 에너지', progress: 88, impact: 'VERY_HIGH', projects: 18, color: 'bg-yellow-400' },
  { id: 8, title: '양질의 일자리와 경제성장', progress: 85, impact: 'HIGH', projects: 22, color: 'bg-red-700' },
  { id: 9, title: '산업, 혁신, 인프라', progress: 92, impact: 'VERY_HIGH', projects: 25, color: 'bg-orange-600' },
  { id: 10, title: '불평등 완화', progress: 58, impact: 'MEDIUM', projects: 6, color: 'bg-pink-500' },
  { id: 11, title: '지속가능한 도시와 공동체', progress: 89, impact: 'VERY_HIGH', projects: 20, color: 'bg-orange-400' },
  { id: 12, title: '책임감 있는 소비와 생산', progress: 67, impact: 'MEDIUM', projects: 8, color: 'bg-yellow-600' },
  { id: 13, title: '기후변화 대응', progress: 86, impact: 'VERY_HIGH', projects: 16, color: 'bg-green-600' },
  { id: 14, title: '해양생태계 보전', progress: 74, impact: 'HIGH', projects: 11, color: 'bg-blue-500' },
  { id: 15, title: '육상생태계 보전', progress: 71, impact: 'MEDIUM', projects: 9, color: 'bg-green-700' },
  { id: 16, title: '평화, 정의, 강력한 제도', progress: 79, impact: 'HIGH', projects: 13, color: 'bg-blue-600' },
  { id: 17, title: '목표달성을 위한 파트너십', progress: 94, impact: 'VERY_HIGH', projects: 30, color: 'bg-blue-800' }
]

// 국가별 데이터
export const mockCountryData: CountryData[] = [
  {
    code: 'VN',
    name: '베트남',
    projects: 3,
    totalInvestment: 85000000000,
    co2Reduction: 245000,
    jobsCreated: 5200,
    coordinates: [21.0285, 105.8542]
  },
  {
    code: 'ID',
    name: '인도네시아',
    projects: 2,
    totalInvestment: 58000000000,
    co2Reduction: 210000,
    jobsCreated: 3100,
    coordinates: [-8.3405, 115.0920]
  },
  {
    code: 'PH',
    name: '필리핀',
    projects: 2,
    totalInvestment: 42000000000,
    co2Reduction: 125000,
    jobsCreated: 4100,
    coordinates: [14.5995, 120.9842]
  },
  {
    code: 'BD',
    name: '방글라데시',
    projects: 1,
    totalInvestment: 42000000000,
    co2Reduction: 65000,
    jobsCreated: 2100,
    coordinates: [23.8103, 90.4125]
  },
  {
    code: 'UZ',
    name: '우즈베키스탄',
    projects: 1,
    totalInvestment: 38000000000,
    co2Reduction: 95000,
    jobsCreated: 2800,
    coordinates: [41.2995, 69.2401]
  },
  {
    code: 'KZ',
    name: '카자흐스탄',
    projects: 1,
    totalInvestment: 31000000000,
    co2Reduction: 140000,
    jobsCreated: 1500,
    coordinates: [43.2220, 76.8512]
  },
  {
    code: 'PE',
    name: '페루',
    projects: 1,
    totalInvestment: 25000000000,
    co2Reduction: 45000,
    jobsCreated: 1900,
    coordinates: [-12.0464, -77.0428]
  }
]