import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchDetailMovies = (movie_id) => {
  return movie_id ? api.get(`/movie/${movie_id}?language=ko-KR`) : null;
};
export const useDetailMovie = ({ movie_id }) => {
  return useQuery({
    queryKey: ["movie-detail", movie_id],
    queryFn: () => fetchDetailMovies(movie_id),
    select: (result) => result.data,
  });
};
