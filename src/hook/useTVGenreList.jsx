import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTVGenres = () => {
  return api.get("/genre/tv/list?language=ko&page=1&region=KR");
};

export const useTVGenreListQuery = (options = {}) => {
  return useQuery({
    queryKey: ["tv-genres"],
    queryFn: fetchTVGenres,
    ...options,
  });
};
