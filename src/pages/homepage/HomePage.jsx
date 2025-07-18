import React from "react";
import {useNavigate} from "react-router-dom";

import Banner from "./banners/Banner";
import PopularMovieSlide from "./popularmovieslide/PopularMovieSlide";
import NowPlayingMovieSlide from "./nowplayingmovieslide/NowPlayingMovieSlide";
import TopRatedMovieSlide from "./topratedmovieslide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./upcomingmovieslide/UpcomingMovieSlide";
import LatestTrailerSection from "./latesttrailersection/LatestTrailerSection";
import OnAirTVSlide from "./onairTVslide/OnAirTVSlide";
import TopRatedTVSlide from "./topratedTVslide/TopRatedTVSlide";
import PopularTVSlide from "./popularTVslide/PopularTVSlide";

import {Container, Row, Col} from "react-bootstrap";

const HomePage = () => {
  const navigate = useNavigate();

  const homeSections = [
    {
      id: "latestTrailers",
      title: "최신 예고편",
      description: "",
      component: <LatestTrailerSection />,
    },
    {
      id: "NowPlaying",
      title: "현재 상영작",
      description: "극장에서 바로 만나보실 수 있는 영화입니다.",
      component: <NowPlayingMovieSlide />,
    },
    {
      id: "TopRated",
      title: "평점 높은 영화",
      description: "평단의 찬사를 받고 있는 명작입니다.",
      component: <TopRatedMovieSlide />,
    },
    {
      id: "Popular",
      title: "박스오피스 순위",
      description: "실시간으로 인기있는 작품입니다.",
      component: <PopularMovieSlide />,
    },
    {
      id: "Upcoming",
      title: "개봉 예정작",
      description: "개봉이 임박한 영화 목록입니다.",
      component: <UpcomingMovieSlide />,
    },
    {
      id: "popularTV",
      title: "인기 TV 프로그램",
      description: "많은 사람들이 시청하는 TV 프로그램",
      component: <PopularTVSlide />,
    },
    {
      id: "onAirTV",
      title: "방영 중인 TV 프로그램",
      description: "지금 방영 중인 TV 시리즈",
      component: <OnAirTVSlide />,
    },
    {
      id: "topRatedTV",
      title: "평점 높은 TV 프로그램",
      description: "가장 높은 평점을 받은 TV 시리즈",
      component: <TopRatedTVSlide />,
    },
  ];
  return (
    <>
      <Banner></Banner>
      <section className="quick-links">
        <Container>
          <Row className="g-2">
            <Col xs={4} lg={2}>
              <div className="button">
                <img src="./images/icon-festival.png" alt="영화제 수상작 아이콘" />
                영화제 수상작
              </div>
            </Col>
            <Col xs={4} lg={2}>
              <div className="button">
                <img src="./images/icon-notice.png" alt="공지사항 아이콘" />
                공지사항
              </div>
            </Col>
            <Col xs={4} lg={2}>
              <div className="button">
                <img src="./images/icon-event.png" alt="이벤트 아이콘" />
                이벤트
              </div>
            </Col>
            <Col xs={4} lg={2}>
              <div className="button">
                <img src="./images/icon-review.png" alt="리뷰 아이콘" />
                리뷰
              </div>
            </Col>
            <Col xs={4} lg={2}>
              <div className="button">
                <img src="./images/icon-statistics.png" alt="평점 통계 아이콘" />
                평점 통계
              </div>
            </Col>
            <Col xs={4} lg={2}>
              <div className="button">
                <img src="./images/icon-recommend.png" alt="맞춤 추천 아이콘" />
                맞춤 추천
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {homeSections.map((section, index) => (
        <React.Fragment key={section.id}>
          <section className="home-section">
            <h2>{section.title}</h2>
            {section.description && <p>{section.description}</p>}
            {section.component}
          </section>

          {/* 최신 예고편 뒤 → 영화 배너 삽입 */}
          {index === 0 && (
            <section className="custom-banner movie-banner">
              <div className="overlay" />
              <div className="banner-text">
                <h2>🎬 지금 극장에서 화제작을 만나보세요!</h2>
                <button onClick={() => navigate("/movies")}>영화 더보기</button>
              </div>
            </section>
          )}

          {/* 상영 예정 영화 뒤 → TV 배너 삽입 */}
          {section.id === "Upcoming" && (
            <section className="custom-banner tv-banner">
              <div className="overlay" />
              <div className="banner-text">
                <h2>방영 중인 인기 TV 시리즈</h2>
                <button onClick={() => navigate("/tv")}>TV 전체보기</button>
              </div>
            </section>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default HomePage;
