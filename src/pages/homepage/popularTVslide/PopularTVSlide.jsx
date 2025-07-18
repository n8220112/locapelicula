import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container } from "react-bootstrap";
import { usePopularTVQuery } from "../../../hook/usePopularTVQuery"; 
import TvCard from "../TVcard/TvCard";

const PopularTVSlide = () => {
  const { data, isLoading, isError, error } = usePopularTVQuery();

  if (isLoading) return <h2>로딩중...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
      <Carousel
        className="movie-slide"
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        draggable
        swipeable
      >
        {data.data.results.map((tv, index) => (
          <TvCard tv={tv} key={index} index={index} />
        ))}
      </Carousel>
  );
};

export default PopularTVSlide;
