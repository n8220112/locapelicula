import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTVTrailer = (id) => {
  return api.get(`/tv/${id}/videos?language=ko&page=1&region=KR`);
};

export const useTVTrailerQuery = (id) => {
  return useQuery({
    queryKey: ["tv-trailer", id],
    queryFn: () => fetchTVTrailer(id),
    enabled: !!id,
  });
};
