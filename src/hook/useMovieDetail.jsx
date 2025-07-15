import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (id) => {
  return api.get(`/movie/${id}?language=ko&page=1&region=KR`);
};

export const useMovieDetail = (id) => {
  return useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => fetchMovieDetail(id),
    enabled: !!id,
  });
};
