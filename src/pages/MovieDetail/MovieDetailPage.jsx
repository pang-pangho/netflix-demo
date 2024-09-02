import React from "react";
import { useParams } from "react-router-dom";
import { useDetailMovie } from "../../hooks/useDetailMovie";

const MovieDetailPage = () => {
  const { id: movie_id } = useParams(); // useParams에서 movie_id를 직접 추출
  console.log("무비아이디:", movie_id);
  const { data, isLoading, isError, error } = useDetailMovie({ movie_id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return <div>MovieDetailPage</div>;
};

export default MovieDetailPage;
