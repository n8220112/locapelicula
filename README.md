# 🎬 LocaPelicula

### [🔗 배포 링크](https://locapelicula.netlify.app/)

TMDB API 기반의 영화 정보 웹 애플리케이션입니다.  
현재 상영작부터 예고편, 사용자 리뷰, 유사 영화 추천까지 다양한 정보를 한눈에 확인할 수 있으며, 검색 기능과 정렬 기능도 제공합니다.

## 📌 주요 기능

- **홈페이지**: 인기 영화 기반 배너, 상영작/예고편/평점순/개봉예정 등 다양한 슬라이드 섹션
- **검색 페이지**: 키워드 검색 + 정렬 기능 (평점순/인기순/이름순 등)
- **상세 페이지**:
  - 영화 기본 정보 (장르, 러닝타임, 제작국가 등)
  - 예고편 영상 (YouTube 연동)
  - 출연진 및 감독
  - 사용자 리뷰 (Masonry 레이아웃 + 더보기 버튼)
  - 유사/추천 영화 슬라이드
- **마이페이지**: 유저 정보, 평가 통계, 선호 장르 등 표시
- **로그인 페이지**: UI 구현 (기능 미구현)

## 🛠 기술 스택

| 분류             | 사용 기술                                                | 비고                                                          |
| -------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| **프레임워크**      | `React 19`                                           | `react@19.1.0`                                              |
| **라우팅**        | `React Router DOM v6`                                | `react-router-dom@6.30.1`                                   |
| **상태 관리**      | `TanStack React Query v5`                            | `@tanstack/react-query@5.81.5`                              |
| **HTTP 클라이언트** | `Axios`                                              | `axios@1.10.0`                                              |
| **스타일링**       | `Sass`, `Bootstrap 5`, `React-Bootstrap`             | `sass@1.89.2`, `bootstrap@5.3.7`, `react-bootstrap@2.10.10` |
| **슬라이드**       | `React Multi Carousel`                               | `react-multi-carousel@2.8.6`                                |
| **그리드 레이아웃**   | `react-masonry-css`                                  | 리뷰 카드 Masonry 레이아웃                                          |
| **로딩 UI**      | `react-spinners`                                     | `BarLoader` 사용                                              |
| **아이콘**        | `react-icons`                                        | 다양한 아이콘 패키지 포함                                              |
| **테스트**        | `@testing-library/react`, `jest-dom`, `user-event` 등 | 기본 CRA 테스트 환경 포함                                            |


## 📁 폴더 구조 (일부)
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
