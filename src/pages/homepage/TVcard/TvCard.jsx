import React from "react";
import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useGenreListQuery} from "../../../hook/useGenreList";
import {FaStar} from "react-icons/fa";

const TvCard = ({tv, index}) => {
  const navigate = useNavigate(); // 초기화

  const imageUrl = tv.poster_path ? `https://image.tmdb.org/t/p/w342${tv.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image";
  const rating = tv.adult ? "청불" : "전체";
  const {data} = useGenreListQuery();
  const genreList = data?.data?.genres || [];
  const genreNames = genreList.filter((g) => tv.genre_ids?.includes(g.id)).map((g) => g.name);
  console.log(tv);
  return (
    <>
      <Card
        className="movie-card"
        style={{
          backgroundImage: `url(${imageUrl})`,
          cursor: "pointer",
        }}
        onClick={() => navigate(`/tv/${tv.id}`)}
      >
        <span className="numbering">{index + 1}</span>
        <div className="overlay">
          <div className="info">
            <h5>
              {tv.name} <span style={{backgroundColor: tv.adult ? "#ff7473" : "#47b8e0"}}>{rating}</span>
            </h5>
            {tv.vote_average ? <span>평점 {tv.vote_average.toFixed(1)}</span> : ""}
            {tv.genre_ids.length > 0 ? <span>{genreNames?.join("/")}</span> : ""}
            <p>{tv.overview}</p>
          </div>
        </div>
      </Card>
      <div className="card-title">
        <h5
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate(`/tv/${tv.id}`)}
        >
          {tv.name}
        </h5>
        <p style={{color: tv.vote_average > 0 ? "#ffc952" : "#fafafa"}}>
          평점 {tv.vote_average.toFixed(1)} <FaStar />
        </p>
      </div>
    </>
  );
};

export default TvCard;
