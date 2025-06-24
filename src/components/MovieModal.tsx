
import { X, Star, Calendar, Clock, DollarSign, Users, Play } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { MovieDetails, Cast, fetchMovieDetails, fetchMovieCredits, getImageUrl, formatRuntime, formatCurrency } from '@/lib/tmdb';

interface MovieModalProps {
  movieId: number;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal = ({ movieId, isOpen, onClose }: MovieModalProps) => {
  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: isOpen && !!movieId,
  });

  const { data: cast, isLoading: castLoading } = useQuery({
    queryKey: ['movie-credits', movieId],
    queryFn: () => fetchMovieCredits(movieId),
    enabled: isOpen && !!movieId,
  });

  if (!isOpen) return null;

  const isLoading = movieLoading || castLoading;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cinema-dark rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-cinema-dark/95 backdrop-blur-sm border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Movie Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cinema-gold mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading movie details...</p>
          </div>
        ) : movie ? (
          <div className="p-6">
            {/* Hero Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Poster */}
              <div className="aspect-[2/3] rounded-lg overflow-hidden">
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Movie Info */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
                  {movie.tagline && (
                    <p className="text-cinema-gold italic text-lg">{movie.tagline}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-cinema-gray p-3 rounded-lg text-center">
                    <Star className="h-5 w-5 text-cinema-gold mx-auto mb-1" />
                    <p className="text-white font-semibold">{movie.vote_average.toFixed(1)}</p>
                    <p className="text-gray-400 text-xs">Rating</p>
                  </div>
                  
                  <div className="bg-cinema-gray p-3 rounded-lg text-center">
                    <Calendar className="h-5 w-5 text-cinema-gold mx-auto mb-1" />
                    <p className="text-white font-semibold">{new Date(movie.release_date).getFullYear()}</p>
                    <p className="text-gray-400 text-xs">Year</p>
                  </div>

                  <div className="bg-cinema-gray p-3 rounded-lg text-center">
                    <Clock className="h-5 w-5 text-cinema-gold mx-auto mb-1" />
                    <p className="text-white font-semibold">{formatRuntime(movie.runtime)}</p>
                    <p className="text-gray-400 text-xs">Runtime</p>
                  </div>

                  <div className="bg-cinema-gray p-3 rounded-lg text-center">
                    <Users className="h-5 w-5 text-cinema-gold mx-auto mb-1" />
                    <p className="text-white font-semibold">{movie.vote_count.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">Votes</p>
                  </div>
                </div>

                {/* Genres */}
                <div>
                  <h3 className="text-white font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-cinema-gold/20 text-cinema-gold px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex items-center space-x-2 bg-cinema-red hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
                    <Play className="h-5 w-5" />
                    <span>Watch Trailer</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-cinema-gray hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
                    <Star className="h-5 w-5" />
                    <span>Add to Favorites</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-white font-semibold text-xl mb-3">Overview</h3>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Cast */}
            {cast && cast.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white font-semibold text-xl mb-4">Cast</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {cast.slice(0, 12).map((actor) => (
                    <div key={actor.id} className="text-center">
                      <div className="aspect-square rounded-full overflow-hidden mb-2 bg-cinema-gray">
                        <img
                          src={getImageUrl(actor.profile_path, 'w185')}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white text-sm font-medium truncate">{actor.name}</p>
                      <p className="text-gray-400 text-xs truncate">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid md:grid-cols-2 gap-6">
              {movie.budget > 0 && (
                <div className="bg-cinema-gray p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-cinema-gold" />
                    <h4 className="text-white font-semibold">Budget</h4>
                  </div>
                  <p className="text-gray-300">{formatCurrency(movie.budget)}</p>
                </div>
              )}

              {movie.revenue > 0 && (
                <div className="bg-cinema-gray p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-cinema-gold" />
                    <h4 className="text-white font-semibold">Revenue</h4>
                  </div>
                  <p className="text-gray-300">{formatCurrency(movie.revenue)}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-400">Failed to load movie details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
