import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieCredits = (movieId) => {
  return api.get(`/movie/${movieId}/credits?language=ko&page=1&region=KR`);
};

export const useMovieCredits = (movieId) => {
  return useQuery({
    queryKey: ['movie-credits', movieId],
    queryFn: () => fetchMovieCredits(movieId),
    enabled: !!movieId,
  });
};