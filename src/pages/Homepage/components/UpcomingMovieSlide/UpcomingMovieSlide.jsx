import React from "react";
import { useUpcomingMoivesQuery } from "../../../../hooks/useUpcomingMovie";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import "./UpcomingMovieSlide.style.css";
import MovieSlider from "../../../../common/movieSlide/MovieSlider";
import { responsive } from "../../../../constants/responsive";
const UpcomingMovieSlide = () => {
  const { data, isLoading, error, isError } = useUpcomingMoivesQuery();
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
        title="개봉 예정 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
