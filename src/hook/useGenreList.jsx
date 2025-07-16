import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const fetchGenres = () => {
  return api.get(`/genre/movie/list?language=ko&page=1&region=KR`);
};

export const useGenreListQuery = () => {
  return useQuery({
    queryKey: ["movie-genres"],
    queryFn: fetchGenres,
  });
};
