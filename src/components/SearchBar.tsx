
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  placeholder?: string;
}

const SearchBar = ({ onSearch, searchQuery, placeholder = "Search for movies..." }: SearchBarProps) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery.trim());
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    
    // Auto-search after user stops typing for 500ms
    const timeoutId = setTimeout(() => {
      if (value.trim() !== searchQuery) {
        onSearch(value.trim());
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={localQuery}
          onChange={handleInputChange}
          className="w-full pl-12 pr-12 py-4 bg-cinema-gray border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-gold focus:border-transparent transition-all duration-300 text-lg"
        />
        {localQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
