import React from "react";
import {useGenreListQuery} from "../../../hook/useGenreList";
import {useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";
import {FaStar} from "react-icons/fa";

const MovieCard = ({movie, index}) => {
  const navigate = useNavigate();
  //console.log(movie, 'movie')
  const imageUrl = `https://media.themoviedb.org/t/p/w342${movie.poster_path}`;
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
          cursor: "pointer",
        }}
        onClick={() => navigate(`/movies/${movie.id}`)}
      >
        <span className="numbering">{index + 1}</span>
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
      <div className="card-title">
        <h5
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          {movie.title}
        </h5>
        <p style={{color: movie.vote_average > 0 ? "#ffc952" : "#fafafa"}}>
          평점 {movie.vote_average.toFixed(1)} <FaStar />
        </p>
      </div>
    </>
  );
};

export default MovieCard;
