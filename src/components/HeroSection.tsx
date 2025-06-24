
import { Play, Info, Star } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';

interface HeroSectionProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
}

const HeroSection = ({ movie, onMovieClick }: HeroSectionProps) => {
  return (
    <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <div className="text-white space-y-6 animate-fade-in">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-cinema-gold fill-current" />
            <span className="text-cinema-gold font-semibold">Featured Movie</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-lg">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-cinema-gold fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            {movie.overview}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center space-x-3 bg-cinema-red hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105">
              <Play className="h-6 w-6" />
              <span>Watch Trailer</span>
            </button>
            
            <button
              onClick={() => onMovieClick(movie)}
              className="flex items-center justify-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Info className="h-6 w-6" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
