# 🎬 LocaPelicula

### [🔗 배포 링크](https://locapelicula.netlify.app/)

**LocaPelicula**는 TMDB API를 기반으로 제작한 영화 정보 제공 웹 애플리케이션입니다.  
React의 컴포넌트 구조와 Router를 활용한 페이지 전환, 그리고 React Query 기반의 비동기 데이터 패칭과 상태 관리를 통해 사용자에게 실시간 영화 정보를 효과적으로 제공합니다.  
단순한 목록 조회를 넘어, 검색·정렬·필터링·예고편·리뷰 등 다양한 사용자 경험 요소를 포함한 기능 중심의 프로젝트입니다.

---

## 🚀 프로젝트 개요

- **SPA(Single Page Application)** 기반 영화 정보 사이트
- **TMDB RESTful API**를 활용해 영화 정보, 검색, 리뷰, 추천, 트레일러 등을 실시간으로 불러옴
- 페이지 전환, 검색, 상세 보기 등 주요 기능은 **React Router**로 구성
- 모든 비동기 요청은 **React Query (TanStack Query)** 기반으로 구현되어 **로딩/에러 처리**, **자동 캐싱**, **중복 요청 방지** 등 API 성능 최적화 반영

---

## 🔧 주요 기술 스택 및 구현 포인트

| 항목 | 상세 내용 |
|------|-----------|
| **프레임워크** | React 19.1.0 |
| **라우팅** | React Router v6 - 동적 라우팅, `useParams`, `useSearchParams` 등 |
| **상태 관리 & 데이터 패칭** | React Query v5 - `useQuery`, 자동 캐싱, 로딩/에러 처리 |
| **비동기 처리** | Axios + async/await |
| **스타일링** | SCSS 모듈 + React-Bootstrap 기반 커스텀 UI |
| **슬라이드 컴포넌트** | react-multi-carousel - 무한 캐러셀, 반응형 설정 |
| **Masonry 레이아웃** |  react-masonry-css - 리뷰 UI 레이아웃 설정 |
| **아이콘** | react-icons + Bootstrap Icons |
| **로딩 UI** | react-spinners 사용 (`BarLoader`) |
| **배포** | Netlify - SPA 대응 404 리다이렉트 설정 포함 |

---

## ✨ 구현 기능 상세

### 🎥 메인페이지 (Home)
- 인기 영화 기반 상단 배너 + 예고편 모달 팝업 (`Modal` + YouTube iframe)
- 현재 상영작 / 예고편 / 평점 높은 영화 / 인기 순위 / 개봉 예정작 등을 슬라이드 형식으로 제공

### 🔍 검색 페이지 (`/movies`)
- 키워드 기반 영화 검색 (TMDB API `/search/movie`)
- 정렬 옵션: 평점 혹은 인기가 높은 순, 낮은 순
- 장르, 러닝타임, 사용자 점수로 필터
- 페이지네이션

### 📄 상세 페이지 (`/movies/:id`)
- 영화 기본 정보, 장르, 개봉일, 러닝타임, 국가, 언어 등
- 출연진 및 감독 정보 시각화
- 예고편 유튜브 영상 모달 제공
- 유사 · 추천 영화 슬라이드 / 페이지네이션
- 사용자 리뷰 (200자 이상일 경우 접기/더보기 기능) + Masonry 레이아웃 적용

### 🙋 마이페이지 / 로그인페이지
- 유저 정보, 감상 시간, 선호 장르, 평가 분포 등 시각적으로 표현
- SNS 링크, 프로필 수정, 로그인 UI 설계 포함

---

## 🎯 기술적 특징

- `React Query`를 적극적으로 활용하여 **비동기 데이터 요청을 단순화하고, 성능 최적화** 구현
- **SCSS 커스텀 스타일 + React-Bootstrap 컴포넌트 병행 사용**으로 빠르면서도 일관된 UI 구성
- **동적 라우팅**, **URL 파라미터 기반 데이터 처리**, **검색어 반응형 필터링** 등 Router와 API 연동 능력 강조
- 트레일러/모달/로딩바 등 시각적 효과 요소 다양 적용 → **UX 개선 중심 설계**
- 반응형 레이아웃 대응: **데스크탑/모바일 슬라이드 수 자동 조정**, Masonry 그리드 최적화
- Netlify를 통한 간편한 SPA 배포 및 **404 페이지 대응 설정까지 포함된 실제 운영 환경 고려**

---

## 📁 폴더 구조
```
src/
├── App.js
├── index.jsx
├── layouts/
│   └── AppLayout.jsx
├── pages/
│   ├── homepage/
│   │   ├── HomePage.jsx
│   │   ├── banners/
│   │   │   └── Banner.jsx
│   │   ├── moviecard/
│   │   │   └── MovieCard.jsx
│   │   ├── nowplayingmovieslide/
│   │   │   └── NowPlayingMovieSlide.jsx
│   │   ├── popularmovieslide/
│   │   │   └── PopularMovieSlide.jsx
│   │   ├── topratedmovieslide/
│   │   │   └── TopRatedMovieSlide.jsx
│   │   ├── trailercard/
│   │   │  └── TrailerCard.jsx
│   │   ├── trailerslide/
│   │   │   └── TrailerSlide.jsx
│   │   └── upcomingmovieslide/
│   │       └── UpcomingMovieSlide.jsx
│   ├── moviedetailpage/
│   │  └── MovieDetailPage.jsx
│   ├── moviepage/
│   │  └── MoviePage.jsx
│   ├── LoadingBar.jsx
│   ├── Login.jsx
│   ├── MyPage.jsx
│   └── NotFoundPage.jsx
├── hook/
│   ├── usePopularMovies.jsx
│   ├── useTopRatedMovies.jsx
│   ├── useUpcomingMovies.jsx
│   ├── useNowPlayingMovies.jsx
│   ├── useMovieDetail.jsx
│   ├── useMovieTrailer.jsx
│   ├── useMovieCredits.jsx
│   ├── useMovieReviews.jsx
│   ├── useGenreList.jsx
│   ├── useRecommendations.jsx
│   ├── useSimilar.jsx
│   └── useSearchMovieQuery.jsx
├── styles/
│   ├── App.scss
│   └── variables.scss
└── utils/
    └── api.js
```
