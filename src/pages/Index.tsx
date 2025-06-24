
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchTrendingMovies, Movie } from '@/lib/tmdb';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';
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
      // Rotate hero movie every time page loads
      const randomIndex = Math.floor(Math.random() * Math.min(5, trendingMovies.length));
      setHeroMovie(trendingMovies[randomIndex]);
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
        <div className="text-center text-white max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-cinema-red">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">Unable to load movies. Please check your connection and try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-cinema-gold hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
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
      
      {/* Search Section - Show when searching */}
      {searchQuery && (
        <div className="bg-gradient-to-b from-cinema-darker to-cinema-dark py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Search Movies</h1>
            <SearchBar 
              onSearch={handleSearch} 
              searchQuery={searchQuery}
              placeholder="Search for any movie..."
            />
          </div>
        </div>
      )}
      
      {/* Movies Grid */}
      <main className="container mx-auto px-4 py-8">
        <MovieGrid
          movies={movies}
          isLoading={isLoading}
          onMovieClick={handleMovieClick}
          title={searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
          subtitle={searchQuery ? 'Find your next favorite movie' : 'Discover trending and popular movies'}
        />
      </main>
      
      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default Index;
