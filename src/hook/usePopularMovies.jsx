import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

/* 인기있는 영ㅇ화 */
const fetchPopularMovies = () => {
  return api.get(`/movie/popular?language=ko&page=1&region=KR`);
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
  });
};
