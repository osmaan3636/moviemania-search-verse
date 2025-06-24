
import { Movie } from '@/lib/tmdb';
import MovieCard from './MovieCard';
import LoadingSkeleton from './LoadingSkeleton';

interface MovieGridProps {
  movies: Movie[] | undefined;
  isLoading: boolean;
  onMovieClick: (movie: Movie) => void;
  title: string;
  subtitle?: string;
}

const MovieGrid = ({ movies, isLoading, onMovieClick, title, subtitle }: MovieGridProps) => {
  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
        <div className="text-center py-16 bg-cinema-gray rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
          <p className="text-gray-400">Try searching for something else or check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        {subtitle && <p className="text-gray-400">{subtitle}</p>}
        <p className="text-sm text-cinema-gold mt-1">{movies.length} movies found</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {movies.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
