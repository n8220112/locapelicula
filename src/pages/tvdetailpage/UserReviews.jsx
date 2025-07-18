import React from "react";
import {useState} from "react";
import {Card} from "react-bootstrap";
import Masonry from "react-masonry-css";

const UserReviews = ({reviewsData}) => {
  const [reviewShow, setReviewShow] = useState({}); //각 리뷰별 boolean 상태
  const toggleReview = (id) => {
    setReviewShow((prev) => ({
      ...prev,
      [id]: !prev[id], // 해당 리뷰만 토글
    }));
  };

  /* 리뷰 반응형 */
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <section className="movie-detail-review">
      <div className="title">
        <h3>리뷰 {reviewsData?.data?.results?.length}</h3>
        <p>다른 유저들과 리뷰를 나누세요.</p>
      </div>
      {reviewsData?.data?.results?.length > 0 && (
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
          {reviewsData.data.results.map((review) => {
            const avatarPath = review.author_details?.avatar_path;
            const hasAvatar = avatarPath && !avatarPath.includes("null");
            const avatarUrl = hasAvatar ? `https://media.themoviedb.org/t/p/w45_and_h45_face${avatarPath}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            const isExpanded = reviewShow[review.id] ?? false; // 기본값 false
            return (
              <div key={review.id} md={3} xs={12} className="review-card mb-3">
                <Card className="">
                  <div className="author">
                    <div className="avatar">
                      <img src={avatarUrl} alt={review.author} className="img-fluid rounded-circle" />
                    </div>
                    <h6>{review.author}</h6>
                  </div>
                  <p>
                    {review.content.length < 200 ? review.content : isExpanded ? review.content : review.content.slice(0, 200) + "…"}
                    {review.content.length >= 200 && (
                      <button onClick={() => toggleReview(review.id)} className="btn btn-link p-0 ms-2">
                        {isExpanded ? "접기" : "더보기"}
                      </button>
                    )}
                  </p>
                  <div className="date">
                    <span>작성 {review.created_at.slice(0, 10)}</span>
                    {review.created_at.slice(0, 10) !== review.updated_at.slice(0, 10) ? <span>수정 {review.updated_at.slice(0, 10)}</span> : ""}
                  </div>
                </Card>
              </div>
            );
          })}
        </Masonry>
      )}
    </section>
  );
};

export default UserReviews;
