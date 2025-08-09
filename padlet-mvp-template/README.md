# Padlet-스타일 그리드 보드 — 무가입 MVP 템플릿

## 빠른 시작
```bash
npm i
npx prisma db push
npm run dev
```

## 필요 환경변수 (.env.local)
```
POSTGRES_URL=""
BLOB_READ_WRITE_TOKEN=""
APP_URL="http://localhost:3000"
```

## Vercel 배포 요약
1) Vercel 프로젝트 생성 → Storage: **Postgres** 연결 (환경변수 자동 추가)  
2) Storage: **Blob** 생성 → RW Token 발급 → `BLOB_READ_WRITE_TOKEN`에 저장  
3) 배포 후 `/`에서 보드 생성 → 공개 URL/관리자 URL 사용

## 폴더 구조
- `app/` — Next.js App Router, API Routes 포함
- `components/` — UI 컴포넌트
- `lib/` — DB, SSE 유틸
- `prisma/` — 스키마

## 기능
- 보드 생성(무가입), 텍스트/이미지 카드, 좋아요
- SSE 실시간 반영, 관리자 모드(업로드 잠금/숨김/삭제)
