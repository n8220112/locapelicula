import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {useTopRatedMoviesQuery} from "../../../hook/useTopRatedMovies";
import MovieCard from "../moviecard/MovieCard";


const TopRatedMovieSlide = () => {
  const {data, isLoading, isError, error} = useTopRatedMoviesQuery();
  if (isLoading) {
    return <h1>로딩중</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {max: 4000, min: 3000},
      items: 6,
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 5,
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 4,
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 4,
    },
  };
  return (
    <Carousel
      className="movie-slide"
      responsive={responsive}
      infinite={true} //무한반복슬라이드
      autoPlay={true}
      autoPlaySpeed={5000}
      //showDots={true}
      draggable={true}
      swipeable={true}
    >
      {data.data.results.map((movie, index) => (
        <MovieCard movie={movie} key={index}></MovieCard>
      ))}
    </Carousel>
  );
};

export default TopRatedMovieSlide