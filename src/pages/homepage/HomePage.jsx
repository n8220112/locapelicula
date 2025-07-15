import React from "react";
import Banner from "./banners/Banner";
import PopularMovieSlide from "./popularmovieslide/PopularMovieSlide";
import NowPlayingMovieSlide from "./nowplayingmovieslide/NowPlayingMovieSlide";
import TopRatedMovieSlide from "./topratedmovieslide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./upcomingmovieslide/UpcomingMovieSlide";
const HomePage = () => {
  //배너(인기영화중에 0번째 배경이미지), 인기영화, 평점높은, 상영예정
  const movieSections = [
    {
      id: "NowPlaying",
      title: "현재 상영작",
      description: "극장에서 바로 만나보실 수 있는 영화입니다.",
      component: <NowPlayingMovieSlide/>,
    },
    {
      id: "TopRated",
      title: "평점 높은 영화",
      description: "평단의 찬사를 받고 있는 명작입니다.",
      component: <TopRatedMovieSlide/>,
    },
    {
      id: "Popular",
      title: "박스오피스 순위",
      description: "실시간으로 인기있는 작품입니다.",
      component: <PopularMovieSlide/>,
    },
    {
      id: "Upcoming",
      title: "개봉 예정작",
      description: "개봉이 임박한 영화 목록입니다.",
      component: <UpcomingMovieSlide/> ,
    },
  ];
  return (
    <>
      <Banner></Banner>
      {movieSections.map(section=>(
        <section key={section.id} className="movie-section">
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.component}
        </section>
      ))}
    </>
  );
};

export default HomePage;
