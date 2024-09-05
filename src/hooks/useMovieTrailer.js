import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchMovieTrailers = (movie_id) => {
  return movie_id
    ? api.get(`/movie/${movie_id}/videos?language=ko-KR`)
    : Promise.resolve({ data: { results: [] } });
};

export const useMovieTrailer = ({ movie_id } = {}) => {
  return useQuery({
    queryKey: ["movie-trailers", movie_id],
    queryFn: () => fetchMovieTrailers(movie_id),
    select: (result) => result.data.results,
    enabled: !!movie_id, // movie_id가 있을 때만 쿼리를 실행하도록 설정
  });
};
