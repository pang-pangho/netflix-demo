import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import ToplateMovieSlide from "./components/ToplateMovieSlide/ToplateMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
//1. 배너
//2. popular movie
//3. top rated movie
//4. upcoming movie
const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <ToplateMovieSlide />
      <UpcomingMovieSlide />
    </div>
  );
};

export default Homepage;
