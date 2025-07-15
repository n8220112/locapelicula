import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

/* 곧 개봉하는 영화 */
const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming?language=ko&page=1&region=KR`);
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
  });
};
