import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchSearchMovie = async ({ keyword, page, genre }) => {
  const genreParam = genre ? `&with_genres=${genre}` : "";
  const response = await api.get(
    keyword
      ? `/search/movie?query=${keyword}&page=${page}&language=ko-KR${genreParam}`
      : `/movie/popular?page=${page}&language=ko-KR${genreParam}`
  );
  return response.data;
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page }],
    queryFn: () => fetchSearchMovie({ keyword, page }),
    select: (result) => result,
  });
};
