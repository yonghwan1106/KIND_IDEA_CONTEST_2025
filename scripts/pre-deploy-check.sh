#!/bin/bash

# 배포 전 필수 품질 검사 스크립트
# usage: ./scripts/pre-deploy-check.sh

echo "🔍 배포 전 품질 검사를 시작합니다..."

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 에러 카운터
ERROR_COUNT=0

# 1. TypeScript 타입 검사
echo -e "\n${YELLOW}1. TypeScript 타입 검사 중...${NC}"
if npm run type-check; then
    echo -e "${GREEN}✅ TypeScript 타입 검사 통과${NC}"
else
    echo -e "${RED}❌ TypeScript 타입 에러 발견${NC}"
    ((ERROR_COUNT++))
fi

# 2. ESLint 검사
echo -e "\n${YELLOW}2. ESLint 코드 품질 검사 중...${NC}"
if npm run lint; then
    echo -e "${GREEN}✅ ESLint 검사 통과${NC}"
else
    echo -e "${RED}❌ ESLint 에러 발견${NC}"
    ((ERROR_COUNT++))
fi

# 3. 빌드 테스트
echo -e "\n${YELLOW}3. 프로덕션 빌드 테스트 중...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ 빌드 성공${NC}"
else
    echo -e "${RED}❌ 빌드 실패${NC}"
    ((ERROR_COUNT++))
fi

# 4. 결과 요약
echo -e "\n${YELLOW}📊 검사 결과 요약${NC}"
echo "================================"

if [ $ERROR_COUNT -eq 0 ]; then
    echo -e "${GREEN}🎉 모든 검사 통과! 배포 준비가 완료되었습니다.${NC}"
    echo -e "${GREEN}✅ TypeScript 타입 에러: 0개${NC}"
    echo -e "${GREEN}✅ ESLint 에러: 0개${NC}"
    echo -e "${GREEN}✅ 빌드 상태: 성공${NC}"
    exit 0
else
    echo -e "${RED}⚠️  배포 전 ${ERROR_COUNT}개의 문제를 해결해야 합니다.${NC}"
    echo -e "${RED}❌ 배포 권장하지 않음${NC}"
    exit 1
fi