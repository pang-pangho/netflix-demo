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
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert varient="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Upcoming Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
