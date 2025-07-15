import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

/* 평점이 높은 영화 */
const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated?language=ko&page=1&region=KR`);
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top-rated"],
    queryFn: fetchTopRatedMovies,
  });
};