'use client'

import Link from 'next/link'
import { ArrowLeft, Globe, Target, TrendingUp, Award } from 'lucide-react'
import { useState } from 'react'
import { useSDGs } from '@/hooks/useApi'
import { 
  PageLoading, 
  ErrorMessage, 
  ConnectionStatus, 
  LastUpdated,
  RealTimeBadge,
  EmptyState
} from '@/components/LoadingAndError'

export default function SDGsImpact() {
  const [selectedSDG, setSelectedSDG] = useState<number | null>(null)

  // 실제 API 데이터 호출
  const { data: sdgsData, isLoading, isError, mutate } = useSDGs()

  // 로딩 중일 때
  if (isLoading) {
    return <PageLoading />
  }

  // 에러 발생 시
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <ErrorMessage
          title="SDGs 데이터 로딩 실패"
          message="SDGs 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          onRetry={() => mutate()}
        />
      </div>
    )
  }

  // 데이터가 없을 때
  if (!sdgsData || !sdgsData.sdgs) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <EmptyState 
          title="SDGs 데이터를 준비 중입니다"
          message="지속가능발전목표 데이터가 아직 준비되지 않았습니다."
        />
      </div>
    )
  }

  // API에서 받은 실제 데이터
  const sdgs = sdgsData.sdgs
  const stats = {
    averageScore: sdgsData.overallProgress || 78.4,
    totalProjects: sdgsData.totalProjects || 0,
    highImpactCount: sdgsData.highImpactGoals || 0
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'VERY_HIGH': return 'text-green-600 bg-green-100'
      case 'HIGH': return 'text-blue-600 bg-blue-100'
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'VERY_HIGH': return '매우 높음'
      case 'HIGH': return '높음'
      case 'MEDIUM': return '보통'
      default: return '낮음'
    }
  }

  const getSDGColor = (id: number) => {
    const colors = [
      'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-600', 'bg-orange-500',
      'bg-blue-400', 'bg-yellow-400', 'bg-red-700', 'bg-orange-600', 'bg-pink-500',
      'bg-orange-400', 'bg-yellow-600', 'bg-green-600', 'bg-blue-500', 'bg-green-700',
      'bg-blue-600', 'bg-blue-800'
    ]
    return colors[id - 1] || 'bg-gray-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">SDGs 기여도 실시간 측정</h1>
              <RealTimeBadge />
            </div>
            <div className="flex items-center space-x-4">
              <ConnectionStatus isOnline={true} />
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">UN 지속가능발전목표 연계</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 전체 통계 요약 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">한국의 SDGs 글로벌 임팩트</h2>
            <p className="text-blue-100">KIND 해외 투자를 통한 UN 지속가능발전목표 기여도</p>
            <div className="mt-2">
              <LastUpdated timestamp={new Date()} />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{Math.round(stats.averageScore)}%</div>
              <div className="text-blue-100">평균 달성도</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{stats.totalProjects}</div>
              <div className="text-blue-100">총 연계 프로젝트</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{stats.highImpactCount}/17</div>
              <div className="text-blue-100">고임팩트 목표</div>
            </div>
          </div>
        </div>

        {/* SDGs 목표별 진행률 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">17개 SDGs 목표별 달성 현황</h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">2024년 기준</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sdgs.map((sdg: any) => (
              <div 
                key={sdg.id}
                className={`border border-gray-200 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                  selectedSDG === sdg.id ? 'border-blue-500 shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedSDG(selectedSDG === sdg.id ? null : sdg.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-full ${getSDGColor(sdg.id)} flex items-center justify-center text-white font-bold text-sm`}>
                    {sdg.id}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(sdg.impact)}`}>
                    {getImpactText(sdg.impact)}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{sdg.title}</h3>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>진행률</span>
                    <span>{Math.round(Number(sdg.progress))}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getSDGColor(sdg.id)}`}
                      style={{width: `${Math.round(Number(sdg.progress))}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  기여도 점수: {Number(sdg.progress).toFixed(1)}
                </div>

                {selectedSDG === sdg.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600 space-y-2">
                      <p><strong>주요 성과:</strong></p>
                      <ul className="text-xs space-y-1">
                        <li>• 현지 역량 강화 프로그램 운영</li>
                        <li>• 지속가능한 인프라 구축</li>
                        <li>• 기술 이전 및 노하우 공유</li>
                        <li>• 지역 사회와의 협력 확대</li>
                      </ul>
                      <p className="text-xs text-gray-500 mt-2">
                        임팩트 레벨: <span className="font-medium">{getImpactText(sdg.impact)}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 글로벌 비교 */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">주요 공여국 비교</h3>
            <div className="space-y-4">
              {[
                { country: '한국', score: 78 },
                { country: '일본', score: 76 },
                { country: '독일', score: 82 },
                { country: '덴마크', score: 85 },
                { country: '노르웨이', score: 87 },
                { country: '스웨덴', score: 84 }
              ].map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{country.country}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${country.country === '한국' ? 'bg-blue-600' : 'bg-gray-400'}`}
                        style={{width: `${country.score}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8">{country.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">우수 성과 목표</h3>
            <div className="space-y-3">
              {sdgs
                .filter((sdg: any) => Number(sdg.progress) >= 85)
                .sort((a: any, b: any) => Number(b.progress) - Number(a.progress))
                .slice(0, 5)
                .map((sdg: any) => (
                  <div key={sdg.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full ${getSDGColor(sdg.id)} flex items-center justify-center text-white font-bold text-xs`}>
                        {sdg.id}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{sdg.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-bold text-green-600">{Math.round(Number(sdg.progress))}%</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">다른 혁신 기능도 체험해보세요</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/esg-dashboard"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              ESG 대시보드 보기
            </Link>
            <Link 
              href="/ai-recommendations"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              AI 추천 체험
            </Link>
            <Link 
              href="/citizen-engagement"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              국민 참여하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}