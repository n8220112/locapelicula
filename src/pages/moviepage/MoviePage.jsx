import React from "react";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {usePopularMoviesQuery} from "../../hook/usePopularMovies";
import {useSearchMovieQuery} from "../../hook/useSearchMovieQuery";
import MovieCard from "../homepage/moviecard/MovieCard";
import {Container, Row, Col} from "react-bootstrap";

const MoviePage = () => {
  // 1. 인기영화 데이터 가져오기
  const {data: popularData, isLoading, isError, error} = usePopularMoviesQuery();
  // 2. url에서 파라미터값(=키워드) 가져오기
  const [query] = useSearchParams();
  const keyword = query.get("keyword");
  //3. 검색 키워드가 있으면 검색 api 실행
  const {data: searchData} = useSearchMovieQuery();
  //4. 컴포넌트 렌더링되면 인기영화 보여주기
  useEffect(() => {
    if (popularData) {
      console.log("무비페이지에서 인기영화 확인", popularData);
    }
  });
  //5. 경고창에 띄워주기
  useEffect(() => {
    if (keyword) {
      console.log("검색API 결과", searchData);
    }
  });
  return (
    <section className="movie-page">
      <h2>인기영화</h2>
      <Container>
        <Row>
          {popularData.data.results.map((movie, index) => (
            <Col md={2}  key={index}>
              <MovieCard movie={movie}></MovieCard>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MoviePage;
