import React, {useState} from "react";
import {useParams} from "react-router-dom";

/* Spinner */
import {BarLoader} from "react-spinners";

/* Hooks */
import {useMovieCredits} from "../../hook/useMovieCredits";
import {useMovieDetail} from "../../hook/useMovieDetail";
import {useMovieReviews} from "../../hook/useMovieReviews";
import {useMovieTrailer} from "../../hook/useMovieTrailer";

/* Components */
import RecommendationsMovies from "./RecommendationsMovies.jsx";
import SimilarMovies from "./SimilarMovies";
import UserReviews from "./UserReviews";

/* React Bootstrap */
import {Badge, Button, Col, Container, Modal, Row} from "react-bootstrap";

/* Bootstrap Icons */
import {BsClock, BsExclamationTriangle, BsGlobeAmericas, BsPlayCircle, BsShieldCheck, BsTranslate} from "react-icons/bs";
import {FaStar} from "react-icons/fa";

const MovieDetailPage = () => {
  const {id} = useParams();
  const {data, isLoading, isError, error} = useMovieDetail(id);
  const {data: reviewsData} = useMovieReviews(id);
  const {data: creditsData} = useMovieCredits(id);
  const {data: trailerData} = useMovieTrailer(id);
  const [currentPage, setCurrentPage] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (isLoading)
    return (
      <h2>
        <BarLoader className="loader" />
      </h2>
    );
  if (isError) return <h2>{error.message}</h2>;

  const movie = data?.data;
  const trailer = trailerData?.data?.results?.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");

  const backdropStyle = {
    backgroundImage: `url(https://media.themoviedb.org/t/p/w1280${movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    position: "relative",
  };

  /* 감독 */
  function isDirector(crew) {
    if (crew.job === "Director") {
      return true;
    }
  }
  const directors = creditsData?.data?.crew?.filter(isDirector);

  return (
    <>
      {/* 상단 */}
      <div className="movie-detail-back" style={backdropStyle}>
        <Container>
          <Row className="align-items-center">
            <Col sm={4}>
              <img src={`https://media.themoviedb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="img-fluid rounded shadow" />
            </Col>
            <Col sm={8} className="ml-5 movie-info-wrap">
              <h2 className="mb-2">
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
              <div className="mb-2">
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
              <div className="mb-2">
                <strong>장르:</strong> {movie.genres?.map((g) => g.name).join(", ")}
              </div>
              <div className="mb-2">
                <strong>
                  <BsClock className="me-2" />
                  러닝타임:
                </strong>{" "}
                {movie.runtime}분
              </div>
              <div className="mb-2">
                <strong>
                  <BsGlobeAmericas className="me-2" />
                  국가:
                </strong>{" "}
                {movie.production_countries?.map((c) => c.name).join(", ")}
              </div>
              <div className="mb-2">
                <strong>
                  <BsTranslate className="me-2" />
                  언어:
                </strong>{" "}
                {movie.original_language?.toUpperCase()}
              </div>
              <div className="mt-4">
                {trailer ? (
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
            </Col>
          </Row>
        </Container>

        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{movie.title} - 예고편</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {trailer ? (
              <div className="ratio ratio-16x9">
                <iframe src={`https://www.youtube.com/embed/${trailer.key}`} title="YouTube trailer" allowFullScreen></iframe>
              </div>
            ) : (
              <p>예고편을 불러올 수 없습니다.</p>
            )}
          </Modal.Body>
        </Modal>
      </div>
      <section className="movie-detail-page">
        {/* 출연배우 */}
        <section className="movie-detail-credit">
          <div className="title">
            <h3>출연/제작</h3>
            <p>{movie.title}의 제작진과 배우입니다.</p>
          </div>
          <Container>
            <Row>
              {directors &&
                directors.length > 0 &&
                (directors.length < 2
                  ? (() => {
                      const director = directors[0];
                      const directorProfilePath = director?.profile_path;
                      const hasProfile = directorProfilePath && !directorProfilePath.includes("null");
                      const profileUrl = hasProfile ? `http://image.tmdb.org/t/p/w185${directorProfilePath}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

                      return (
                        <Col key={director?.credit_id} md={3} xs={6}>
                          <img src={profileUrl} alt={`${director?.name} 프로필`} className="rounded" />
                          <div>
                            <h6>감독</h6>
                            <h5>{director?.name}</h5>
                          </div>
                        </Col>
                      );
                    })()
                  : directors.map((director) => {
                      const directorProfilePath = director.profile_path;
                      const hasProfile = directorProfilePath && !directorProfilePath.includes("null");
                      const profileUrl = hasProfile ? `http://image.tmdb.org/t/p/w185${directorProfilePath}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

                      return (
                        <Col key={director.credit_id} md={3} xs={6}>
                          <img src={profileUrl} alt={`${director.name} 프로필`} className="rounded" />
                          <div>
                            <h6>감독</h6>
                            <h5>{director.name}</h5>
                          </div>
                        </Col>
                      );
                    }))}

              {creditsData?.data?.cast?.slice(0, 12 - directors.length).map((cast) => {
                const castProfilePath = cast.profile_path;
                const hasProfile = castProfilePath && !castProfilePath.includes("null");
                const profileUrl = hasProfile ? `http://image.tmdb.org/t/p/w185${castProfilePath}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                return (
                  <Col key={cast.cast_id} md={3} xs={6} className="">
                    <img src={profileUrl} alt="" className="rounded" />
                    <div>
                      <h6>{cast.character}</h6>
                      <h5>{cast.name}</h5>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
        {/* 리뷰 */}
        <UserReviews reviewsData={reviewsData}></UserReviews>
        {/* 비슷한 영화 */}
        <section>
          <div className="title">
            <h3>비슷한 영화</h3>
            <p>{movie.title}을 좋아한다면 이 영화도!</p>
          </div>
          <SimilarMovies id={id} />
        </section>
        {/* 추천영화 */}
        <section>
          <div className="title">
            <h3>추천영화</h3>
            <p>{movie.title}에 높은 평가를 준 유저들이 추천합니다.</p>
          </div>
          <RecommendationsMovies id={id} />
        </section>
      </section>
    </>
  );
};

export default MovieDetailPage;
