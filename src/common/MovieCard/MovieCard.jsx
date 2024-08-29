import React from "react";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import "./MovieCard.style.css";
import under18 from "./under18.png";
const MovieCard = ({ movie, index }) => {
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
        {movie.genre_ids.map((id) => (
          <Badge bg="danger">{id}</Badge>
        ))}
        <div className="movie-sub">
          <Badge bg="secondary">평점:{movie.vote_average}</Badge>{" "}
          <Badge bg="secondary">인기도:{movie.popularity}</Badge>{" "}
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
