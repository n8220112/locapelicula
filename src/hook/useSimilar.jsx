import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const fetchSimilar = (movieId) => {
  return api.get(`/movie/${movieId}/similar?language=ko&page=1&region=KR`);
};

export const useSimilar = (movieId) => {
  return useQuery({
    queryKey: ["similar", movieId],
    queryFn: () => fetchSimilar(movieId),
  });
};
