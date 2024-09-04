import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovie";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  if (isLoading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url(" +
            `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[0].poster_path}` +
            ")",
        }}
        className="banner"
      >
        <div className="text-white banner-text-area">
          <h1>{data?.results[0].title}</h1>
          <p>{data?.results[0].overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
