# 인어스필라테스 이벤트 랜딩페이지 — 작업 규칙

이 저장소는 Vercel과 연결되어 `main` 브랜치에 푸시되면 자동으로 실제 사이트에 배포됩니다.
운영자는 개발 초보자입니다. 설명은 한국어로, 클릭할 메뉴와 입력할 값을 순서대로 안내합니다.

## 수정 → 배포 흐름 (Claude가 매번 따르는 순서)

1. 작업 전에 최신 상태를 받습니다: `git pull origin main`
2. 요청받은 부분만 수정합니다. 디자인은 `app/globals.css`, 화면 구조는 `components/EventPoster.tsx`,
   문구·가격·날짜 등 내용은 `lib/event-data.ts` 에 있습니다.
3. 가능하면 빌드를 확인합니다: `npm install && npm run build`
   (작업 환경에서 npm 설치가 막혀 있으면 Vercel 빌드 결과로 확인하고, 그 사실을 운영자에게 알립니다.)
4. `main` 브랜치에 커밋하고 푸시합니다: `git push origin main`
   - 운영자가 `main`에 바로 반영하기를 원했으므로 별도 브랜치나 PR을 만들지 않습니다.
5. 푸시 후 Vercel 배포가 성공했는지 확인하고, 실패하면 오류 기록을 보고 고칩니다.
6. 운영자에게 무엇이 바뀌었는지 한두 문장으로 알립니다.

## 지켜야 할 것

- 비밀값(Supabase 키, 비밀번호 등)은 절대 코드나 GitHub에 넣지 않습니다. Vercel 환경변수에만 넣습니다.
- `.env*` 파일은 커밋하지 않습니다 (`.gitignore`에 등록됨).
- 기존 디자인을 처음부터 다시 만들지 않습니다. 요청받은 부분만 고칩니다.
- 이미지는 `public/images/` 에 둡니다.

## 폴더 구조

```
app/
  layout.tsx        사이트 전체 틀 (글꼴, 제목)
  page.tsx          메인 이벤트 페이지  →  /
  preview/page.tsx  직원 검토용 미리보기 (PC/모바일 전환, 마감 화면)  →  /preview
  globals.css       디자인 (색상·글꼴·배치)
components/
  EventPoster.tsx   이벤트 포스터 화면
  PreviewFrame.tsx  미리보기 도구 막대
  Icons.tsx         아이콘
lib/
  event-data.ts     화면에 나오는 모든 문구·가격·날짜·상담 연결 정보
public/images/      사진
```

## 앞으로 할 일

- Supabase 연결 (데이터베이스·이미지 저장소)
- 관리자 페이지 `/admin` (로그인, 문구·가격·이미지·날짜 수정)
- 이벤트 여러 개 관리 (이벤트별 주소, 메인 이벤트 지정)
