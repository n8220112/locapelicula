/* 방영중 */
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchOnTheAirTV = () => {
  return api.get("/tv/on_the_air?language=ko&page=1&region=K");
};

export const useOnTheAirTVQuery = () => {
  return useQuery({
    queryKey: ["tv-on-the-air"],
    queryFn: fetchOnTheAirTV,
  });
};