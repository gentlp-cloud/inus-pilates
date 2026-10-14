# INUS PILATES 이벤트 랜딩페이지

인어스필라테스 이벤트 랜딩페이지입니다. PC와 모바일 모두에 맞춰 보입니다.

| 주소 | 내용 |
|---|---|
| `/` | 이벤트 페이지 (회원에게 공유하는 화면) |
| `/preview` | 직원 검토용 미리보기 (PC/모바일 전환, 마감 화면 확인) |

## 기술

Next.js (App Router) · TypeScript · Tailwind CSS · Vercel 배포
다음 단계에서 Supabase(데이터베이스·관리자 로그인)를 연결합니다.

## 내용 바꾸기 (관리자 페이지가 생기기 전)

문구·가격·마감일·상담 연결 주소는 모두 `lib/event-data.ts` 한 파일에 있습니다.

- 마감 시각: `endAt` (예: `2026-10-16T23:59:59+09:00`) — 이 시각이 지나면 자동으로 "접수 마감"으로 바뀝니다.
- 상담 버튼 주소: `consult.url` (카카오톡 채널, 예약 링크 등)
- 전화 버튼 번호: `consult.phone`

## 내 컴퓨터에서 실행하기 (선택)

Node.js 20 이상이 필요합니다.

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## 배포

`main` 브랜치에 푸시하면 Vercel이 자동으로 빌드하고 배포합니다.
