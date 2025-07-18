import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchTV = (keyword) => {
  return api.get(`/search/tv?query=${encodeURIComponent(keyword)}&language=ko&page=1&region=KR`);
};

export const useSearchTVQuery = (keyword, options = {}) => {
  return useQuery({
    queryKey: ["search-tv", keyword],
    queryFn: () => fetchSearchTV(keyword),
    enabled: !!keyword, // keyword가 있을 때만 실행
    ...options,
  });
};
