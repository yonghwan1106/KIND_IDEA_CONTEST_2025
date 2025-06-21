import Link from 'next/link'
import { ArrowRight, Globe, TrendingUp, Users, Brain } from 'lucide-react'
import { RealTimeStats } from '@/components/RealTimeStats'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">KIND Impact Platform</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/esg-dashboard" className="text-gray-700 hover:text-blue-600">ESG 대시보드</Link>
              <Link href="/sdgs-impact" className="text-gray-700 hover:text-blue-600">SDGs 임팩트</Link>
              <Link href="/ai-recommendations" className="text-gray-700 hover:text-blue-600">AI 추천</Link>
              <Link href="/citizen-engagement" className="text-gray-700 hover:text-blue-600">국민 참여</Link>
              <Link href="/admin" className="text-red-600 hover:text-red-700 font-medium">관리자</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* 공모전 라벨 */}
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm text-blue-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium">2025 KIND 국민제안 아이디어 공모전 - 프로토타입 데모</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              ESG 시대,
            </span>
            <br />
            세금으로 만든 글로벌 성과를
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              국민이 직접 체감하다
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            KIND의 해외 개발 투자 성과를 ESG와 SDGs 관점에서 투명하게 공개하고, 
            AI 기술로 국민 맞춤형 정보를 제공하는 혁신적인 플랫폼입니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/esg-dashboard"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              데모 체험하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="#features"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              기능 살펴보기
            </Link>
          </div>

          {/* 실시간 통계 섹션 */}
          <RealTimeStats />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4가지 핵심 혁신 기능</h2>
            <p className="text-xl text-gray-600">기존 시스템을 뛰어넘는 차세대 투명성 플랫폼</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ESG 임팩트 대시보드 */}
            <Link href="/esg-dashboard" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-blue-200 group-hover:border-blue-300">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">ESG 임팩트 대시보드</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  환경, 사회, 거버넌스 성과를 실시간으로 투명하게 공개하는 혁신적인 대시보드
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• CO2 감축량 실시간 추적</li>
                  <li>• 일자리 창출 현황 지도</li>
                  <li>• 투명성 지수 레이더 차트</li>
                </ul>
                <div className="mt-6 text-blue-600 font-medium group-hover:text-blue-700">
                  체험하기 →
                </div>
              </div>
            </Link>

            {/* SDGs 기여도 측정 */}
            <Link href="/sdgs-impact" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-green-200 group-hover:border-green-300">
                <div className="flex items-center mb-4">
                  <Globe className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">SDGs 기여도 실시간 측정</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  UN 지속가능발전목표 17개 항목별 한국의 기여도를 정량적으로 측정
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• 17개 SDGs 목표별 진행률</li>
                  <li>• 글로벌 임팩트 지수</li>
                  <li>• 국가별 성과 비교</li>
                </ul>
                <div className="mt-6 text-green-600 font-medium group-hover:text-green-700">
                  체험하기 →
                </div>
              </div>
            </Link>

            {/* AI 기반 개인화 추천 */}
            <Link href="/ai-recommendations" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-purple-200 group-hover:border-purple-300">
                <div className="flex items-center mb-4">
                  <Brain className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">AI 기반 개인화 추천</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  개인의 관심사와 지역에 맞춘 맞춤형 프로젝트 정보 추천 시스템
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• 관심분야별 맞춤 정보</li>
                  <li>• AI 챗봇 질의응답</li>
                  <li>• 지역연계 프로젝트 추천</li>
                </ul>
                <div className="mt-6 text-purple-600 font-medium group-hover:text-purple-700">
                  체험하기 →
                </div>
              </div>
            </Link>

            {/* 국민 참여형 소통 */}
            <Link href="/citizen-engagement" className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-orange-200 group-hover:border-orange-300">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-orange-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">국민 참여형 글로벌 소통</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  진정한 양방향 소통을 통한 국민 의견 수렴 및 글로벌 네트워킹
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• 글로벌 시민 의견 투표</li>
                  <li>• 현지-국민 직접 소통</li>
                  <li>• 성과 평가 참여</li>
                </ul>
                <div className="mt-6 text-orange-600 font-medium group-hover:text-orange-700">
                  체험하기 →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            KIND의 글로벌 성과, 이제 국민이 직접 확인하세요
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            투명하고 혁신적인 ESG 플랫폼으로 한국의 글로벌 임팩트를 체감해보세요
          </p>
          <Link 
            href="/esg-dashboard"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            지금 체험하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">KIND Impact Platform</span>
            </div>
            <p className="text-gray-400 mb-4">
              2025 KIND 국민제안 아이디어 공모전 - 프로토타입 데모
            </p>
            <p className="text-sm text-gray-500">
              제안자: 박용환 | 이메일: sanoramyun8@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}