import React from "react";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {usePopularMoviesQuery} from "../../hook/usePopularMovies";
import {useSearchMovieQuery} from "../../hook/useSearchMovieQuery";
import MovieCard from "../homepage/moviecard/MovieCard";
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import LoadingBar from "../LoadingBar";

const MoviePage = () => {
  // 1. 인기영화 데이터 가져오기
  const {data: popularData, isLoading, isError, error} = usePopularMoviesQuery();
  // 2. url에서 파라미터값(=키워드) 가져오기
  const [query] = useSearchParams();
  let keyword = query.get("keyword");
  // 3. 검색 키워드가 있으면 검색 api 실행
  const {data: searchData} = useSearchMovieQuery(keyword);
  //4. 컴포넌트 렌더링되면 인기영화 보여주기
  /* useEffect(() => {
    if (popularData) {
      console.log("무비페이지에서 인기영화 확인", popularData);
    }
  }); */
  //5. 경고창에 띄워주기
  /* useEffect(() => {
    if (keyword && searchData) {
      console.log("검색API 결과", keyword, searchData);
    }
  }, [keyword, searchData]); */

  /* 정렬 */
  //옵션 상태
  const [sortOption, setSortOption] = useState("defaultSort");
  //정렬 함수
  const applySorting = (data) => {
    if (!data) return [];

    const sorted = [...data];
    switch (sortOption) {
      case "vote":
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      case "popularity":
        return sorted.sort((a, b) => b.popularity - a.popularity);
      case "name":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "nameReverse":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return data;
    }
  };
  //데이터 정렬
  const displayedData = keyword ? applySorting(searchData?.data?.results) : applySorting(popularData?.data?.results);

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
  return (
    <section className="movie-page">
      <div className="title">
        <h2>{keyword ? `검색 결과: ${keyword}` : "인기 영화"}</h2>
        <div className="sortfilters mb-3 d-inline">
          <Dropdown data-bs-theme="dark" onSelect={(key) => setSortOption(key)}>
            <Dropdown.Toggle variant="secondary" id="sort-dropdown">
              {(() => {
                switch (sortOption) {
                  case "vote":
                    return "평가 좋은 순";
                  case "popularity":
                    return "인기 많은 순";
                  case "name":
                    return "이름순";
                  case "nameReverse":
                    return "이름 역순";
                  default:
                    return "기본순";
                }
              })()}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" title="기본순">
              <Dropdown.Item eventKey="defaultSort">기본순</Dropdown.Item>
              <Dropdown.Item eventKey="vote">평가 좋은 순</Dropdown.Item>
              <Dropdown.Item eventKey="popularity">인기 많은 순</Dropdown.Item>
              <Dropdown.Item eventKey="name">이름순</Dropdown.Item>
              <Dropdown.Item eventKey="nameReverse">이름 역순</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Container>
        <Row>
          {displayedData.map((movie, index) => (
            <Col md={2} key={index}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MoviePage;
