# next-instagram-24th

CEOS 24기 프론트엔드 5주차 과제로 만든 **Next.js 인스타그램 클론**입니다.
프로필 페이지, 게시물 그리드, 게시물 상세(페이지·모달), 좋아요, 댓글, 팔로우를 구현했습니다.

<br>

## 실행 방법

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에 접속하면 첫 번째 사용자 프로필(`/cristiano`)로 이동합니다.

| 주소 | 화면 |
| --- | --- |
| `/cristiano`, `/leomessi` | 사용자 프로필 |
| `/[username]/post/[postId]` | 게시물 상세 (새로고침·직접 접속 시 단독 페이지) |
| 프로필에서 게시물 클릭 | 같은 주소의 게시물 상세 모달 |

<br>

## 기술 스택

- **Next.js 16** (App Router, Turbopack, `cacheComponents`)
- **React 19**, **TypeScript**
- **Tailwind CSS 4** (디자인 토큰은 `src/styles/tokens.css`의 `@theme`로 관리)
- 서버 없이 목업 데이터를 사용하고, 사용자 상호작용은 `localStorage`에 저장합니다.

<br>

## 구현 기능

### 필수 요건

- [x] Next.js App Router로 프로젝트 생성
- [x] 공통 UI를 재사용 가능한 컴포넌트로 분리 (`Avatar`, `Button`, `Icon`, `IconButton`)
- [x] 사용자 프로필 페이지
- [x] 게시물 상세 페이지, 프로필의 게시물 그리드
- [x] 프로필 ↔ 게시물 상세 이동

### 선택 요건

- [x] 댓글 작성 및 목록 반영
- [x] 팔로우 / 언팔로우
- [ ] 게시물 저장 (버튼 토글 UI만 구현, 새로고침 시 초기화)
- [ ] 스토리
- [ ] 새 게시물 작성

### 추가 구현

- 좋아요 / 좋아요 취소, 좋아요 수 반영
- 여러 장 게시물 이미지 캐러셀
- 프로필 위에 뜨는 게시물 상세 모달 (Intercepting Routes)
- 프로필 그리드 hover 시 좋아요·댓글 수 (상세에서 누른 좋아요, 작성한 댓글까지 반영)
- "3시간", "2일"처럼 상대 시간 표시
- 프로필의 "OO님이 팔로우합니다" 표시
- 프로필 탭 (게시물 / 리포스트 / 태그됨, 리포스트·태그됨은 빈 상태 화면)

좋아요, 댓글, 팔로우 상태는 `localStorage`에 저장되어 새로고침해도 유지됩니다.

<br>

## 폴더 구조

```
src/
├── app/
│   ├── page.tsx                      # 첫 사용자 프로필로 리다이렉트
│   └── [username]/
│       ├── layout.tsx                # 프로필 + 모달 슬롯
│       ├── page.tsx                  # 프로필 페이지
│       ├── post/[postId]/page.tsx    # 게시물 상세 단독 페이지
│       └── @modal/
│           ├── (.)post/[postId]/page.tsx   # 게시물 상세 모달 (Intercepting Route)
│           ├── default.tsx
│           └── page.tsx
├── components/
│   ├── ui/        # 공통 UI: Avatar, Button, Icon, IconButton
│   ├── layout/    # 사이드바
│   ├── profile/   # 프로필 헤더, 통계, 팔로우 버튼, 탭, 게시물 영역
│   └── post/      # 그리드, 썸네일, 상세, 모달, 캐러셀, 좋아요, 댓글
├── lib/
│   ├── posts.ts           # 게시물·작성자·댓글 조회
│   ├── likeStorage.ts     # 좋아요 상태 저장
│   ├── commentStorage.ts  # 작성한 댓글 저장
│   ├── followStorage.ts   # 팔로우 상태 저장
│   └── formatTime.ts      # 날짜·상대 시간 포맷
├── mocks/         # users, posts, comments 목업 데이터
├── types/         # User, Post, Comment 타입
└── styles/        # 전역 스타일, 디자인 토큰
```

<br>

## 구현하면서 신경 쓴 점

### Server Component와 Client Component 구분

화면 구조와 데이터 조회는 Server Component에 두고, 상호작용이 필요한 부분만 `"use client"`로 분리했습니다.

| Server Component | Client Component |
| --- | --- |
| 프로필 페이지, 게시물 상세(`PostDetail`), 작성자 헤더, 본문, 썸네일 | 좋아요·저장 버튼(`PostActions`), 댓글 목록·입력, 이미지 캐러셀, 모달, 팔로우 버튼, 프로필 탭 |

예를 들어 썸네일(`PostThumbnail`)은 서버에서 그리고, hover 시 보이는 좋아요·댓글 수(`PostThumbnailStats`)만 클라이언트 컴포넌트로 분리해 저장된 상태를 반영합니다.

### 게시물 상세 모달 (Parallel + Intercepting Routes)

프로필에서 게시물을 누르면 주소는 `/[username]/post/[postId]`로 바뀌지만, 프로필 위에 모달로 열립니다.
같은 주소로 새로고침하거나 직접 접속하면 단독 상세 페이지가 보입니다.

- `@modal` 슬롯과 `(.)post/[postId]`로 프로필 안에서의 이동을 가로챕니다.
- 모달은 `<dialog>`의 `showModal()`을 사용해 포커스 가두기와 Esc 닫기를 브라우저 기본 동작으로 처리합니다.
- 상세 화면은 `PostDetail` 하나를 `variant="page" | "modal"`로 재사용합니다.

### localStorage 상태와 `useSyncExternalStore`

좋아요, 댓글, 팔로우 상태는 `localStorage`에 저장하고 `useSyncExternalStore`로 구독합니다.

- 서버 렌더링과 첫 클라이언트 렌더링은 목업 초기값을 사용해 hydration 불일치를 막습니다.
- 값이 바뀌면 커스텀 이벤트로 알려서, 상세에서 누른 좋아요가 그리드 숫자에도 바로 반영됩니다.
- 다른 탭에서 바꾼 값은 `storage` 이벤트로 반영됩니다.

### Next.js 16 `cacheComponents` 대응

- `params`처럼 요청마다 달라지는 값은 `Suspense` 안에서 읽습니다.
- 프리렌더링 중에는 `Date.now()`를 쓸 수 없어서, "3시간 전" 같은 상대 시간은 클라이언트에서 계산합니다.

<br>

## 역할 분담

| 역할 | 담당 | 작업 |
| --- | --- | --- |
| A | 최승하 | 디자인 토큰, 공통 UI 컴포넌트, 사이드바, 프로필 헤더·통계, 팔로우 |
| B | minjun | 게시물 목업 데이터, 프로필 탭·그리드, 게시물 상세 페이지·모달, 좋아요, 댓글, 이미지 캐러셀 |

<br>

## 💬 Review Questions

### React 18 버전의 변경점

#### 1. 서버 컴포넌트와 클라이언트 컴포넌트

React 18에서 서버 컴포넌트(React Server Components)가 실험적으로 소개되었고, React 19와 Next.js App Router에서 정식으로 사용할 수 있게 되었습니다.

- **서버 컴포넌트**는 서버에서만 실행됩니다. 데이터베이스나 파일에 바로 접근할 수 있고, 컴포넌트 코드가 브라우저 번들에 포함되지 않아 JS 용량이 줄어듭니다. 대신 `useState`, `useEffect`, 이벤트 핸들러를 쓸 수 없습니다.
- **클라이언트 컴포넌트**는 파일 맨 위에 `"use client"`를 적은 컴포넌트입니다. 서버에서 HTML로 먼저 그려진 뒤 브라우저에서 hydration되어 상태와 이벤트를 처리합니다.
- App Router에서는 기본이 서버 컴포넌트이고, 상호작용이 필요한 부분만 클라이언트 컴포넌트로 만드는 것이 권장됩니다. 이 프로젝트에서도 `PostDetail`은 서버 컴포넌트로 두고, 그 안의 좋아요 버튼과 댓글 입력만 클라이언트 컴포넌트로 분리했습니다.

#### 2. lazy loading과 Suspense

- `React.lazy`는 컴포넌트를 처음 필요할 때 불러오도록 코드를 나눕니다.
- `Suspense`는 아직 준비되지 않은 컴포넌트 대신 `fallback`을 보여줍니다.
- React 17까지는 `Suspense`가 클라이언트의 `lazy`에서만 동작했지만, React 18부터 **서버 렌더링에서도 동작**합니다.
  - **Streaming SSR**: 준비된 부분의 HTML부터 먼저 보내고, 느린 부분은 `fallback`을 보여줬다가 준비되면 이어서 보냅니다.
  - **Selective Hydration**: 페이지 전체가 hydration될 때까지 기다리지 않고, 준비된 부분부터 상호작용할 수 있습니다. 사용자가 누른 부분을 먼저 hydration하기도 합니다.
- 이 프로젝트에서는 Next.js 16의 `cacheComponents` 설정 때문에 `params`를 `Suspense` 안에서 읽고, 모달 슬롯도 `Suspense`로 감쌌습니다.

#### 3. Automatic Batching

여러 번의 상태 업데이트를 묶어서 한 번만 렌더링하는 것을 batching이라고 합니다.

- React 17까지는 React 이벤트 핸들러 안에서만 batching되었고, `setTimeout`, `Promise`, 네이티브 이벤트 안의 업데이트는 각각 렌더링되었습니다.
- React 18부터는 `createRoot`를 사용하면 **어디서 일어난 업데이트든 자동으로 묶어서** 렌더링합니다.
- 바로 화면에 반영해야 하는 경우에는 `flushSync`로 batching을 피할 수 있습니다.

```tsx
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React 17: 렌더링 2번 / React 18: 렌더링 1번
}, 1000);
```

#### 4. Concurrent Rendering

React 18의 가장 큰 변화로, 렌더링을 **중단하고 다시 시작할 수 있게** 되었습니다.
이전에는 렌더링이 한번 시작되면 끝날 때까지 멈출 수 없어서, 무거운 렌더링 중에는 입력이 끊기는 문제가 있었습니다.

- `startTransition` / `useTransition`: 급하지 않은 업데이트를 표시해 두면, 그 사이에 들어온 입력 같은 급한 업데이트를 먼저 처리합니다.
- `useDeferredValue`: 값의 업데이트를 뒤로 미뤄서, 예를 들어 검색어 입력은 바로 반영하고 결과 목록은 조금 늦게 그리도록 할 수 있습니다.

```tsx
const [isPending, startTransition] = useTransition();

function handleChange(value: string) {
  setInput(value); // 급한 업데이트: 입력창
  startTransition(() => setQuery(value)); // 급하지 않은 업데이트: 검색 결과
}
```

#### 5. 그 밖의 변경점

- **`createRoot`**: `ReactDOM.render` 대신 `createRoot`를 사용해야 위의 새 기능들이 활성화됩니다.
- **`useId`**: 서버와 클라이언트에서 같은 고유 id를 만듭니다. 이 프로젝트의 프로필 탭에서 탭과 패널을 연결하는 `aria` 속성에 사용했습니다.
- **`useSyncExternalStore`**: 외부 저장소를 concurrent rendering에서도 안전하게 구독합니다. 이 프로젝트의 좋아요·댓글·팔로우 상태(`localStorage`)를 이 훅으로 구독했습니다.
- **Strict Mode**: 개발 모드에서 컴포넌트를 마운트 → 언마운트 → 다시 마운트해서, effect 정리(cleanup)가 제대로 되어 있는지 확인할 수 있습니다.

<br>

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 18 공식 블로그](https://react.dev/blog/2022/03/29/react-v18)
- [Intercepting Routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes)
- [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
