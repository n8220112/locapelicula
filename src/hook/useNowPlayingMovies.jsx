import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

/* 현재 상영중인 영화 */
const fetchNowPlayingMovies = () => {
  return api.get(`/movie/now_playing?language=ko&page=1&region=KR`);
};

export const useNowPlayingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-now-playing"],
    queryFn: fetchNowPlayingMovies,
  });
};