import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieRecommendations = (movieId) => {
  return api.get(`/movie/${movieId}/recommendations?language=ko&page=1&region=KR`);
};

export const useMovieRecommendations = (movieId) => {
  return useQuery({
    queryKey: ["recommendations", movieId],
    queryFn: () => fetchMovieRecommendations(movieId),
  });
};
