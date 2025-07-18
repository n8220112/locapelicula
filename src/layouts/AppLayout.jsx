import React from "react";
import {useState, useEffect} from "react";
import {Outlet, Link, useNavigate} from "react-router-dom";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import {BsSun, BsMoon} from "react-icons/bs";
import Footer from "./Footer";

const AppLayout = () => {
  /* 검색 위한 키워드값을 받아오는 역할 */
  // value값을 받아와 url로 넘겨줌
  const [keyword, setKeyword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  // 첫 로드시 다크모드 적용
  useEffect(() => {
    document.body.classList.add("dark-theme");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); //기본 이벤트 제거 (새로고침)
    if (keyword.trim() !== "") {
      navigate(`/movies?keyword=${keyword}`);
      setKeyword(""); //검색 완료 후 빈 문자열로 초기화
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.remove("dark-theme", "light-theme");
    document.body.classList.add(!isDarkMode ? "dark-theme" : "light-theme");
  };

  return (
    <>
      {/*  네비게이션 */}
      <Navbar expand="lg" variant={isDarkMode ? "dark" : "light"} bg={isDarkMode ? "dark" : "light"}>
        <Container className="nav-header">
          {/* 로고 */}
          <Navbar.Brand as={Link} to="/">
            Loca Pelicula
          </Navbar.Brand>

          {/* 다크모드 토글 */}
          <div className={`theme-toggle ${isDarkMode ? "dark" : "light"} nav-theme-toggle`} onClick={toggleTheme}>
            <BsSun className={`icon sun ${!isDarkMode ? "active" : ""}`} />
            <BsMoon className={`icon moon ${isDarkMode ? "active" : ""}`} />
            <div className="toggle-thumb"></div>
          </div>

          {/* 햄버거 메뉴 */}
          <Navbar.Toggle aria-controls="navbarScroll" id="navbar-toggler" />

          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/tv">
                TV Shows
              </Nav.Link>
              <Nav.Link as={Link} to="/mypage">
                My Page
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>

            {/* 검색폼 */}
            <Form className="d-flex me-3" onSubmit={handleSubmit}>
              <Form.Control type="search" placeholder="영화/TV 검색" className="me-2" aria-label="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              <Button type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 메인 컨텐츠 출력 */}
      <main>
        <Outlet></Outlet>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AppLayout;
