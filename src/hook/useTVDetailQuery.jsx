import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTVDetail = (id) => {
  return api.get(`/tv/${id}?language=ko&page=1&region=KR`);
};

export const useTVDetailQuery = (id, options = {}) => {
  return useQuery({
    queryKey: ["tv-detail", id],
    queryFn: () => fetchTVDetail(id),
    ...options,
  });
};
