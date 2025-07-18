import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 최신 트렌딩 (영화+TV 통합)
const fetchTrendingVideos = () => {
  return api.get("/trending/all/week?language=ko&page=1&region=KR");
};

export const useTrendingVideosQuery = () => {
  return useQuery({
    queryKey: ["trending-videos"],
    queryFn: fetchTrendingVideos,
  });
};