import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {useMovieSimilar} from "../../hook/useMovieSimilar";
import MovieCard from "../homepage/moviecard/MovieCard";
import LoadingBar from "../LoadingBar";

const SimilarMovies = ({id}) => {
  const {data, isLoading, isError, error} = useMovieSimilar(id);
    if (isLoading) {
    return <LoadingBar />;
  }
  if (isError) {
    return <h1 className="error-message">{error.message}</h1>;
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
    <>
      {data.data.results.length === 0 ? (
        ""
      ) : (
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
      )}
    </>
  );
};

export default SimilarMovies;
