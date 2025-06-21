'use client'

import Link from 'next/link'
import { 
  ArrowLeft, 
  Brain, 
  MessageCircle, 
  Send, 
  User, 
  Bot, 
  Sparkles, 
  MapPin, 
  Calendar, 
  TrendingUp,
  Target,
  CheckCircle,
  Info,
  Star,
  ThumbsUp,
  Zap,
  Filter
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRecommendations, useProjects } from '@/hooks/useApi'
import { 
  PageLoading, 
  ErrorMessage, 
  ConnectionStatus, 
  LastUpdated,
  RealTimeBadge,
  EmptyState
} from '@/components/LoadingAndError'
import ClientOnly from '@/components/ClientOnly'

export default function AIRecommendations() {
  const [preferences, setPreferences] = useState({
    interests: [] as string[],
    regions: [] as string[],
    experience: 'beginner',
    investmentInterest: 'medium',
    preferredImpactType: 'environmental'
  })
  
  const [chatMessages, setChatMessages] = useState<Array<{role: string, content: string}>>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')

  // 클라이언트에서만 sessionId 생성
  useEffect(() => {
    // 고유한 세션 ID 생성 (브라우저 세션용)
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
  }, [])

  // 실제 API 데이터 호출 (sessionId가 있을 때만)
  const { data: recommendationsData, isLoading: recLoading, isError: recError, mutate: mutateRec } = useRecommendations(sessionId)
  const { data: projectsData, isLoading: projLoading, isError: projError } = useProjects()

  // 클라이언트에서만 초기 메시지 설정
  useEffect(() => {
    setChatMessages([
      { role: 'bot', content: '안녕하세요! 저는 KIND AI 어시스턴트입니다. 💡\n\n개인화된 프로젝트 추천을 위해 왼쪽 설정 패널에서 관심 분야와 지역을 선택해주세요. 설정 완료 후 "맞춤 추천 받기" 버튼을 눌러보세요! 🚀' }
    ])
  }, [])

  const interestOptions = [
    { id: 'environment', label: '환경/기후변화', icon: '🌱' },
    { id: 'energy', label: '에너지', icon: '⚡' },
    { id: 'transport', label: '교통', icon: '🚗' },
    { id: 'urban', label: '도시개발', icon: '🏙️' },
    { id: 'education', label: '교육', icon: '📚' },
    { id: 'healthcare', label: '보건의료', icon: '🏥' },
    { id: 'ict', label: '정보통신', icon: '📱' },
    { id: 'agriculture', label: '농업', icon: '🌾' },
    { id: 'water', label: '수자원', icon: '💧' },
    { id: 'waste', label: '폐기물 관리', icon: '♻️' }
  ]

  const regionOptions = [
    { id: 'southeast_asia', label: '동남아시아', countries: ['베트남', '인도네시아', '필리핀'] },
    { id: 'south_asia', label: '서남아시아', countries: ['방글라데시', '인도', '파키스탄'] },
    { id: 'central_asia', label: '중앙아시아', countries: ['우즈베키스탄', '카자흐스탄'] },
    { id: 'africa', label: '아프리카', countries: ['이집트', '가나', '케냐'] },
    { id: 'latin_america', label: '중남미', countries: ['페루', '콜롬비아', '칠레'] },
    { id: 'eastern_europe', label: '동유럽', countries: ['우크라이나', '폴란드'] }
  ]

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
    
    // 관심 분야가 선택되면 Step 2로 진행
    if (!preferences.interests.includes(interest)) {
      setCurrentStep(2)
    }
  }

  const handleRegionToggle = (region: string) => {
    setPreferences(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }))
  }

  const sendMessage = () => {
    if (!currentMessage.trim()) return

    const newMessages = [...chatMessages, { role: 'user', content: currentMessage }]
    setChatMessages(newMessages)
    setCurrentMessage('')
    setIsTyping(true)
    
    // AI 응답 시뮬레이션 (실제 구현에서는 API 호출)
    setTimeout(() => {
      let botResponse = ''
      const msg = currentMessage.toLowerCase()
      
      if (msg.includes('베트남') || msg.includes('하노이')) {
        const vietnamProject = projectsData?.projects?.find((p: any) => p.location === '베트남')
        if (vietnamProject) {
          botResponse = `베트남 하노이 스마트시티 프로젝트는 현재 진행 중입니다! 🏙️\n\n✨ **실제 데이터 기반 주요 성과:**\n• 프로젝트명: ${vietnamProject.name}\n• 현재 상태: ${vietnamProject.status}\n• 총 투자액: ${vietnamProject.budget?.toLocaleString()}억원\n\n이 프로젝트는 ${preferences.interests.includes('urban') ? '도시개발' : '스마트시티'} 분야에 관심 있으신 분들께 특히 추천됩니다! 💡`
        } else {
          botResponse = `베트남 관련 프로젝트 정보를 확인 중입니다. 잠시만 기다려주세요! 🔍`
        }
      } else if (msg.includes('추천') || msg.includes('관심')) {
        const interests = preferences.interests.map(i => interestOptions.find(opt => opt.id === i)?.label).filter(Boolean).join(', ')
        botResponse = `${interests || '여러 분야'}에 관심이 있으시군요! 🎯\n\n개인화 설정을 기반으로 AI가 분석한 결과:\n• 총 ${projectsData?.stats?.totalProjects || 6}개 프로젝트 중 매치도 분석 완료\n• 상위 3개 프로젝트 추천 준비 완료\n\n"맞춤 추천 받기" 버튼을 눌러 상세한 추천 결과를 확인해보세요! ✨`
      } else if (msg.includes('환경') || msg.includes('esg')) {
        botResponse = `환경 분야에 대한 훌륭한 질문이네요! 🌱\n\nKIND의 해외 투자 프로젝트는 모두 ESG 원칙을 기반으로 합니다:\n\n🌍 **실시간 환경 임팩트:**\n• 연간 CO2 감축: ${projectsData?.stats?.totalCO2Reduction ? (projectsData.stats.totalCO2Reduction / 1000).toFixed(0) : '645'}K톤\n• 신재생에너지 전환률: 68%\n• 친환경 기술 도입률: 100%\n\n특히 관심 있으신 분야가 있다면 더 자세히 설명해드릴게요! 💚`
      } else if (msg.includes('사용법') || msg.includes('어떻게')) {
        botResponse = `사용법을 안내해드릴게요! 📋\n\n**1단계:** ⚙️ 왼쪽 개인화 설정에서 관심 분야와 지역을 선택\n**2단계:** 🤖 "맞춤 추천 받기" 버튼 클릭하여 AI 분석 시작\n**3단계:** ⭐ 추천 결과 확인 및 상세 정보 탐색\n**4단계:** 💬 궁금한 점은 언제든 저에게 물어보세요!\n\n지금 바로 시작해보시겠어요? 🚀`
      } else if (msg.includes('통계') || msg.includes('데이터')) {
        botResponse = `실시간 KIND 프로젝트 통계를 알려드릴게요! 📊\n\n**📈 최신 데이터 (${new Date().toLocaleDateString('ko-KR')}):**\n• 총 프로젝트: ${projectsData?.stats?.totalProjects || 6}개\n• 총 일자리 창출: ${projectsData?.stats?.totalJobsCreated?.toLocaleString() || '13,000'}개\n• 평균 만족도: 4.6/5.0\n• 참여 국가: 10개국\n\n이 데이터들은 실시간으로 업데이트됩니다! 🔄`
      } else {
        botResponse = `좋은 질문이네요! 🤔\n\nKIND의 해외 투자 프로젝트는 투명성과 지속가능성을 최우선으로 합니다. 모든 프로젝트는 ESG 기준에 따라:\n\n✅ 환경 보호\n✅ 사회적 가치 창출 \n✅ 투명한 거버넌스\n\n를 고려합니다. 구체적으로 어떤 부분이 궁금하신가요? 💡`
      }
      
      setChatMessages(prev => [...prev, { role: 'bot', content: botResponse }])
      setIsTyping(false)
    }, 1500)
  }

  // 실제 프로젝트 데이터 기반 추천 시스템
  const getRecommendedProjects = () => {
    if (!projectsData || !projectsData.projects) return []
    
    const projects = projectsData.projects
    
    // 매치 점수 계산 알고리즘
    const scoredProjects = projects.map((project: any) => {
      let score = 0
      let reasons = []
      
      // 지역 매칭 (30점)
      const projectRegion = getProjectRegion(project.location)
      if (preferences.regions.includes(projectRegion)) {
        score += 30
        reasons.push(`선호 지역 일치 (+30점)`)
      }
      
      // 카테고리 매칭 (40점) - 프로젝트 타입 기반
      const projectCategories = getProjectCategories(project)
      const categoryMatches = projectCategories.filter((cat: string) => preferences.interests.includes(cat))
      if (categoryMatches.length > 0) {
        const categoryScore = Math.min(40, categoryMatches.length * 20)
        score += categoryScore
        reasons.push(`관심 분야 ${categoryMatches.length}개 일치 (+${categoryScore}점)`)
      }
      
      // 프로젝트 상태 가산점 (15점)
      if (project.status === 'ACTIVE') {
        score += 15
        reasons.push('현재 진행 중인 프로젝트 (+15점)')
      }
      
      // 경험 수준별 가산점 (15점)
      if (preferences.experience === 'expert' && project.budget && project.budget > 400) {
        score += 15
        reasons.push('대규모 투자 프로젝트 (+15점)')
      } else if (preferences.experience === 'beginner' && project.budget && project.budget < 300) {
        score += 15
        reasons.push('적정 규모 프로젝트 (+15점)')
      }
      
      return {
        ...project,
        match: Math.min(100, score),
        matchReasons: reasons
      }
    })

    return scoredProjects
      .sort((a: any, b: any) => b.match - a.match)
      .slice(0, 3)
  }

  // 프로젝트 지역을 지역 옵션과 매칭
  const getProjectRegion = (location: string): string => {
    if (['베트남', '인도네시아', '필리핀'].includes(location)) return 'southeast_asia'
    if (['방글라데시', '인도', '파키스탄'].includes(location)) return 'south_asia'
    if (['우즈베키스탄', '카자흐스탄'].includes(location)) return 'central_asia'
    if (['페루', '콜롬비아', '칠레'].includes(location)) return 'latin_america'
    return 'other'
  }

  // 프로젝트 카테고리 추출
  const getProjectCategories = (project: any): string[] => {
    const categories = []
    const name = project.name.toLowerCase()
    
    if (name.includes('스마트') || name.includes('도시')) categories.push('urban', 'ict')
    if (name.includes('에너지') || name.includes('전력')) categories.push('energy')
    if (name.includes('교통') || name.includes('철도')) categories.push('transport')
    if (name.includes('환경') || name.includes('친환경')) categories.push('environment')
    if (name.includes('물') || name.includes('상하수도')) categories.push('water')
    if (name.includes('병원') || name.includes('의료')) categories.push('healthcare')
    
    return categories.length > 0 ? categories : ['urban'] // 기본값
  }

  const handleGetRecommendations = () => {
    if (preferences.interests.length === 0 || preferences.regions.length === 0) {
      setChatMessages(prev => [...prev, 
        { role: 'user', content: '맞춤 추천을 받고 싶어요' },
        { role: 'bot', content: '추천을 위해서는 관심 분야와 지역을 최소 1개씩 선택해주세요! 😊\n\n설정을 완료한 후 다시 시도해주세요.' }
      ])
      return
    }
    
    setShowRecommendations(true)
    setCurrentStep(3)
    
    // 추천 완료 메시지 추가
    setChatMessages(prev => [...prev, 
      { role: 'user', content: '맞춤 추천을 받고 싶어요' },
      { role: 'bot', content: `훌륭해요! ✨ AI 분석이 완료되었습니다.\n\n개인화 설정 기반으로 ${getRecommendedProjects().length}개의 최적 프로젝트를 찾았습니다. 왼쪽 패널에서 추천 결과를 확인해보세요!\n\n각 프로젝트의 매치도와 추천 이유도 함께 제공됩니다. 💡` }
    ])
  }

  // 로딩 상태 처리 (sessionId가 없거나 로딩 중)
  if (!sessionId || projLoading) {
    return <PageLoading />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-purple-600 hover:text-purple-800">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">AI 기반 개인화 추천 시스템</h1>
              <RealTimeBadge />
            </div>
            <div className="flex items-center space-x-4">
              <ConnectionStatus isOnline={true} />
              <div className="flex items-center space-x-2">
                <ClientOnly fallback={<div className="h-5 w-5" />}>
                  <Brain className="h-5 w-5 text-purple-600" />
                </ClientOnly>
                <span className="text-sm text-gray-600">맞춤형 프로젝트 추천</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 사용법 가이드 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <ClientOnly fallback={<div className="h-6 w-6" />}>
                <Info className="h-6 w-6 text-purple-600 mr-3" />
              </ClientOnly>
              <h2 className="text-xl font-bold text-gray-900">AI 추천 시스템 사용법</h2>
            </div>
            <LastUpdated timestamp={new Date()} />
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
              currentStep >= 1 ? 'border-purple-300 shadow-md' : 'border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <ClientOnly fallback={<div className="h-5 w-5 ml-2" />}>
                  <Target className="h-5 w-5 text-purple-600 ml-2" />
                </ClientOnly>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">관심사 설정</h3>
              <p className="text-sm text-gray-600">관심 분야와 지역을 선택하세요</p>
            </div>
            
            <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
              currentStep >= 2 ? 'border-purple-300 shadow-md' : 'border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <ClientOnly fallback={<div className="h-5 w-5 ml-2" />}>
                  <Zap className="h-5 w-5 text-purple-600 ml-2" />
                </ClientOnly>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">AI 분석</h3>
              <p className="text-sm text-gray-600">AI가 최적의 프로젝트를 분석합니다</p>
            </div>
            
            <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
              currentStep >= 3 ? 'border-purple-300 shadow-md' : 'border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
                <ClientOnly fallback={<div className="h-5 w-5 ml-2" />}>
                  <Star className="h-5 w-5 text-purple-600 ml-2" />
                </ClientOnly>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">맞춤 추천</h3>
              <p className="text-sm text-gray-600">개인화된 프로젝트 추천을 확인하세요</p>
            </div>
            
            <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
              currentStep >= 4 ? 'border-purple-300 shadow-md' : 'border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 4 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  4
                </div>
                <ClientOnly fallback={<div className="h-5 w-5 ml-2" />}>
                  <MessageCircle className="h-5 w-5 text-purple-600 ml-2" />
                </ClientOnly>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">AI 상담</h3>
              <p className="text-sm text-gray-600">궁금한 점을 AI에게 물어보세요</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 개인화 설정 패널 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <ClientOnly fallback={<div className="h-6 w-6 mr-3" />}>
                  <Sparkles className="h-6 w-6 text-purple-600 mr-3" />
                </ClientOnly>
                <h2 className="text-xl font-bold text-gray-900">개인화 설정</h2>
              </div>

              {/* 관심 분야 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  관심 분야 ({preferences.interests.length}개 선택)
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        preferences.interests.includes(interest.id)
                          ? 'bg-purple-100 border-purple-300 text-purple-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-1">{interest.icon}</span>
                      {interest.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 관심 지역 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  관심 지역 ({preferences.regions.length}개 선택)
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {regionOptions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => handleRegionToggle(region.id)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        preferences.regions.includes(region.id)
                          ? 'bg-purple-100 border-purple-300 text-purple-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {region.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 경험 수준 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">해외 개발 관련 경험</h3>
                <select 
                  value={preferences.experience}
                  onChange={(e) => setPreferences(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="beginner">초보자 (일반 국민)</option>
                  <option value="intermediate">중급자 (관련 업계 종사자)</option>
                  <option value="expert">전문가 (해외 개발 전문가)</option>
                </select>
              </div>

              <button
                onClick={handleGetRecommendations}
                disabled={preferences.interests.length === 0 || preferences.regions.length === 0}
                className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {preferences.interests.length === 0 || preferences.regions.length === 0 
                  ? '관심사를 선택해주세요' 
                  : '맞춤 추천 받기'
                }
              </button>
            </div>

            {/* 추천 결과 */}
            {showRecommendations && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  AI 맞춤 추천 프로젝트 🎯
                </h2>
                <div className="space-y-4">
                  {getRecommendedProjects().map((project: any) => (
                    <div key={project.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-medium">
                          {project.match}% 매치
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center mb-3">
                        <div>
                          <div className="font-bold text-green-600">{project.location}</div>
                          <div className="text-gray-500">위치</div>
                        </div>
                        <div>
                          <div className="font-bold text-blue-600">{project.status}</div>
                          <div className="text-gray-500">상태</div>
                        </div>
                        <div>
                          <div className="font-bold text-orange-600">{project.budget || 'N/A'}억원</div>
                          <div className="text-gray-500">투자액</div>
                        </div>
                      </div>
                      {project.matchReasons && project.matchReasons.length > 0 && (
                        <div className="text-xs text-gray-500">
                          <strong>추천 이유:</strong> {project.matchReasons.slice(0, 2).join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI 챗봇 */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col h-[600px]">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <ClientOnly fallback={<div className="h-6 w-6 mr-3" />}>
                  <Bot className="h-6 w-6 text-purple-600 mr-3" />
                </ClientOnly>
                <h2 className="text-xl font-bold text-gray-900">KIND AI 어시스턴트</h2>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>실시간 연결</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}>
                      <ClientOnly fallback={<div className="h-4 w-4" />}>
                        {message.role === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </ClientOnly>
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-500">
                      <ClientOnly fallback={<div className="h-4 w-4" />}>
                        <Bot className="h-4 w-4 text-white" />
                      </ClientOnly>
                    </div>
                    <div className="rounded-lg p-3 bg-gray-100 text-gray-900">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="프로젝트에 대해 궁금한 점을 물어보세요..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  <ClientOnly fallback={<div className="h-4 w-4" />}>
                    <Send className="h-4 w-4" />
                  </ClientOnly>
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button 
                  onClick={() => setCurrentMessage('베트남 하노이 프로젝트에 대해 알려주세요')}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                >
                  베트남 프로젝트 문의
                </button>
                <button 
                  onClick={() => setCurrentMessage('실시간 통계 데이터를 보여주세요')}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                >
                  실시간 통계 확인
                </button>
                <button 
                  onClick={() => setCurrentMessage('AI 추천 시스템 사용법을 알려주세요')}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                >
                  사용법 문의
                </button>
              </div>
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
              href="/sdgs-impact"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              SDGs 임팩트 보기
            </Link>
            <Link 
              href="/citizen-engagement"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              국민 참여하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
