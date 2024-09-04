import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovie";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import "./PopularMoviesSlide.style.css";
import MovieSlider from "../../../../common/movieSlide/MovieSlider";
import { responsive } from "../../../../constants/responsive";
const PopularMovieSlide = () => {
  const { data, isLoading, error, isError } = usePopularMoviesQuery();
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
    return <Alert varient="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
