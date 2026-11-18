# next-instagram-24th

CEOS 24기 프론트엔드 5·6주차 과제로 만든 **Next.js 인스타그램 클론**입니다.
5주차에는 프로필, 게시물 상세, 좋아요·댓글·팔로우를 구현했습니다.
6주차에는 홈 피드에 무한 스크롤과 스켈레톤 UI를 적용하고, 게시물 저장 및 본인 프로필의 저장됨 기능을 추가했습니다.

<br>

## 기술 스택

- **Next.js 16** (App Router, Turbopack, `cacheComponents`)
- **React 19**, **TypeScript**
- **Tailwind CSS 4** (디자인 토큰은 `src/styles/tokens.css`의 `@theme`로 관리)
- 서버 없이 목업 데이터를 사용하고, 사용자 상호작용은 `localStorage`에 저장합니다.

<br>

## 구현 사항

### 필수 요건

- [x] **5주차 프로젝트를 이어서 기능 선정 및 구현**: 기존 프로필·상세 화면을 기반으로 홈 피드와 게시물 저장 기능을 추가했습니다.
- [x] **새로운 기능 또는 개선 사항 포함**: 홈 피드, 무한 스크롤, 피드 로딩 스켈레톤, 본인 프로필의 저장됨 탭을 구현했습니다.
- [x] **무한 스크롤 구현**: Intersection Observer API를 공통 훅으로 감싸 홈 피드에 적용하고, 하단 진입 시 게시물을 3개씩 추가합니다.
- [x] **Skeleton UI 구현**: 피드 추가 로딩 중 실제 카드와 유사한 스켈레톤을 표시하고, 로딩이 끝나면 게시물 카드로 전환합니다.
- [x] **6주차 미션을 하나의 Sprint로 진행**: Sprint 목표를 정하고 Backlog의 우선순위와 완료 기준에 따라 작업 내용을 정리했습니다.
- [x] **GitHub Repository의 README.md 작성**
  - [x] 프로젝트 소개 및 주요 기능
  - [x] 팀원별 역할 및 담당 기능
  - [x] Sprint 목표, Backlog 및 회고

### 선택 요건

- [ ] 실제 외부 API를 연동하여 데이터 처리 — 현재는 목데이터를 사용합니다.
- [ ] TanStack Query의 `useInfiniteQuery`로 무한 스크롤의 데이터 페칭·캐싱 관리 — 현재는 공통 훅과 React 상태로 표시 개수를 관리합니다.
- [ ] PR 템플릿 및 코드 리뷰 규칙 작성·적용
- [x] 추가 기능 및 개선 사항 구현 — `localStorage` 기반 게시물 저장·저장 취소, 본인 프로필의 저장됨 목록, 화면 간 저장 상태 동기화를 구현했습니다.

### Sprint Goal

Instagram 피드를 구현하고, 무한 스크롤을 적용하여 사용자가 추가 게시물을 계속해서 볼 수 있도록 개선한다.

### Sprint Backlog

| 작업 | 우선순위 | 완료 기준 | 상태 |
| --- | --- | --- | --- |
| 게시글 목데이터 구성 | 높음 | 테스트 및 프로젝트 실행 시 사용 가능한 데이터 준비 | 완료 |
| 피드 구현 | 높음 | 화면 진입 시 피드에 게시글 표시 | 완료 |
| Skeleton UI 구현 | 높음 | 화면 로딩 시 UI 확인 가능 | 완료 — 피드 추가 로딩에 적용 |
| Intersection Observer 적용 | 높음 | 하단 진입 시 추가 게시글 표시 | 완료 — 홈 피드에 적용 |
| 저장됨 기능 구현 | 중간 | 프로필 그리드에 저장한 게시물 표시 및 상세 화면 라우팅 | 완료 |
| 중복 로딩 방지 | 중간 | 불필요한 추가 로딩 방지 | 완료 |
| 코드 유지보수 | 낮음 | 코드 확인 후 개선 사항 적용 | 진행 중 |

### 팀원별 역할 및 담당 기능

| 역할 | 담당 | 6주차 담당 기능 및 작업 |
| --- | --- | --- |
| A | 김민준 | 홈 피드 화면, 피드 카드 Skeleton UI, 사이드바 홈 아이콘 연결, 게시글 목데이터 확장 |
| B | 최승하 | `useInfiniteScroll` 공통 훅, 홈 피드 무한 스크롤 연결, 게시물 저장 및 저장됨 탭, Sprint·회고·Review Questions 정리 |

### 5주차 대비 달라진 점

| 구분 | 5주차 | 6주차 |
| --- | --- | --- |
| 첫 접속 화면 | 첫 번째 사용자 프로필로 이동 | 전체 사용자 게시물을 보여주는 홈 피드 |
| 게시물 탐색 | 프로필의 게시물 그리드 중심 | 홈 피드에서 최신 게시물을 보고 작성자 프로필·상세 화면으로 이동 |
| 추가 게시물 표시 | 해당 프로필의 게시물을 한 번에 표시 | 홈 피드 하단을 감지해 게시물을 3개씩 추가 |
| 로딩 UI | 프로필·상세 페이지의 로딩 문구 | 피드 추가 로딩 중 카드 모양의 스켈레톤 표시 |
| 게시물 저장 | 새로고침하면 초기화되는 버튼 토글 | 사용자별 `localStorage` 저장 및 화면 간 상태 동기화 |
| 저장한 게시물 조회 | 별도 목록 없음 | 본인 프로필의 저장됨 탭에서 그리드로 조회 |

### 홈 피드

- 모든 사용자의 게시물을 작성일 기준 최신순으로 표시합니다.
- `FeedPostCard`에 작성자, 상대 시간, 이미지 캐러셀, 좋아요 수, 댓글 수와 본문을 표시합니다.
- 긴 본문은 일부만 표시하고, 본문의 더 보기 버튼으로 펼칠 수 있습니다.
- 작성자 프로필과 게시물 상세 화면으로 이동할 수 있습니다.
- 사이드바의 홈 아이콘을 누르면 `/`로 이동합니다.

### Intersection Observer 기반 무한 스크롤

- `useInfiniteScroll` 훅에서 목록 맨 아래의 감지 요소를 관찰합니다.
- 화면 하단에서 200px 떨어진 지점부터 감지하여 다음 게시물을 미리 표시합니다.
- 처음에는 게시물 3개를 표시하고, 하단에 도달할 때마다 3개씩 추가합니다.
- `isLoading`, `hasMore`, 타이머 참조를 확인하여 로딩 중이거나 데이터가 끝났을 때 추가 로딩을 막습니다.
- Observer 콜백의 `requested` 값으로 같은 관찰에서 중복 호출을 방지합니다.
- 컴포넌트가 해제되면 Observer와 대기 중인 로딩 타이머를 정리합니다.
- 준비된 목데이터를 모두 표시하면 로딩을 종료하고 완료 문구를 보여줍니다.

현재는 서버에서 전달받은 목데이터의 표시 개수를 늘리는 방식입니다.
실제 API에서 페이지별 데이터를 요청하거나, 마지막 게시물 이후 처음부터 반복하는 방식은 적용하지 않았습니다.

### Skeleton UI

- `FeedPostSkeleton`을 피드 카드와 비슷한 구조로 구성했습니다.
- 추가 게시물을 표시하는 동안 아바타, 이미지, 버튼, 텍스트 영역의 자리를 유지합니다.
- 목데이터는 즉시 준비되므로 스켈레톤을 확인할 수 있도록 800ms의 로딩 지연을 두었습니다.
- 로딩 상태를 스크린 리더에 전달하는 안내 문구도 제공합니다.

### 게시물 저장 및 저장됨 탭

- 홈 피드와 게시물 상세 화면에서 저장·저장 취소를 할 수 있습니다.
- `saveStorage.ts`에서 현재 사용자 ID별로 저장한 게시물 ID를 `localStorage`에 보관합니다.
- 본인 프로필(`/ngannou`)에만 저장됨 탭을 표시하고, 최근 저장한 게시물부터 보여줍니다.
- 저장을 취소하면 저장됨 목록에서도 해당 게시물이 제거됩니다.
- 저장한 게시물이 없으면 빈 상태 안내를 표시합니다.
- `useSyncExternalStore`와 커스텀 이벤트로 현재 화면의 저장 상태를 동기화하고, `storage` 이벤트로 다른 탭의 변경도 반영합니다.
- 다른 작성자의 게시물도 올바른 상세 페이지로 이동하도록 작성자별 경로를 사용합니다.

### 회고 및 개선할 점

- 하단 감지 로직을 공통 훅으로 분리해 홈 피드 외의 목록에서도 재사용할 수 있도록 구성했습니다.
- 저장 상태를 공통 저장소로 관리하여 홈 피드, 상세 화면, 저장됨 목록 사이의 상태 불일치를 줄였습니다.
- 다른 작성자의 저장 게시물로 이동할 때 발생한 모달 라우팅 충돌은 상세 페이지로 직접 이동하도록 수정했습니다.
- 프로필 그리드의 무한 스크롤과 그리드용 스켈레톤은 후속 작업으로 남아 있습니다.

<br>

## 폴더 구조

```
src/
├── app/
│   ├── page.tsx                      # 전체 사용자 게시물의 홈 피드
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
│   ├── feed/      # 홈 피드 목록, 카드, 로딩 스켈레톤
│   ├── profile/   # 프로필 헤더, 통계, 팔로우 버튼, 탭, 게시물 영역
│   └── post/      # 그리드, 썸네일, 상세, 모달, 캐러셀, 좋아요, 댓글
├── hooks/
│   └── useInfiniteScroll.ts  # Intersection Observer를 이용한 하단 감지
├── lib/
│   ├── posts.ts           # 게시물·작성자·댓글 조회
│   ├── likeStorage.ts     # 좋아요 상태 저장
│   ├── saveStorage.ts     # 사용자별 저장한 게시물 관리
│   ├── commentStorage.ts  # 작성한 댓글 저장
│   ├── followStorage.ts   # 팔로우 상태 저장
│   └── formatTime.ts      # 날짜·상대 시간 포맷
├── mocks/         # users, posts, comments 목업 데이터
├── types/         # User, Post, Comment 타입
└── styles/        # 전역 스타일, 디자인 토큰
```

<br>

## 구현하면서 신경 쓴 점

### 무한 스크롤 훅과 데이터 표시 로직 분리

하단 요소의 화면 진입 감지는 `useInfiniteScroll` 훅에서 처리하고, 게시물 표시 개수와 로딩 상태는 `FeedList`에서 관리하도록 분리했습니다. 훅은 `onLoadMore`, `isLoading`, `hasMore`를 전달받아 다른 게시물 목록에서도 재사용할 수 있도록 구성했습니다.

`rootMargin`은 하단 방향으로 `200px`을 주어 사용자가 목록 끝에 도달하기 전에 다음 게시물 표시를 시작하도록 했습니다. 현재는 외부 API 요청 없이 목데이터를 3개씩 추가로 보여주는 방식입니다.

### 중복 로딩 방지와 Observer 정리

하단 요소가 계속 화면에 보이거나 빠르게 스크롤할 때 같은 로딩이 여러 번 실행되지 않도록 처리했습니다.

- 로딩 중이거나 더 보여줄 게시물이 없으면 감지를 시작하지 않습니다.
- Observer 콜백에서는 `requested` 값을 즉시 변경하고 `disconnect()`를 호출해 React 상태가 반영되기 전의 중복 실행도 막습니다.
- `FeedList`에서도 타이머 ref를 확인해 추가 로딩을 한 번만 예약합니다.
- effect 정리 시 Observer를 해제하고, 피드가 언마운트되면 남은 타이머를 취소합니다.

### 피드 형태에 맞춘 Skeleton UI

추가 게시물을 불러오는 동안 기존 게시물은 유지하고, 목록 아래에 프로필 이미지·게시물 이미지·버튼·본문 영역을 본뜬 `FeedPostSkeleton`을 표시했습니다. 로딩이 끝나면 스켈레톤 대신 추가 게시물이 나타납니다.

목데이터는 즉시 읽을 수 있으므로 로딩 화면을 확인할 수 있도록 `800ms`의 임시 지연을 두었습니다. 로딩 영역에는 `role="status"`와 스크린 리더용 안내 문구도 추가했습니다.

### 저장 상태의 유지와 화면 간 동기화

저장한 게시물 ID를 사용자별 `localStorage` 키에 보관해 새로고침 후에도 유지되도록 했습니다. 홈 피드, 게시물 상세, 프로필의 저장됨 탭은 같은 저장소를 `useSyncExternalStore`로 구독합니다.

- 같은 탭에서는 커스텀 이벤트로, 다른 탭에서는 `storage` 이벤트로 변경 사항을 반영합니다.
- 서버 렌더링과 첫 클라이언트 렌더링에는 동일한 빈 목록을 사용해 hydration 불일치를 방지합니다.
- 저장값이 바뀌지 않으면 같은 배열 참조를 반환하도록 스냅샷을 캐싱합니다.
- 잘못된 저장값은 안전하게 처리하고, `localStorage`를 사용할 수 없으면 메모리 상태로 동작하도록 했습니다.

### 본인 프로필의 저장 목록과 상세 페이지 연결

현재 접속 사용자와 프로필 사용자의 ID를 비교해 본인 프로필에만 저장됨 탭을 표시하고, 최근 저장한 게시물이 먼저 나오도록 구성했습니다.

다른 사용자의 게시물도 저장할 수 있으므로 상세 주소는 각 게시물의 실제 작성자 username으로 생성합니다. 저장됨 탭에서는 일반 링크로 상세 페이지에 진입하도록 해, 다른 작성자의 경로로 이동할 때 프로필 모달 라우팅과 충돌하지 않도록 했습니다.


## 이미지 출처

개발자 밈 게시물(`public/images/meme-*.jpg`)에는 아래 위키미디어 공용 사진을 잘라 붙이고 문구를 더해 사용했습니다. 각 사진의 라이선스를 따릅니다.

- [Lionel Messi 20180626.jpg](https://commons.wikimedia.org/wiki/File:Lionel_Messi_20180626.jpg) · Кирилл Венедиктов · CC BY-SA 3.0
- [Lionel Messi Argentina v Spain 19 July 2026-046.jpg](https://commons.wikimedia.org/wiki/File:Lionel_Messi_Argentina_v_Spain_19_July_2026-046.jpg) · Bryan Berlin · CC BY-SA 4.0
- [Lionel Messi NE Revolution Inter Miami 7.9.25-178 (cropped 2).jpg](https://commons.wikimedia.org/wiki/File:Lionel_Messi_NE_Revolution_Inter_Miami_7.9.25-178_(cropped_2).jpg) · Bryan Berlin · CC BY-SA 4.0
- [Lionel Messi Argentina v Egypt 7 July 2026-218.jpg](https://commons.wikimedia.org/wiki/File:Lionel_Messi_Argentina_v_Egypt_7_July_2026-218.jpg) · Bryan Berlin · CC BY-SA 4.0
- [Lionel Messi Argentina v Egypt 7 July 2026-316.jpg](https://commons.wikimedia.org/wiki/File:Lionel_Messi_Argentina_v_Egypt_7_July_2026-316.jpg) · Bryan Berlin · CC BY-SA 4.0
- [Lionel Messi 20180626 (3x4 cropped).jpg](https://commons.wikimedia.org/wiki/File:Lionel_Messi_20180626_(3x4_cropped).jpg) · Кирилл Венедиктов · CC BY-SA 3.0
- [Lionel Messi Argentina v Egypt 7 July 2026-336.jpg](https://commons.wikimedia.org/wiki/File:Lionel_Messi_Argentina_v_Egypt_7_July_2026-336.jpg) · Bryan Berlin · CC BY-SA 4.0
- [Lionel Messi Argentina v Spain 19 July 2026-222.jpg](https://commons.wikimedia.org/wiki/File:Lionel_Messi_Argentina_v_Spain_19_July_2026-222.jpg) · Bryan Berlin · CC BY-SA 4.0
- [Cristiano Ronaldo, 2023.jpg](https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo,_2023.jpg) · Mehrdad Esfahani/SNN · Attribution
- [Cristiano Ronaldo 2018.jpg](https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo_2018.jpg) · Анна Нэсси · CC BY-SA 3.0
- [Cristiano Ronaldo benched.jpg](https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo_benched.jpg) · Jahrenvisuals · CC BY 4.0
- [Cristiano Ronaldo 2, 2010.jpg](https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo_2,_2010.jpg) · Jan S0L0 · CC BY-SA 2.0
- [Cristiano Ronaldo 2277.jpg](https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo_2277.jpg) · YantsImages · CC BY-SA 4.0
- [Cristiano Ronaldo (35609138466).jpg](https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo_(35609138466).jpg) · Oleg Dubyna from Poltava, Ukraine · CC BY-SA 2.0
- [Cristiano Ronaldo 4609.jpg](https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo_4609.jpg) · Майоров Владимир (changed work: Amarhgil) · CC BY-SA 3.0
