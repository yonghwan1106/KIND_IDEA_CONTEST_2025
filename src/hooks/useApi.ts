// 정적 배포용 API 훅 (SWR 제거, 목업 데이터 사용)
import { useMemo } from 'react'
import { 
  mockProjects, 
  mockESGMetrics, 
  mockSDGsData, 
  mockCountryData 
} from '@/lib/data/projects'
import {
  mockActivityData,
  mockStatsData,
  mockPollsData,
  mockMessagesData,
  mockRecommendationsData
} from '@/lib/data/mockData'

// 간단한 정적 데이터 반환 (로딩 시뮬레이션 제거)
function useStaticData<T>(data: T) {
  return useMemo(() => ({
    data,
    isLoading: false,
    isError: false,
    mutate: () => {}
  }), [data])
}

// ESG 메트릭 데이터 훅
export function useESGMetrics() {
  return useStaticData({
    metrics: mockESGMetrics,
    totalCO2Reduction: 850000,
    totalJobsCreated: 15200,
    averageSatisfaction: 4.6,
    averageTransparency: 88.5
  })
}

// 프로젝트 데이터 훅
export function useProjects() {
  const totalCO2Reduction = mockESGMetrics.reduce((sum, metric) => sum + metric.co2Reduction, 0)
  const totalJobsCreated = mockESGMetrics.reduce((sum, metric) => sum + metric.jobsCreated, 0)

  return useStaticData({
    projects: mockProjects,
    stats: {
      totalProjects: mockProjects.length,
      activeProjects: mockProjects.filter(p => p.status === 'active').length,
      totalCO2Reduction,
      totalJobsCreated
    }
  })
}

// SDGs 데이터 훅
export function useSDGs() {
  return useStaticData({
    sdgs: mockSDGsData,
    overallProgress: 78.4,
    highImpactGoals: mockSDGsData.filter(sdg => sdg.impact === 'VERY_HIGH').length,
    totalProjects: mockSDGsData.reduce((sum, sdg) => sum + sdg.projects, 0)
  })
}

// 국민 참여 데이터 훅
export function useCitizenEngagement() {
  return useStaticData({
    polls: mockPollsData,
    messages: mockMessagesData,
    totalParticipants: 12450,
    participationRate: 73.5,
    activePolls: mockPollsData.filter(poll => poll.isActive).length
  })
}

// 투표 데이터 훅
export function usePolls() {
  return useStaticData({
    polls: mockPollsData,
    totalVotes: mockPollsData.reduce((sum, poll) => sum + poll.totalVotes, 0)
  })
}

// AI 추천 데이터 훅
export function useRecommendations(sessionId?: string) {
  return useStaticData({
    recommendations: mockRecommendationsData,
    personalizedScore: 89.2,
    totalRecommendations: mockRecommendationsData.length
  })
}

// 글로벌 메시지 훅
export function useGlobalMessages() {
  return useStaticData({
    messages: mockMessagesData,
    totalMessages: 1240,
    verifiedMessages: mockMessagesData.filter(msg => msg.isVerified).length
  })
}

// 활동 로그 훅
export function useActivityLog() {
  return useStaticData({
    activities: mockActivityData,
    totalActivities: 156,
    recentActivities: mockActivityData.slice(0, 5)
  })
}

// 시스템 통계 훅
export function useStats() {
  return useStaticData(mockStatsData)
}

// 국가별 데이터 훅
export function useCountryData() {
  return useStaticData({
    countries: mockCountryData,
    totalCountries: mockCountryData.length,
    totalInvestment: mockCountryData.reduce((sum, country) => sum + country.totalInvestment, 0)
  })
}

// 투표 제출 함수 (정적 배포용 - 로컬 상태 업데이트만)
export async function submitVote(pollId: number, optionId: number) {
  // 실제 서버 없이 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: '투표가 성공적으로 제출되었습니다.',
        pollId,
        optionId
      })
    }, 1000)
  })
}

// 글로벌 메시지 제출 함수 (정적 배포용)
export async function submitGlobalMessage(message: string, country: string, category: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: '메시지가 성공적으로 전송되었습니다.',
        data: {
          id: Date.now(),
          message,
          country,
          category,
          timestamp: new Date().toISOString()
        }
      })
    }, 1500)
  })
}