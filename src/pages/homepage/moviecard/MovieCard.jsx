import React from "react";
import {useGenreListQuery} from "../../../hook/useGenreList";
import {useNavigate} from "react-router-dom";
import {Card, Container} from "react-bootstrap";

const MovieCard = ({movie}) => {
  const navigate = useNavigate();
  // console.log(movie, 'movie')
  const imageUrl = `https://media.themoviedb.org/t/p/w500${movie.poster_path}`;
  const rating = movie.adult ? "청불" : "전체";
  const {data} = useGenreListQuery();
  const genreList = data?.data?.genres || [];
  const genreNames = genreList.filter((g) => movie.genre_ids?.includes(g.id)).map((g) => g.name);

  return (
    <>
      <Card
        className="movie-card"
        style={{
          backgroundImage: `url(${imageUrl})`,
          height: "500px",
        }}
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <div className="overlay">
          <div className="info">
            <h5>
              {movie.title} <span style={{backgroundColor: movie.adult ? "#ff7473" : "#47b8e0"}}>{rating}</span>
            </h5>
            <h5>평점 {movie.vote_average.toFixed(1)}</h5>
            <h5>{genreNames?.join("/")}</h5>
            <p>{movie.overview}</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MovieCard;
