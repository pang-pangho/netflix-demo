import React from "react";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import "./MovieCard.style.css";
import under18 from "./under18.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
const MovieCard = ({ movie, index }) => {
  const { data: genreData } = useMovieGenreQuery();
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((id) => (
          <Badge bg="danger">{id}</Badge>
        ))}
        <div className="movie-sub">
          <div>
            <FontAwesomeIcon icon={faStar} />
            {movie.vote_average}
          </div>
          <div>
            <FontAwesomeIcon icon={faEye} />
            {movie.popularity}
          </div>
          {movie.adult ? (
            <Badge bg="danger">18세이상 시청 가능</Badge>
          ) : (
            <Badge bg="danger">18세이하 시청 가능</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
