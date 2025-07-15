import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FaInstagram, FaFacebook, FaSnapchatGhost, FaPencilAlt } from "react-icons/fa";

const MyPage = () => {
  return (
    <section className="my-page">
      <Container>
        <Row>
          <Col md={6}>
            <h2>My Page</h2>
            <p>안녕하세요 Abril님! 오늘의 추천 영화가 준비되어 있습니다.</p>
          </Col>
        </Row>
        <Row className="gap-5">
          <Col md={4} className="profile-wrap text-center border rounded bg-dark p-5">
            <div className="name">
              <h3>Abril Lee<FaPencilAlt /></h3>
              <p>
                <em>@abrilprimaveralee</em>
              </p>
            </div>
            <img src="https://img.seoul.co.kr/img/upload/2024/12/10/SSC_20241210031016_O2.jpg.webp" alt="" className=" rounded-circle" />
            <div className="follow">
              <span>팔로워 100</span>
              <span>팔로잉 100</span>
            </div>
            <div className="sns">
              <span>SNS</span>
              <FaInstagram />
              <FaFacebook />
              <FaSnapchatGhost />
            </div>
          </Col>
          <Col md={7} className="profile-wrap border rounded bg-dark p-5">
            <h3>Profile<FaPencilAlt /></h3>
            <section className="profile-grid">
              <div>
                <h6>이름</h6>
                <span>이봄 LEE BOM</span>
              </div>
              <div>
                <h6>평가수</h6>
                <span>영화 896 / 시리즈 141</span>
              </div>
              <div>
                <h6>이메일 주소</h6>
                <span>bxrntxdxx@naver.com</span>
              </div>
              <div>
                <h6>별점 분포</h6>
                <span>평균 3.4 / 개수 896</span>
              </div>
              <div>
                <h6>핸드폰 번호</h6>
                <span>010-3913-9158</span>
              </div>
              <div>
                <h6>선호태그</h6>
                <span>#연기력 #영상미 #OST</span>
              </div>
              <div>
                <h6>계정 공개 범위</h6>
                <span>전체공개</span>
                <i>MOVIE306의 모든 유저에게 평가가 공개됩니다.</i>
              </div>
              <div>
                <h6>선호장르</h6>
                <span>드라마 · 애니메이션 · 코미디</span>
              </div>
              <div>
                <h6>영화인 계정 등록</h6>
                <span>미등록</span>
                <i>영화 업계 종사자이신가요? →</i>
              </div>
              <div>
                <h6>감상 시간</h6>
                <span>1020시간</span>
                <i>순수 영화 본 시간 1000시간 돌파!</i>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MyPage;
