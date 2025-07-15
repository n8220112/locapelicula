import React from "react";
import {useState} from "react";
import {Outlet, Link, useNavigate} from "react-router-dom";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";

const AppLayout = () => {
  /* 검색 위한 키워드값을 받아오는 역할 */
  // value값을 받아와 url로 넘겨줌
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); //기본 이벤트 제거 (새로고침)
    if (keyword.trim() !== "") {
      navigate(`/movies?keyword=${keyword}`);
      setKeyword(""); //검색 완료 후 빈 문자열로 초기화
    }
  };
  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="/">Movie 306</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" id="navbar-toggler" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/mypage">
                My Page
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control type="search" placeholder="영화를 검색하세요" className="me-2" aria-label="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
              <Button type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Container fluid className="text-center py-5 bg-dark">
          © 2025, MOVIE306. All rights reserved.
        </Container>
      </footer>
    </>
  );
};

export default AppLayout;
