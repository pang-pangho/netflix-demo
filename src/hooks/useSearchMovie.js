import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchSearchMovie = async ({ keyword, page }) => {
  const response = await api.get(
    keyword
      ? `/search/movie?query=${keyword}&page=${page}&language=ko-KR` // language 파라미터 추가
      : `/movie/popular?page=${page}&language=ko-KR` // language 파라미터 추가
  );
  return response.data; // 여기서 response.data를 반환하여 data만 반환
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page],
    queryFn: () => fetchSearchMovie({ keyword, page }),
    select: (result) => result, // select를 사용해 전체 결과를 전달
  });
};
