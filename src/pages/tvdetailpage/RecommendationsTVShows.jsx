import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTVRecommendationsQuery} from "../../hook/useTVRecommendationsQuery";

import {Container, Row, Col, Pagination} from "react-bootstrap";
import {FaStar} from "react-icons/fa";

import LoadingBar from "../LoadingBar";

const RecommendationsMovies = ({id}) => {
  const navigate = useNavigate();

  const {data, isLoading, isError, error} = useTVRecommendationsQuery(id);

  const [recPage, setRecPage] = useState(1);
  const itemsPerPage = 4;

  if (isLoading) {
    return <LoadingBar />;
  }
  if (isError) {
    return <h1 className="error-message">{error.message}</h1>;
  }

  // 추천 TV 페이지네이션
  const recTV = data?.data?.results || [];
  const recTotalPages = Math.ceil(recTV.length / itemsPerPage);
  const recStart = (recPage - 1) * itemsPerPage;
  const pagedRecTV = recTV.slice(recStart, recStart + itemsPerPage);

  return (
    <>
      <Container className="movie-recommend">
        <Row>
          {pagedRecTV.map((rec) => (
            <Col key={rec.id} xs={12} md={6} className="mb-4">
              <div
                className="movie-bg-card"
                style={{
                  backgroundImage: `url(https://media.themoviedb.org/t/p/w780${rec.backdrop_path})`,
                }}
                onClick={() => navigate(`/tv/${rec.id}`)}
              >
                <div>
                  <div className="title">
                    <h5>{rec.name}</h5>
                    <small className={rec.vote_average > 0 ? "vote-on" : "vote-off"}>
                      <FaStar /> {rec.vote_average.toFixed(1)}
                    </small>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {recTotalPages > 1 && (
          <Pagination className="justify-content-center mt-3">
            {[...Array(recTotalPages)].map((_, idx) => (
              <Pagination.Item key={idx + 1} active={idx + 1 === recPage} onClick={() => setRecPage(idx + 1)}>
                {idx + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </Container>
    </>
  );
};

export default RecommendationsMovies;
