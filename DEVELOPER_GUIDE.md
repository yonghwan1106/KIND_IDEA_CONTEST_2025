# 개발자 가이드 - 품질 관리 프로세스

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
cd demo-website
npm install
```

### 2. 개발 서버 시작
```bash
npm run dev
```

### 3. 배포 전 품질 검사 (필수!)
```bash
# Windows
./scripts/pre-deploy-check.bat

# macOS/Linux
./scripts/pre-deploy-check.sh

# 또는 npm 스크립트
npm run quality-check
```

## 📋 개발 워크플로우

### 코드 작성 시
1. **타입 안전성 체크**: `npm run type-check`
2. **실시간 타입 체크**: `npm run type-check:watch`
3. **코드 스타일 체크**: `npm run lint`
4. **자동 수정**: `npm run lint:fix`

### 커밋 전
Git Hook이 자동으로 다음을 실행합니다:
- ESLint 자동 수정
- Prettier 포맷팅
- 타입 체크

### 배포 전 (필수!)
```bash
npm run quality-check
```
모든 검사가 통과해야만 배포를 진행하세요.

## 🛠️ 사용 가능한 스크립트

| 스크립트 | 설명 | 언제 사용 |
|---------|------|---------|
| `npm run dev` | 개발 서버 시작 | 개발 중 |
| `npm run build` | 프로덕션 빌드 | 배포 전 테스트 |
| `npm run start` | 프로덕션 서버 시작 | 빌드 후 테스트 |
| `npm run lint` | ESLint 검사 | 코드 품질 확인 |
| `npm run lint:fix` | ESLint 자동 수정 | 스타일 문제 해결 |
| `npm run type-check` | TypeScript 타입 검사 | 타입 에러 확인 |
| `npm run type-check:watch` | 실시간 타입 검사 | 개발 중 |
| `npm run quality-check` | 전체 품질 검사 | 배포 전 필수 |
| `npm run pre-commit` | 커밋 전 검사 | Git Hook |
| `npm run pre-push` | 푸시 전 검사 | Git Hook |

## 🎯 품질 기준

### TypeScript
- **Zero Type Errors**: 타입 에러 0개 유지
- **Strict Mode**: 엄격한 타입 검사 활성화
- **No Implicit Any**: 암시적 any 금지

### ESLint
- **No Errors**: ESLint 에러 0개
- **Minimal Warnings**: 경고 최소화
- **Consistent Style**: 일관된 코드 스타일

### Build
- **Successful Build**: 빌드 성공 필수
- **No Build Warnings**: 빌드 경고 최소화

## 🔧 IDE 설정

### VS Code (권장)
프로젝트에 `.vscode/settings.json`이 설정되어 있습니다:
- 저장 시 자동 포맷팅
- ESLint 자동 수정
- TypeScript 엄격 검사

### 권장 VS Code 확장
- ESLint
- Prettier
- TypeScript Importer
- Auto Import

## 🚨 문제 해결

### 빌드 실패 시
1. `npm run type-check` 실행하여 타입 에러 확인
2. `npm run lint` 실행하여 스타일 에러 확인
3. 각 에러를 하나씩 수정
4. `npm run build` 재시도

### 타입 에러 해결
```typescript
// 🚫 잘못된 예
const data = response.data; // any 타입

// ✅ 올바른 예
interface ApiResponse {
  data: UserData[];
}
const data: ApiResponse = response.data;
```

### 일반적인 에러 패턴
1. **Missing Type Definitions**: 타입 정의 누락
2. **Implicit Any**: 암시적 any 사용
3. **Unused Variables**: 사용하지 않는 변수
4. **Missing Return Types**: 반환 타입 누락

## 📈 성과 지표

목표:
- ✅ TypeScript 에러: 0개
- ✅ 빌드 성공률: 100%
- ✅ 배포 성공률: 95%+
- ✅ 코드 리뷰 시간: 50% 단축

## 🎉 배포 체크리스트

배포 전 다음을 확인하세요:

- [ ] `npm run quality-check` 모든 검사 통과
- [ ] 로컬에서 `npm run build` 성공
- [ ] 주요 기능 브라우저 테스트 완료
- [ ] 환경 변수 설정 확인
- [ ] 데이터베이스 마이그레이션 완료 (필요시)

모든 항목이 체크되면 배포를 진행하세요! 🚀