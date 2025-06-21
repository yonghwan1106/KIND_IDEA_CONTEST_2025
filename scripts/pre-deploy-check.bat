@echo off
echo 🔍 배포 전 품질 검사를 시작합니다...

set ERROR_COUNT=0

echo.
echo 1. TypeScript 타입 검사 중...
call npm run type-check
if %errorlevel% equ 0 (
    echo ✅ TypeScript 타입 검사 통과
) else (
    echo ❌ TypeScript 타입 에러 발견
    set /a ERROR_COUNT+=1
)

echo.
echo 2. ESLint 코드 품질 검사 중...
call npm run lint
if %errorlevel% equ 0 (
    echo ✅ ESLint 검사 통과
) else (
    echo ❌ ESLint 에러 발견
    set /a ERROR_COUNT+=1
)

echo.
echo 3. 프로덕션 빌드 테스트 중...
call npm run build
if %errorlevel% equ 0 (
    echo ✅ 빌드 성공
) else (
    echo ❌ 빌드 실패
    set /a ERROR_COUNT+=1
)

echo.
echo 📊 검사 결과 요약
echo ================================

if %ERROR_COUNT% equ 0 (
    echo 🎉 모든 검사 통과! 배포 준비가 완료되었습니다.
    echo ✅ TypeScript 타입 에러: 0개
    echo ✅ ESLint 에러: 0개
    echo ✅ 빌드 상태: 성공
    exit /b 0
) else (
    echo ⚠️  배포 전 %ERROR_COUNT%개의 문제를 해결해야 합니다.
    echo ❌ 배포 권장하지 않음
    exit /b 1
)