import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import "./MovieCard.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEye } from "@fortawesome/free-solid-svg-icons";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const goToMovieDetail = (id) => {
    navigate(`/movies/${id}`);
  };

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj ? genreObj.name : "Unknown";
    });
    return genreNameList;
  };

  return (
    <div
      onClick={() => goToMovieDetail(movie.id)} // 함수 참조를 전달
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((genreName, index) => (
          <Badge key={index} bg="danger">
            {genreName}
          </Badge>
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
