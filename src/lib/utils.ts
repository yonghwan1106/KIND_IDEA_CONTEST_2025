import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 숫자를 한국어 형식으로 포맷팅
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num)
}

// 큰 숫자를 K, M 단위로 축약
export function formatCompactNumber(num: number): string {
  const formatter = new Intl.NumberFormat('ko-KR', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
  return formatter.format(num)
}

// 퍼센트 포맷팅
export function formatPercent(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`
}

// 날짜 포맷팅
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d)
}

// 상대 시간 포맷팅 (예: "5분 전")
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInMs = now.getTime() - d.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return '방금 전'
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`
  if (diffInHours < 24) return `${diffInHours}시간 전`
  if (diffInDays < 7) return `${diffInDays}일 전`
  
  return formatDate(d)
}

// 색상 유틸리티
export function getImpactColor(impact: string): string {
  const colors = {
    'VERY_HIGH': 'text-green-600 bg-green-100',
    'HIGH': 'text-blue-600 bg-blue-100',
    'MEDIUM': 'text-yellow-600 bg-yellow-100',
    'LOW': 'text-gray-600 bg-gray-100'
  }
  return colors[impact as keyof typeof colors] || colors.LOW
}

// 상태별 색상
export function getStatusColor(status: string): string {
  const colors = {
    'active': 'text-green-600 bg-green-100',
    'completed': 'text-blue-600 bg-blue-100',
    'planning': 'text-yellow-600 bg-yellow-100',
    'paused': 'text-gray-600 bg-gray-100'
  }
  return colors[status as keyof typeof colors] || colors.paused
}

// SDG 목표별 색상
export function getSDGColor(goalId: number): string {
  const colors = [
    'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-600', 'bg-orange-500',
    'bg-blue-400', 'bg-yellow-400', 'bg-red-700', 'bg-orange-600', 'bg-pink-500',
    'bg-orange-400', 'bg-yellow-600', 'bg-green-600', 'bg-blue-500', 'bg-green-700',
    'bg-blue-600', 'bg-blue-800'
  ]
  return colors[goalId - 1] || 'bg-gray-500'
}

// 딜레이 함수 (시뮬레이션용)
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 랜덤 범위 생성
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// 배열 셔플
export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i]!
    newArray[i] = newArray[j]!
    newArray[j] = temp
  }
  return newArray
}