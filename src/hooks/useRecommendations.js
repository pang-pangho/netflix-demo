import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchRecommendation = (movie_id) => {
  return movie_id ? api.get(`/movie/${movie_id}/recommendations`) : null;
};
export const useRecommendations = ({ movie_id }) => {
  return useQuery({
    queryKey: ["movie-recommendation", movie_id],
    queryFn: () => fetchRecommendation(movie_id),
    select: (result) => result.data,
  });
};
