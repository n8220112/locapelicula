import React, {useState} from "react";
import {useParams} from "react-router-dom";

/* Hooks */
import {useTVDetailQuery} from "../../hook/useTVDetailQuery";
import {useTVCreditsQuery} from "../../hook/useTVCreditsQuery";
import {useTVReviewsQuery} from "../../hook/useTVReviewsQuery";
import {useTVTrailerQuery} from "../../hook/useTVTrailerQuery";

/* Components */
import UserReviews from "./UserReviews";
import RecommendationsTVShows from "./RecommendationsTVShows";
import SimilarTVShows from "./SimilarTVShows";
import LoadingBar from "../LoadingBar";

/* UI */
import {Container, Row, Col, Badge, Button, Modal} from "react-bootstrap";
import {BsClock, BsExclamationTriangle, BsGlobeAmericas, BsPlayCircle, BsShieldCheck, BsTranslate} from "react-icons/bs";
import {FaStar} from "react-icons/fa";

const TVDetailPage = () => {
  const {id} = useParams();

  const {data, isLoading, isError, error} = useTVDetailQuery(id);
  const {data: creditsData} = useTVCreditsQuery(id);
  const {data: reviewsData} = useTVReviewsQuery(id);
  const {data: trailerData} = useTVTrailerQuery(id);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (isLoading) {
    return (
      <div className="movie-detail-loading">
        <LoadingBar />
      </div>
    );
  }
  if (isError) {
    return <h1 className="error-message">{error.message}</h1>;
  }

  console.log(data);

  const tv = data?.data;

  const trailer = trailerData?.data?.results?.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");

  const backdropStyle = {
    backgroundImage: `url(https://media.themoviedb.org/t/p/w1280${tv.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  /* 감독 */
  function isDirector(crew) {
    if (crew.job === "Director") {
      return true;
    }
  }
  const directors = creditsData?.data?.crew?.filter(isDirector);

  /* 조사 구분 - 유니코드 사용 */
  function checkLasrChar(title) {
    const charCode = title.charCodeAt(title.length - 1);
    const consonantCode = (charCode - 44032) % 28;
    if (consonantCode === 0) {
      return `${title}를`;
    }
    return `${title}을`;
  }

  return (
    <>
      {/* 상단 상세 정보 */}
      <div className="movie-detail-back" style={backdropStyle}>
        <Container>
          <Row className="align-items-center">
            <Col sm={4}>
              <img src={`https://media.themoviedb.org/t/p/w500${tv.poster_path}`} alt={tv.name} className="img-fluid rounded shadow" />
            </Col>
            <Col sm={8} className="ml-5 movie-info-wrap">
            
              <h2 className="mb-2">
                {tv.name} {tv.first_air_date ? `(${tv.first_air_date.slice(0, 4)})` : ""}
              </h2>

              <p>
                {tv.release_date === "" ? <>미방영</> : <>방영 시작일: {tv.release_date}</>}
                {tv.adult ? (
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

              <p>{tv.overview}</p>

              <div className="mb-2" style={{display: "flex", alignItems: "center"}}>
                <strong>평점:</strong>
                <Badge bg={tv.vote_average >= 7 ? "success" : "warning"} className="ms-2">
                  {tv.vote_average.toFixed(1)}
                </Badge>
                <div className="stars">
                  <div className="none">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <div className="color" style={{width: `${tv.vote_average * 10}%`}}>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <strong>장르:</strong> {tv.genres?.map((g) => g.name).join(", ")}
              </div>

              {/* 한 에피소드 평균 러닝타임 */}
              <div className="mb-2">
                <strong>
                  <BsClock className="me-2" /> 평균 러닝타임:
                </strong>{" "}
                {tv.episode_run_time?.[0] || "정보 없음"}분
              </div>

              <div className="mb-2">
                <strong>
                  <BsGlobeAmericas className="me-2" /> 제작 국가:
                </strong>{" "}
                {tv.production_countries?.map((c) => c.name).join(", ")}
              </div>

              {/* 언어 */}
              <div className="mb-2">
                <strong>
                  <BsTranslate className="me-2" /> 언어:
                </strong>{" "}
                {tv.original_language?.toUpperCase()}
              </div>

              {/* 예고편 버튼 */}
              <div className="mt-4">
                {trailer ? (
                  <Button variant="danger" onClick={handleShow}>
                    <BsPlayCircle className="me-2" />
                    예고편 보기
                  </Button>
                ) : (
                  <p>
                    <BsPlayCircle className="me-2" /> 예고편이 제공되지 않습니다.
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>

        {/* 예고편 모달 */}
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{tv.name} - 예고편</Modal.Title>
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
        {/* 제작진 */}
        <section className="movie-detail-credit">
          <div className="title">
            <h3>출연/제작</h3>
            <p>{tv.name}의 제작진과 배우입니다.</p>
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
                        <Col key={director?.credit_id} xl={3} md={4} xs={6}>
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
                        <Col key={director.credit_id} xl={3} md={4} xs={6}>
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
                  <Col key={cast.cast_id} xl={3} md={4} xs={6}>
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

        {/* 추천 TV */}
        <section>
          <div className="title">
            <h3>비슷한 시리즈</h3>
            <p>{checkLasrChar(tv.name)} 좋아한다면 이 프로그램도!</p>
          </div>
          <SimilarTVShows id={id} />
        </section>

        {/* 비슷한 TV */}
        <section>
          <div className="title">
            <h3>추천시리즈</h3>
            <p>{tv.name}에 높은 평가를 준 유저들이 추천합니다.</p>
          </div>
          <RecommendationsTVShows id={id} />
        </section>
      </section>
    </>
  );
};

export default TVDetailPage;
