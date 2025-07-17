import React, {useState} from "react";
import {usePopularMoviesQuery} from "../../../hook/usePopularMovies";
import {useMovieTrailer} from "../../../hook/useMovieTrailer";
import {useGenreListQuery} from "../../../hook/useGenreList";
import {useNavigate} from "react-router-dom";
/* react-bootstrap */
import {Badge, Button, Modal} from "react-bootstrap";
/* bs-icons */
import {BsShieldCheck, BsExclamationTriangle, BsPlayCircle} from "react-icons/bs";
import {FaStar} from "react-icons/fa";
import LoadingBar from "../../LoadingBar";

const Banner = () => {
  const navigate = useNavigate();
  /* 모달열고 닫기 */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //인기영화 정보 data로 가져오기
  const {data, isLoading, isError, error} = usePopularMoviesQuery();
  const movie = data?.data?.results?.[0];

  //장르 id에서 이름으로 변경
  const {data: genreData} = useGenreListQuery();
  const genreList = genreData?.data?.genres || [];
  const genreNames = genreList.filter((g) => movie.genre_ids?.includes(g.id)).map((g) => g.name);
  //console.log("장르명", genreNames);

  //아이디값 들고오기
  const movieId = movie?.id;
  // 영화의 예고편 데이터 가져오기
  const trailerQuery = useMovieTrailer(movieId, {
    enabled: !!movieId,
  });
  // console.log('트레일러내용', trailerQuery.data);
  if (isLoading) {
    return <LoadingBar />;
  }
  if (isError) {
    return <h1 className="error-message">{error.message}</h1>;
  }
  const trailerKey = trailerQuery.data?.data?.results.find((video) => video.type === "Trailer" && video.official === true);

  //console.log(movie);

  return (
    <div className="banner" style={{position: "relative", backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`}}>
      <div className="textbox movie-info-wrap">
        <h2 onClick={() => navigate(`/movie/${movie.id}`)} style={{cursor: "pointer"}}>
          {movie.title} {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
        </h2>
        <p>
          {movie.release_date === "" ? <>미개봉</> : <>개봉일: {movie.release_date}</>}
          {movie.adult ? (
            <span>
              <BsExclamationTriangle className="me-2" />
              성인 관람가
            </span>
          ) : (
            <span>
              <BsShieldCheck className="me-2" />
              전체 관람가
            </span>
          )}
        </p>
        <p>{movie.overview}</p>
        <div>
          <strong>평점:</strong>
          <Badge bg={movie.vote_average >= 7 ? "success" : "warning"} className="ms-2">
            {movie.vote_average.toFixed(1)}
          </Badge>
          <div className="stars">
            <div className="none">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="color" style={{width: `${movie.vote_average * 10}%`}}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>
        <div>
          <strong>장르:</strong> {genreNames?.join("/")}
        </div>
        <div>
          {trailerKey ? (
            <Button variant="danger" onClick={handleShow}>
              <BsPlayCircle className="me-2" />
              예고편 보기
            </Button>
          ) : (
            <p>
              <BsPlayCircle className="me-2" />
              예고편이 제공되지 않습니다.
            </p>
          )}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} - 예고편</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailerKey ? (
            <div className="ratio ratio-16x9">
              <iframe src={`https://www.youtube.com/embed/${trailerKey.key}`} title="YouTube trailer" allowFullScreen></iframe>
            </div>
          ) : (
            <p>예고편을 불러올 수 없습니다.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Banner;
