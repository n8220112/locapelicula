import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTVCredits = (id) => {
  return api.get(`/tv/${id}/credits?language=ko&page=1&region=KR`);
};

export const useTVCreditsQuery = (id) => {
  return useQuery({
    queryKey: ["tv-credits", id],
    queryFn: () => fetchTVCredits(id),
    enabled: !!id,
  });
};
