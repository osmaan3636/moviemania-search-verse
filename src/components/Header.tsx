
import { Film, Star, TrendingUp, Search } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header = ({ onSearch, searchQuery }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-cinema-darker/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Film className="h-8 w-8 text-cinema-gold" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Movie<span className="text-cinema-gold">Mania</span>
            </h1>
          </div>

          {/* Search Bar - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar 
              onSearch={onSearch} 
              searchQuery={searchQuery}
              placeholder="Search movies..."
            />
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Mobile search icon */}
            <button className="md:hidden text-gray-300 hover:text-white transition-colors">
              <Search className="h-6 w-6" />
            </button>
            
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300 hover:text-cinema-gold transition-colors cursor-pointer">
                <TrendingUp className="h-5 w-5" />
                <span className="hidden lg:inline">Trending</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 hover:text-cinema-gold transition-colors cursor-pointer">
                <Star className="h-5 w-5" />
                <span className="hidden lg:inline">Favorites</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <SearchBar 
            onSearch={onSearch} 
            searchQuery={searchQuery}
            placeholder="Search movies..."
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
