import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {useNowPlayingMoviesQuery} from "../../../hook/useNowPlayingMovies.jsx";
import TrailerCard from "../trailercard/TrailerCard.jsx";
import LoadingBar from "../../LoadingBar.jsx";

const TrailerSlide = () => {
  const {data, isLoading, isError, error} = useNowPlayingMoviesQuery();
  if (isLoading) {
    return <LoadingBar />;
  }
  if (isError) {
    return <h1 className="error-message">{error.message}</h1>;
  }
  //console.log(data)

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {max: 4000, min: 3000},
      items: 4,
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 3,
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2,
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1,
    },
  };
  return (
    <Carousel
      className="movie-slide trailer-slide"
      responsive={responsive}
      infinite={true} //무한반복슬라이드
      autoPlay={true}
      autoPlaySpeed={5000}
      //showDots={true}
      draggable={true}
      swipeable={true}
    >
      {data.data.results.map((movie, index) => (
        <TrailerCard movie={movie} key={index}></TrailerCard>
      ))}
    </Carousel>
  );
};

export default TrailerSlide;
