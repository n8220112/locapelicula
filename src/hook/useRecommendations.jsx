import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendations = (movieId) => {
  return api.get(`/movie/${movieId}/recommendations?language=ko&page=1&region=KR`);
};

export const useRecommendations = (movieId) => {
  return useQuery({
    queryKey: ["recommendations", movieId],
    queryFn: () => fetchRecommendations(movieId),
  });
};
