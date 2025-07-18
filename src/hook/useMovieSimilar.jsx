import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieSimilar = (movieId) => {
  return api.get(`/movie/${movieId}/similar?language=ko&page=1&region=KR`);
};

export const useMovieSimilar = (movieId) => {
  return useQuery({
    queryKey: ["similar", movieId],
    queryFn: () => fetchMovieSimilar(movieId),
  });
};
