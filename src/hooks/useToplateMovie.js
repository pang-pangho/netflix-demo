import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated?language=ko-KR`);
};

export const useTopRatedMoivesQuery = () => {
  return useQuery({
    queryKey: ["movie-topRated"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};
