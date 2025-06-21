// 기본 타입 정의
export interface Project {
  id: number
  name: string
  location: string
  category: string
  status: 'active' | 'completed' | 'planning' | 'paused'
  startDate: Date
  endDate?: Date
  budget: number
  latitude?: number
  longitude?: number
  description?: string
  createdAt: Date
  updatedAt: Date
}

// ESG 관련 타입
export interface ESGMetrics {
  id: number
  projectId: number
  co2Reduction: number // 톤 단위
  renewableEnergyRatio: number // 퍼센트
  jobsCreated: number
  localSatisfaction: number // 1-5 점수
  transparencyScore: number // 1-100 점수
  measurementDate: Date
  createdAt: Date
}

export interface ESGSummary {
  environmental: {
    co2Reduction: number
    renewableEnergy: number
    energyEfficiency: number
  }
  social: {
    jobsCreated: number
    localSatisfaction: number
    trainingPrograms: number
  }
  governance: {
    transparencyScore: number
    complianceRate: number
    partnershipSatisfaction: number
  }
}

// SDGs 관련 타입
export interface SDGContribution {
  id: number
  projectId: number
  sdgGoal: number // 1-17
  contributionScore: number // 0-100
  impactDescription: string
  measurementDate: Date
  createdAt: Date
}

export interface SDGData {
  id: number
  title: string
  progress: number
  impact: 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW'
  projects: number
  color: string
}

// 사용자 관련 타입
export interface UserPreferences {
  id: number
  sessionId: string
  interestedCategories: string[]
  preferredRegions: string[]
  createdAt: Date
}

export interface User {
  id: string
  name?: string
  email?: string
  preferences?: UserPreferences
}

// 피드백 관련 타입
export interface CitizenFeedback {
  id: number
  projectId: number
  feedbackType: 'rating' | 'comment' | 'vote'
  rating?: number // 1-5
  comment?: string
  createdAt: Date
}

export interface VoteOption {
  text: string // 옵션 텍스트
  option?: string // 호환성을 위해 유지
  votes: number
  percentage?: number
}

export interface Poll {
  id: number
  question: string
  options: VoteOption[]
  totalVotes: number
  isActive: boolean
  createdAt: Date
  endDate?: Date
}

// AI 추천 관련 타입
export interface Recommendation {
  id: number
  projectId: number
  userId?: string
  sessionId: string
  matchScore: number // 0-100
  reasons: string[]
  createdAt: Date
}

export interface ChatMessage {
  role: 'user' | 'bot'
  content: string
  timestamp?: Date
}

// 분석 관련 타입
export interface KPIData {
  totalVisitors: number
  dailyActiveUsers: number
  engagementRate: number
  satisfactionScore: number
  totalVotes: number
  feedbackCount: number
  avgSessionTime: number
}

export interface PageTraffic {
  page: string
  visitors: number
  bounce: number
  avgTime: number
}

export interface UserActivity {
  id: number
  action: string
  user: string
  time: string
  type: 'vote' | 'view' | 'ai' | 'feedback' | 'chat'
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 국가별 데이터 타입
export interface CountryData {
  code: string
  name: string
  projects: number
  totalInvestment: number
  co2Reduction: number
  jobsCreated: number
  coordinates: [number, number] // [lat, lng]
}

// 차트 데이터 타입
export interface ChartDataPoint {
  label: string
  value: number
  color?: string
  category?: string
}

export interface TimeSeriesData {
  date: string
  value: number
  category?: string
}

// 필터 관련 타입
export interface FilterOptions {
  regions: string[]
  categories: string[]
  status: string[]
  dateRange: {
    start: Date
    end: Date
  }
}

// 글로벌 상태 타입
export interface GlobalState {
  isLoading: boolean
  user: User | null
  preferences: UserPreferences | null
  filters: FilterOptions
  selectedProject: Project | null
}

// 이벤트 타입
export interface SystemEvent {
  type: 'project_update' | 'user_action' | 'system_alert'
  payload: any
  timestamp: Date
}

// 설정 타입
export interface AppConfig {
  apiUrl: string
  mapboxToken?: string
  openaiApiKey?: string
  enableAnalytics: boolean
  enableRealtime: boolean
}