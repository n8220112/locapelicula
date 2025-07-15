import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

export const useSearchMovieQuery = (keyword, options = {}) => {
  return useQuery({
    queryKey: ["movie-search", keyword],
    queryFn: () => api.get(`/search/movie?${keyword}?language=ko&page=1&region=KR`),
    ...options,
    enabled: !!keyword, //키워드가 없을 땐 사용하지 않겠다
  });
};