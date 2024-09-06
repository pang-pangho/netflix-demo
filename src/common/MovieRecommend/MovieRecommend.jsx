import React from "react";
import "./MovieRecommend.style.css";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const MovieRecommend = ({ recommendData }) => {
  const navigate = useNavigate();

  const goToMovieDetail = (id) => {
    navigate(`/app/movies/${id}`);
  };

  return (
    <Col lg={6} xs={12}>
      <div
        onClick={() => goToMovieDetail(recommendData.id)} // 영화 상세 페이지로 이동하는 함수
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${recommendData.poster_path})`,
        }}
        className="recommend-card"
      />
    </Col>
  );
};

export default MovieRecommend;
