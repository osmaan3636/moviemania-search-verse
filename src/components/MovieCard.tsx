
import { Star, Calendar, Clock } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div
      onClick={() => onClick(movie)}
      className="group cursor-pointer bg-cinema-gray rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-scale-in"
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-cinema-gold fill-current" />
          <span className="text-white text-xs font-medium">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Hover Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm text-gray-200 line-clamp-3">{movie.overview}</p>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-cinema-gold transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-cinema-gold" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
