'use client'

import Link from 'next/link'
import { 
  ArrowLeft, 
  BarChart3, 
  Users, 
  Globe, 
  TrendingUp, 
  Activity,
  Eye,
  MessageSquare,
  Vote,
  Star
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  // 실시간 KPI 데이터 (시뮬레이션)
  const [kpiData, setKpiData] = useState({
    totalVisitors: 45230,
    dailyActiveUsers: 2847,
    engagementRate: 73.5,
    satisfactionScore: 4.6,
    totalVotes: 15420,
    feedbackCount: 892,
    avgSessionTime: 8.4
  })

  // 페이지별 트래픽
  const pageTraffic = [
    { page: '메인 페이지', visitors: 18500, bounce: 24 },
    { page: 'ESG 대시보드', visitors: 12300, bounce: 18 },
    { page: 'SDGs 임팩트', visitors: 8900, bounce: 22 },
    { page: 'AI 추천', visitors: 7800, bounce: 15 },
    { page: '국민 참여', visitors: 6700, bounce: 12 }
  ]

  // 최근 사용자 활동
  const recentActivities = [
    { id: 1, action: '새로운 투표 참여', user: '익명_001', time: '2분 전', type: 'vote' },
    { id: 2, action: 'ESG 대시보드 조회', user: '익명_002', time: '5분 전', type: 'view' },
    { id: 3, action: 'AI 추천 사용', user: '익명_003', time: '7분 전', type: 'ai' },
    { id: 4, action: '프로젝트 평가 제출', user: '익명_004', time: '12분 전', type: 'feedback' },
    { id: 5, action: 'SDGs 상세 조회', user: '익명_005', time: '15분 전', type: 'view' }
  ]

  // 실시간 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData(prev => ({
        ...prev,
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 5),
        dailyActiveUsers: prev.dailyActiveUsers + Math.floor(Math.random() * 3),
        engagementRate: prev.engagementRate + (Math.random() - 0.5) * 0.5,
        satisfactionScore: Math.min(5, Math.max(1, prev.satisfactionScore + (Math.random() - 0.5) * 0.1))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'vote': return <Vote className="h-4 w-4 text-orange-600" />
      case 'view': return <Eye className="h-4 w-4 text-blue-600" />
      case 'ai': return <Activity className="h-4 w-4 text-purple-600" />
      case 'feedback': return <Star className="h-4 w-4 text-green-600" />
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">실시간 모니터링</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 방문자</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.totalVisitors.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5% 어제 대비</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">일일 활성 사용자</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.dailyActiveUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+8.3% 어제 대비</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">참여율</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.engagementRate.toFixed(1)}%</p>
                <p className="text-xs text-green-600">+5.7% 어제 대비</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">만족도</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.satisfactionScore.toFixed(1)}/5.0</p>
                <p className="text-xs text-green-600">+0.2 어제 대비</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 페이지별 트래픽 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">페이지별 트래픽</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {pageTraffic.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{page.page}</span>
                      <span className="text-sm text-gray-500">{page.visitors.toLocaleString()}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{width: `${(page.visitors / 18500) * 100}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>이탈률: {page.bounce}%</span>
                      <span>방문자 수</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 실시간 사용자 활동 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">실시간 사용자 활동</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live</span>
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 상세 통계 */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">참여 통계</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">총 투표 수</span>
                <span className="text-sm font-medium">{kpiData.totalVotes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">피드백 수</span>
                <span className="text-sm font-medium">{kpiData.feedbackCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">평균 세션 시간</span>
                <span className="text-sm font-medium">{kpiData.avgSessionTime}분</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">시스템 상태</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">서버 상태</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">정상</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">데이터베이스</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">정상</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI 서비스</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">정상</span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">성과 목표</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">월간 방문자 목표</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">참여율 목표</span>
                  <span className="font-medium">91%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '91%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">만족도 목표</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 액션</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Globe className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">프로젝트 관리</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">상세 분석</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">사용자 관리</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageSquare className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">피드백 관리</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}