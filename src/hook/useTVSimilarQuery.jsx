import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTVSimilar = (id) => {
  return api.get(`/tv/${id}/similar?language=ko&page=1&region=KR`);
};

export const useTVSimilarQuery = (id) => {
  return useQuery({
    queryKey: ["tv-similar", id],
    queryFn: () => fetchTVSimilar(id),
    enabled: !!id,
  });
};
