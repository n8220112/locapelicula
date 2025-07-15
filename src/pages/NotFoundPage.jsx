import React from "react";
import {Link} from "react-router-dom";
import {FaRegFaceGrinBeamSweat} from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <main>
      <section className="not-found-page">
        <FaRegFaceGrinBeamSweat className="emoji" />
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <p>페이지를 찾을 수 없습니다.</p>
        <div className="button-wrap">
          <Link to="/">이전 페이지</Link>
          <Link to="/">MOVIE 306 홈</Link>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
