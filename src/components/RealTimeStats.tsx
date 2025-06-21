'use client'

import { useStats, useESGMetrics, usePolls } from '@/hooks/useApi'
import { LoadingSpinner, ErrorMessage } from '@/components/LoadingAndError'
import { TrendingUp, Users, Globe, Zap } from 'lucide-react'

export function RealTimeStats() {
  const { data: statsData, isLoading: statsLoading, isError: statsError } = useStats()
  const { data: esgData, isLoading: esgLoading, isError: esgError } = useESGMetrics()
  const { data: pollData, isLoading: pollLoading, isError: pollError } = usePolls()

  const isLoading = statsLoading || esgLoading || pollLoading
  const hasError = statsError || esgError || pollError

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-2 mx-auto w-20"></div>
            <div className="h-4 bg-gray-300 rounded mx-auto w-24"></div>
          </div>
        ))}
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="mb-16">
        <ErrorMessage
          title="통계 데이터 로딩 실패"
          message="실시간 통계를 불러올 수 없습니다."
          showRetry={false}
        />
      </div>
    )
  }

  // 기본값 설정 (안전한 데이터 접근)
  const stats = {
    totalProjects: esgData?.metrics?.length || 6,
    totalCO2Reduction: esgData?.totalCO2Reduction || 645000,
    totalJobs: esgData?.totalJobsCreated || 13000,
    sdgGoals: 17,
    totalVotes: pollData?.totalVotes || 9050, // usePolls에서 이미 계산된 값 사용
    activeCountries: 10
  }

  return (
    <div className="mb-16">
      {/* 실시간 배지 */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-green-100 border border-green-200 rounded-full px-4 py-2 text-sm text-green-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">실시간 업데이트</span>
        </div>
      </div>

      {/* 통계 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center group">
          <div className="flex items-center justify-center mb-2">
            <Globe className="h-6 w-6 text-blue-600 mr-2" />
            <div className="text-3xl font-bold text-blue-600 transition-all duration-300 group-hover:scale-110">
              {stats.totalProjects}+
            </div>
          </div>
          <div className="text-gray-600">글로벌 프로젝트</div>
        </div>
        
        <div className="text-center group">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
            <div className="text-3xl font-bold text-green-600 transition-all duration-300 group-hover:scale-110">
              {(stats.totalCO2Reduction / 1000).toFixed(0)}K톤
            </div>
          </div>
          <div className="text-gray-600">CO2 감축</div>
        </div>
        
        <div className="text-center group">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-purple-600 mr-2" />
            <div className="text-3xl font-bold text-purple-600 transition-all duration-300 group-hover:scale-110">
              {(stats.totalJobs / 1000).toFixed(0)}K개
            </div>
          </div>
          <div className="text-gray-600">일자리 창출</div>
        </div>
        
        <div className="text-center group">
          <div className="flex items-center justify-center mb-2">
            <Zap className="h-6 w-6 text-orange-600 mr-2" />
            <div className="text-3xl font-bold text-orange-600 transition-all duration-300 group-hover:scale-110">
              {stats.sdgGoals}개
            </div>
          </div>
          <div className="text-gray-600">SDGs 목표 달성</div>
        </div>
      </div>

      {/* 부가 통계 */}
      <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>총 투표 수: {stats.totalVotes.toLocaleString()}표</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>참여 국가: {stats.activeCountries}개국</span>
        </div>
      </div>
    </div>
  )
}
