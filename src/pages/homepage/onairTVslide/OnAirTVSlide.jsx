import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container } from "react-bootstrap";
import { useOnTheAirTVQuery } from "../../../hook/useOnTheAirTVQuery";
import TVCard from "../TVcard/TvCard";

const OnAirTVSlide = () => {
  const { data, isLoading, isError, error } = useOnTheAirTVQuery();

  if (isLoading) return <h2>로딩중...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  const responsive = {
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
        {data.data.results.map((tv,index) => (
          <TVCard tv={tv} key={tv.id} index={index} />
        ))}
      </Carousel>
  );
};

export default OnAirTVSlide;
