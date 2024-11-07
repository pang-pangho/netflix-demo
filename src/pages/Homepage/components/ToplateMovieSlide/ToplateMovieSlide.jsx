import React from "react";
import { useTopRatedMoivesQuery } from "../../../../hooks/useToplateMovie";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import "./ToplateMovieSlide.style.css";
import MovieSlider from "../../../../common/movieSlide/MovieSlider";
import { responsive } from "../../../../constants/responsive";
const ToplateMovieSlide = () => {
  const { data, isLoading, error, isError } = useTopRatedMoivesQuery();
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
        title="최고 평점 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default ToplateMovieSlide;
