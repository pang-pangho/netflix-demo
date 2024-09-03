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
const MovieDetailPage = () => {
  const { id: movie_id } = useParams(); // useParams에서 movie_id를 직접 추출
  const { data, isLoading, isError, error } = useDetailMovie({ movie_id });
  const { data: reviewData } = useReview({ movie_id });
  const { data: RecommendationData } = useRecommendations({ movie_id });
  const { data: genreData } = useMovieGenreQuery();
  const [price, setPrice] = useState("0");
  const [revenue, setRevenue] = useState("0");
  const [isShowReviews, setIsShowReviews] = useState(false);
  const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  const swtichShowReviews = () => {
    console.log(isShowReviews);
    if (isShowReviews) {
      setIsShowReviews(false);
    } else {
      setIsShowReviews(true);
    }
  };
  const formatCurrency = (amount) => {
    let formattedAmount = String(amount).replace(/,/g, "");
    if (isNaN(formattedAmount)) {
      return "0";
    } else {
      return Number(formattedAmount).toLocaleString("en-US");
    }
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
    return <div>Loading...</div>;
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
                Budge
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
          <Modal
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Modal body content</Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Row>
        <p onClick={() => swtichShowReviews()} className="review-title">
          <div className="reviews-number">{reviewData?.results.length}</div>
          <div>Reviews</div>
        </p>
        {isShowReviews &&
          reviewData?.results.map((review, index) => (
            <MovieReview reviewData={review}> </MovieReview>
          ))}
      </Row>
      <Row>
        {RecommendationData?.results.map((recommend, index) => (
          <MovieRecommend recommendData={recommend} />
        ))}
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
