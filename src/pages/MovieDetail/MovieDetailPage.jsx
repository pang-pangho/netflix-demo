import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDetailMovie } from "../../hooks/useDetailMovie";
import { Badge, Col, Container, Row } from "react-bootstrap";
import "./MovieDetail.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReview } from "../../hooks/useReview";
import MovieReview from "../../common/MovieReview/MovieReview";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useRecommendations } from "../../hooks/useRecommendations";
import MovieRecommend from "../../common/MovieRecommend/MovieRecommend";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useMovieTrailer } from "../../hooks/useMovieTrailer";

const MovieDetailPage = () => {
  const { id: movie_id } = useParams();
  const { data, isLoading, isError, error } = useDetailMovie({ movie_id });
  const { data: reviewData } = useReview({ movie_id });
  const { data: RecommendationData } = useRecommendations({ movie_id });
  const { data: genreData } = useMovieGenreQuery();
  const { data: trailerData } = useMovieTrailer({ movie_id });

  const [price, setPrice] = useState("0");
  const [revenue, setRevenue] = useState("0");
  const [isShowReviews, setIsShowReviews] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  // 트레일러 비디오 필터링
  const trailer = trailerData?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const swtichShowReviews = () => {
    setIsShowReviews((prev) => !prev);
  };

  const formatCurrency = (amount) => {
    let formattedAmount = String(amount).replace(/,/g, "");
    return isNaN(formattedAmount)
      ? "0"
      : Number(formattedAmount).toLocaleString("en-US");
  };

  useEffect(() => {
    if (data?.budget) {
      setPrice(formatCurrency(data.budget));
    }
    if (data?.revenue) {
      setRevenue(formatCurrency(data.revenue));
    }
  }, [data?.budget, data?.revenue]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const showGenre = (genres) => {
    if (!genres) return [];
    return genres.map((genre) => genre.name);
  };

  return (
    <Container>
      {/* 영화 상세 정보 */}
      <Row>
        <Col lg={5} xs={12}>
          <Row>
            <div
              style={{
                backgroundImage:
                  "url(" +
                  `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}` +
                  ")",
              }}
              className="detailImg"
            />
          </Row>
        </Col>
        <Col lg={6} xs={12}>
          <Row>
            <div className="genre-container">
              {showGenre(data?.genres).map((genreName, index) => (
                <Badge key={index} bg="danger" className="detail-genres">
                  {genreName}
                </Badge>
              ))}
            </div>
            <div className="detail-title">{data?.title}</div>
            <div className="detail-averpopular">
              <FontAwesomeIcon icon={faStar} />
              {data?.vote_average}
              <div className="detail-popular">
                <FontAwesomeIcon icon={faEye} />
                {data?.popularity}
              </div>
            </div>
            <hr />
            <div>{data?.overview}</div>
            <hr />
            <div className="badge-container">
              <Badge bg="danger" className="detail-genres-s">
                Budget
              </Badge>
              <div className="sub-container">$ {price}</div>
            </div>
            <div className="badge-container">
              <Badge bg="danger" className="detail-genres-s">
                Revenue
              </Badge>
              <div className="sub-container">$ {revenue}</div>
            </div>
            <div className="badge-container">
              <Badge bg="danger" className="detail-genres-s">
                Release Date
              </Badge>
              <div className="sub-container">{data?.release_date}</div>
            </div>
            <div className="badge-container">
              <Badge bg="danger" className="detail-genres-s">
                Run time
              </Badge>
              <div className="sub-container">{data?.runtime}분</div>
            </div>
          </Row>
          <Button className="me-2 mb-2" onClick={() => handleShow(true)}>
            예고편 보기
          </Button>
          {/* 모달 수정 */}
          <Modal
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
            centered
            backdrop="true" // 바깥 클릭 시 모달 닫기 설정
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              {" "}
              {/* 닫기 버튼 추가 */}
              <Modal.Title>예고편</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 d-flex justify-content-center align-items-center">
              {trailer ? (
                <iframe
                  width="80%" // YouTube 영상 크기 조정
                  height="80%" // YouTube 영상 크기 조정
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-white">No Trailer Available</p>
              )}
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      {/* 리뷰 섹션 */}
      <Row>
        <p onClick={() => swtichShowReviews()} className="review-title">
          <div className="reviews-number">{reviewData?.results.length}</div>
          <div>Reviews</div>
        </p>
        {isShowReviews &&
          reviewData?.results.map((review, index) => (
            <MovieReview key={index} reviewData={review}></MovieReview>
          ))}
      </Row>
      {/* 추천 영화 섹션 */}
      <Row>
        {RecommendationData?.results.map((recommend, index) => (
          <MovieRecommend key={index} recommendData={recommend} />
        ))}
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
