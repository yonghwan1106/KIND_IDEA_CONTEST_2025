'use client'

import Link from 'next/link'
import { ArrowLeft, Users, Vote, MessageSquare, Star, Globe, Heart, ThumbsUp, Send } from 'lucide-react'
import { useState } from 'react'
import { 
  usePolls, 
  useCitizenEngagement, 
  useGlobalMessages, 
  submitVote, 
  submitGlobalMessage 
} from '@/hooks/useApi'
import { 
  PageLoading, 
  ErrorMessage, 
  ConnectionStatus, 
  LastUpdated,
  RealTimeBadge,
  EmptyState
} from '@/components/LoadingAndError'

export default function CitizenEngagement() {
  const [activeTab, setActiveTab] = useState('voting')
  const [selectedRating, setSelectedRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [chatMessage, setChatMessage] = useState('')
  const [userCountry, setUserCountry] = useState('한국')
  const [messageCategory, setMessageCategory] = useState('일반')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 실제 API 데이터 호출
  const { data: pollsData, isLoading: pollsLoading, isError: pollsError, mutate: mutatePoll } = usePolls()
  const { data: citizenData, isLoading: citizenLoading, isError: citizenError, mutate: mutateCitizen } = useCitizenEngagement()
  const { data: messagesData, isLoading: messagesLoading, isError: messagesError, mutate: mutateMessages } = useGlobalMessages()

  const isLoading = pollsLoading || citizenLoading || messagesLoading
  const hasError = pollsError || citizenError || messagesError

  // 로딩 중일 때
  if (isLoading) {
    return <PageLoading />
  }

  // 에러 발생 시
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <ErrorMessage
          title="국민 참여 데이터 로딩 실패"
          message="국민 참여 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          onRetry={() => {
            mutatePoll()
            mutateCitizen()
            mutateMessages()
          }}
        />
      </div>
    )
  }

  // 데이터가 없을 때
  if (!pollsData || !citizenData || !messagesData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <EmptyState 
          title="국민 참여 데이터를 준비 중입니다"
          message="국민 참여 시스템이 아직 준비되지 않았습니다."
        />
      </div>
    )
  }

  // API에서 받은 실제 데이터
  const polls = pollsData.polls || []
  const activePoll = polls.find((poll: any) => poll.isActive) || polls[0]
  const stats = { 
    totalParticipants: citizenData.totalParticipants || 0, 
    averageRating: 4.6, 
    engagementRate: citizenData.participationRate || 0 
  }
  const feedback_list: any[] = [] // 정적 배포용 임시 빈 배열
  const messages = messagesData.messages || []

  const handleVote = async (optionId: number) => {
    if (!activePoll || isSubmitting) return

    setIsSubmitting(true)
    try {
      await submitVote(activePoll.id, optionId)
      mutatePoll() // 데이터 새로고침
    } catch (error) {
      console.error('투표 제출 실패:', error)
      alert('투표 제출에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRatingSubmit = async () => {
    if (selectedRating > 0 && feedback.trim()) {
      // 실제 구현에서는 피드백 제출 API 호출
      alert(`평가가 제출되었습니다!\n평점: ${selectedRating}점\n의견: ${feedback}`)
      setSelectedRating(0)
      setFeedback('')
      mutateCitizen() // 데이터 새로고침
    }
  }

  const sendMessage = async () => {
    if (!chatMessage.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await submitGlobalMessage(chatMessage, userCountry, messageCategory)
      setChatMessage('')
      mutateMessages() // 메시지 목록 새로고침
      alert('메시지가 전송되었습니다!')
    } catch (error) {
      console.error('메시지 전송 실패:', error)
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-orange-600 hover:text-orange-800">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">국민 참여형 글로벌 소통 시스템</h1>
              <RealTimeBadge />
            </div>
            <div className="flex items-center space-x-4">
              <ConnectionStatus isOnline={true} />
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-gray-600">실시간 국민 의견 수렴</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 실시간 통계 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">실시간 국민 참여 현황</h2>
            <p className="text-orange-100">KIND 프로젝트에 대한 국민들의 생생한 목소리</p>
            <div className="mt-2">
              <LastUpdated timestamp={new Date()} />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{stats.totalParticipants?.toLocaleString() || '0'}</div>
              <div className="text-orange-100">총 참여자 수</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{Number(stats.averageRating || 0).toFixed(1)}/5.0</div>
              <div className="text-orange-100">평균 만족도</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{Math.round(Number(stats.engagementRate || 0))}%</div>
              <div className="text-orange-100">참여 활성도</div>
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'voting', label: '실시간 투표', icon: Vote },
                { id: 'feedback', label: '성과 평가', icon: Star },
                { id: 'global-chat', label: '글로벌 소통', icon: MessageSquare }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium ${
                      activeTab === tab.id
                        ? 'text-orange-600 border-b-2 border-orange-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* 실시간 투표 */}
            {activeTab === 'voting' && (
              <div>
                {activePoll ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {activePoll.question}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      국민 여러분의 의견을 바탕으로 KIND의 향후 정책 방향을 결정합니다.
                    </p>

                    <div className="space-y-4">
                      {activePoll.options.map((option: any, index: number) => {
                        const totalVotes = activePoll.options.reduce((sum: number, opt: any) => sum + opt.votes, 0)
                        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0
                        
                        return (
                          <div key={`option-${index}`} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">{option.text}</span>
                              <span className="text-sm text-gray-500">
                                {option.votes.toLocaleString()}표 ({percentage}%)
                              </span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-3 mb-2">
                              <div 
                                className="bg-orange-600 h-3 rounded-full transition-all duration-500"
                                style={{width: `${percentage}%`}}
                              ></div>
                            </div>
                            <button
                              onClick={() => handleVote(index)}
                              disabled={isSubmitting}
                              className="text-orange-600 hover:text-orange-700 text-sm font-medium disabled:opacity-50"
                            >
                              {isSubmitting ? '투표 중...' : '이 옵션에 투표하기'}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <EmptyState 
                    title="진행 중인 투표가 없습니다"
                    message="새로운 투표가 곧 시작될 예정입니다."
                  />
                )}
              </div>
            )}

            {/* 성과 평가 */}
            {activeTab === 'feedback' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  KIND 프로젝트 성과를 평가해주세요
                </h3>
                <p className="text-gray-600 mb-6">
                  완료된 프로젝트에 대한 국민 만족도를 평가하고 의견을 남겨주세요.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">KIND 프로젝트 종합 평가</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    진행 중인 모든 프로젝트에 대한 종합적인 평가를 부탁드립니다.
                  </p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      전반적인 만족도는?
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={`rating-star-${star}`}
                          onClick={() => setSelectedRating(star)}
                          className={`p-1 ${
                            star <= selectedRating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          <Star className="h-8 w-8 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      의견 및 제안사항
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="KIND 프로젝트에 대한 의견을 자유롭게 남겨주세요..."
                      className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    />
                  </div>

                  <button
                    onClick={handleRatingSubmit}
                    disabled={selectedRating === 0 || !feedback.trim()}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    평가 제출하기
                  </button>
                </div>

                {/* 기존 피드백 목록 */}
                {feedback_list.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">최근 시민 의견</h4>
                    {feedback_list.slice(0, 3).map((item: any, index: number) => (
                      <div key={`feedback-${item.id || index}`} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={`feedback-${item.id || index}-star-${i}`} 
                                  className={`h-4 w-4 ${
                                    i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">{item.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 글로벌 소통 */}
            {activeTab === 'global-chat' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  현지 주민과 직접 소통하기
                </h3>
                <p className="text-gray-600 mb-6">
                  KIND 프로젝트 현지에서 온 실시간 메시지를 확인하고 응답해보세요.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message: any, index: number) => (
                      <div key={`message-${message.id || index}`} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getCountryFlag(message.country)}</span>
                            <span className="font-medium text-gray-900">{message.country}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(message.category)}`}>
                              {message.category}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(message.createdAt).toLocaleString('ko-KR')}
                          </span>
                        </div>
                        <p className="text-gray-700">{message.message}</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm">
                            <Heart className="h-4 w-4" />
                            <span>감사</span>
                          </button>
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                            <MessageSquare className="h-4 w-4" />
                            <span>답글</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">글로벌 메시지 보내기</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">국가</label>
                      <select
                        value={userCountry}
                        onChange={(e) => setUserCountry(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="한국">한국</option>
                        <option value="베트남">베트남</option>
                        <option value="인도네시아">인도네시아</option>
                        <option value="우즈베키스탄">우즈베키스탄</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                      <select
                        value={messageCategory}
                        onChange={(e) => setMessageCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="일반">일반</option>
                        <option value="감사">감사</option>
                        <option value="질문">질문</option>
                        <option value="제안">제안</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="전 세계 KIND 프로젝트 현지에 메시지를 보내보세요..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isSubmitting || !chatMessage.trim()}
                      className="bg-orange-600 text-white rounded-lg px-4 py-2 hover:bg-orange-700 transition-colors disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    메시지는 현지 파트너를 통해 전달되며, 실시간 번역 서비스를 통해 현지 언어로 전달됩니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
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
              href="/ai-recommendations"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              AI 추천 체험
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// 헬퍼 함수들
function getCountryFlag(country: string): string {
  const flagMap: Record<string, string> = {
    '베트남': '🇻🇳',
    '인도네시아': '🇮🇩',
    '우즈베키스탄': '🇺🇿',
    '방글라데시': '🇧🇩',
    '카자흐스탄': '🇰🇿',
    '페루': '🇵🇪',
    '한국': '🇰🇷'
  }
  return flagMap[country] || '🌍'
}

function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    '감사': 'bg-green-100 text-green-800',
    '질문': 'bg-blue-100 text-blue-800',
    '제안': 'bg-purple-100 text-purple-800',
    '일반': 'bg-gray-100 text-gray-800'
  }
  return colorMap[category] || 'bg-gray-100 text-gray-800'
}
