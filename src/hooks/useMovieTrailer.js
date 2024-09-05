import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchMovieTrailers = (movie_id) => {
  return movie_id ? api.get(`/movie/${movie_id}/videos?language=ko-KR`) : null;
};

export const useMovieTrailer = ({ movie_id }) => {
  return useQuery({
    queryKey: ["movie-trailers", movie_id],
    queryFn: () => fetchMovieTrailers(movie_id),
    select: (result) => result.data.results,
  });
};
