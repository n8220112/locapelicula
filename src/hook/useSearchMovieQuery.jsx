import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

export const useSearchMovieQuery = (keyword, options = {}) => {
  return useQuery({
    queryKey: ["movie-search", keyword],
    queryFn: () => api.get(`/search/movie?query=${encodeURIComponent(keyword)}&language=ko&page=1&region=KR`),
    ...options,
    enabled: !!keyword,
  });
};
