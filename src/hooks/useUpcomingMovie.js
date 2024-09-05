import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming?language=ko-KR`);
};

export const useUpcomingMoivesQuery = () => {
  return useQuery({
    queryKey: ["movie-Upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};
