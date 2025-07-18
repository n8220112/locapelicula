import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTVSimilarQuery} from "../../hook/useTVSimilarQuery";

import {Container, Row, Col, Pagination} from "react-bootstrap";

import LoadingBar from "../LoadingBar";

const SimilarMovies = ({id}) => {
  const navigate = useNavigate();

  const {data, isLoading, isError, error} = useTVSimilarQuery(id);

  const [simPage, setSimPage] = useState(1);
  const itemsPerPage = 4;

  if (isLoading) {
    return <LoadingBar />;
  }
  if (isError) {
    return <h1 className="error-message">{error.message}</h1>;
  }

  // 비슷한 TV 페이지네이션
  const simTV = data?.data?.results || [];
  const simTotalPages = Math.ceil(simTV.length / itemsPerPage);
  const simStart = (simPage - 1) * itemsPerPage;
  const pagedSimTV = simTV.slice(simStart, simStart + itemsPerPage);

  return (
    <>
      {simTV.length > 0 && (
        <Container className="movie-similar">
          <Row>
            {pagedSimTV.map((sim) => (
              <Col key={sim.id} xs={12} md={6} className="mb-4">
                <div
                  className="movie-bg-card"
                  style={{
                    backgroundImage: `url(https://media.themoviedb.org/t/p/w780${sim.backdrop_path})`,
                  }}
                  onClick={() => navigate(`/tv/${sim.id}`)}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
                      color: "#fff",
                      padding: "15px",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <div>
                      <h5 style={{marginBottom: "5px"}}>{sim.name}</h5>
                      <small>⭐ {sim.vote_average.toFixed(1)}</small>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {simTotalPages > 1 && (
            <Pagination className="justify-content-center mt-3">
              {[...Array(simTotalPages)].map((_, idx) => (
                <Pagination.Item key={idx + 1} active={idx + 1 === simPage} onClick={() => setSimPage(idx + 1)}>
                  {idx + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Container>
      )}
    </>
  );
};

export default SimilarMovies;
