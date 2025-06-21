import { AlertCircle, Wifi, WifiOff } from 'lucide-react'

// 로딩 스피너 컴포넌트
export function LoadingSpinner({ message = "데이터를 불러오는 중..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="h-8 w-8 animate-spin border-2 border-blue-600 border-t-transparent rounded-full" />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  )
}

// 전체 페이지 로딩
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="text-center space-y-4">
        <div className="h-12 w-12 mx-auto animate-spin border-4 border-blue-600 border-t-transparent rounded-full" />
        <h2 className="text-xl font-semibold text-gray-900">데이터를 불러오는 중</h2>
        <p className="text-gray-600">실시간 데이터를 가져오고 있습니다...</p>
      </div>
    </div>
  )
}

// 카드 로딩 스켈레톤
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gray-300 rounded mr-3"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="h-2 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="h-2 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}

// 프로젝트 카드 스켈레톤
export function ProjectCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl p-4 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="h-5 bg-gray-300 rounded w-48"></div>
          <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="h-8 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="h-8 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="h-8 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}

// 에러 메시지 컴포넌트
interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

export function ErrorMessage({ 
  title = "데이터 로딩 실패", 
  message = "데이터를 불러오는 중 오류가 발생했습니다.", 
  onRetry,
  showRetry = true
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-red-50 rounded-2xl border border-red-200">
      <AlertCircle className="h-8 w-8 text-red-600" />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
        <p className="text-red-700 text-sm mb-4">{message}</p>
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  )
}

// 연결 상태 표시 컴포넌트
export function ConnectionStatus({ isOnline = true }: { isOnline?: boolean }) {
  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
      isOnline 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {isOnline ? (
        <Wifi className="h-3 w-3" />
      ) : (
        <WifiOff className="h-3 w-3" />
      )}
      <span>{isOnline ? '실시간 연결' : '연결 끊김'}</span>
    </div>
  )
}

// 데이터 업데이트 시간 표시
export function LastUpdated({ timestamp }: { timestamp?: Date | string }) {
  if (!timestamp) return null
  
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  
  let timeAgo = ''
  if (diffMinutes < 1) {
    timeAgo = '방금 전'
  } else if (diffMinutes < 60) {
    timeAgo = `${diffMinutes}분 전`
  } else if (diffMinutes < 1440) {
    const hours = Math.floor(diffMinutes / 60)
    timeAgo = `${hours}시간 전`
  } else {
    timeAgo = date.toLocaleDateString('ko-KR')
  }
  
  return (
    <span className="text-xs text-gray-500">
      마지막 업데이트: {timeAgo}
    </span>
  )
}

// 실시간 업데이트 배지
export function RealTimeBadge() {
  return (
    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span>실시간</span>
    </div>
  )
}

// 빈 상태 컴포넌트
export function EmptyState({ 
  title = "데이터가 없습니다", 
  message = "표시할 데이터가 없습니다.",
  icon = AlertCircle 
}: { 
  title?: string
  message?: string
  icon?: any
}) {
  const Icon = icon
  
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-gray-500">
      <Icon className="h-12 w-12" />
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}
