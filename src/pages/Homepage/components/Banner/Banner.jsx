import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovie";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

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
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const bannerImageUrl = `https://image.tmdb.org/t/p/original${data?.results[1].backdrop_path}`;

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bannerImageUrl})`,
        }}
        className="banner"
      >
        <div className="banner-text-area">
          <h1>{data?.results[1].title}</h1>
          <p>{data?.results[1].overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
