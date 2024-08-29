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
    return <h1>Loading...</h1>;
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
