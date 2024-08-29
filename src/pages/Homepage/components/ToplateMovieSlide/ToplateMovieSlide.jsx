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
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert varient="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Top Rated Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default ToplateMovieSlide;
