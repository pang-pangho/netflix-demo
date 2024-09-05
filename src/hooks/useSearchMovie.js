import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchSearchMovie = async ({ keyword, page }) => {
  const response = await api.get(
    keyword
      ? `/search/movie?query=${keyword}&page=${page}&language=ko-KR`
      : `/movie/popular?page=${page}&language=ko-KR`
  );
  return response.data;
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page],
    queryFn: () => fetchSearchMovie({ keyword, page }),
    select: (result) => result,
  });
};
