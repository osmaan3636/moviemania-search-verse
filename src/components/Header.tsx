
import { Search, Film, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header = ({ onSearch, searchQuery }: HeaderProps) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
  };

  return (
    <header className="sticky top-0 z-50 bg-cinema-darker/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-cinema-gold" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Movie<span className="text-cinema-gold">Mania</span>
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for movies..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cinema-gray border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-gold focus:border-transparent transition-all duration-300"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <TrendingUp className="h-5 w-5" />
              <span className="hidden md:inline">Trending</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Star className="h-5 w-5" />
              <span className="hidden md:inline">Favorites</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
