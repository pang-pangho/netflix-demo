import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchReview = (movie_id) => {
  return movie_id ? api.get(`/movie/${movie_id}/reviews`) : null;
};
export const useReview = ({ movie_id }) => {
  return useQuery({
    queryKey: ["movie-review", movie_id],
    queryFn: () => fetchReview(movie_id),
    select: (result) => result.data,
  });
};
