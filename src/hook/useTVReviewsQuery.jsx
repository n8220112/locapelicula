import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTVReviews = (id) => {
  return api.get(`/tv/${id}/reviews`);
};

export const useTVReviewsQuery = (id) => {
  return useQuery({
    queryKey: ["tv-reviews", id],
    queryFn: () => fetchTVReviews(id),
    enabled: !!id,
  });
};
