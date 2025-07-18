/* 인기티비 */

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularTV = () => {
  return api.get("/tv/popular?language=ko&page=1&region=K");
};

export const usePopularTVQuery = () => {
  return useQuery({
    queryKey: ["tv-popular"],
    queryFn: fetchPopularTV,
  });
};