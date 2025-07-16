import React from "react";
import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useMovieTrailer} from "../../../hook/useMovieTrailer";
import {PiPlayCircle} from "react-icons/pi";

const TrailerCard = ({movie}) => {
  /* 모달열고 닫기 */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const imageUrl = `https://media.themoviedb.org/t/p/w780${movie.backdrop_path}`;
  //아이디값 들고오기
  const movieId = movie?.id;
  // 영화의 예고편 데이터 가져오기
  const trailerQuery = useMovieTrailer(movieId, {
    enabled: !!movieId,
  });
  //console.log("트레일러내용", trailerQuery.data);
  const trailerKey = trailerQuery.data?.data?.results.find((video) => video.type === "Trailer" && video.official === true);
  return (
    <>
      <div className="trailer-card">
        <div className="thumb" style={{backgroundImage: `url(${imageUrl})`}}>
          <button onClick={handleShow}>
            <PiPlayCircle />
          </button>
        </div>
        <h5>{movie.title}</h5>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} - 예고편</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailerKey ? (
            <div className="ratio ratio-16x9">
              <iframe src={`https://www.youtube.com/embed/${trailerKey.key}`} title="YouTube trailer" allowFullScreen></iframe>
            </div>
          ) : (
            <p>예고편을 불러올 수 없습니다.</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TrailerCard;
