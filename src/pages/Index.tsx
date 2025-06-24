
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchTrendingMovies, Movie } from '@/lib/tmdb';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MovieCard from '@/components/MovieCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import MovieModal from '@/components/MovieModal';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);

  // Fetch trending movies for hero section
  const { data: trendingMovies } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: fetchTrendingMovies,
  });

  // Fetch movies based on search query
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => fetchMovies({ query: searchQuery }),
  });

  // Set hero movie from trending movies
  useEffect(() => {
    if (trendingMovies && trendingMovies.length > 0 && !heroMovie) {
      setHeroMovie(trendingMovies[0]);
    }
  }, [trendingMovies, heroMovie]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-cinema-dark flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-400">Unable to load movies. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-dark">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      {/* Hero Section - Only show when not searching */}
      {!searchQuery && heroMovie && (
        <HeroSection movie={heroMovie} onMovieClick={handleMovieClick} />
      )}
      
      {/* Movies Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
          </h2>
          <p className="text-gray-400">
            {searchQuery ? 'Find your next favorite movie' : 'Discover trending movies'}
          </p>
        </div>
        
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies?.map((movie: Movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}
        
        {movies?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400">Try searching for something else</p>
          </div>
        )}
      </main>
      
      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default Index;
