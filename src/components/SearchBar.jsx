import search from '../assets/search.svg';
import key from '../assets/key.svg';

const SearchBar = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="relative mt-12 mb-4 container mx-auto px-6">
            <div className="text-xl mb-4">Browse Library</div>
            <img 
                src={search} 
                alt="search" 
                className="search-icon absolute transform -translate-y-1/2 h-4 w-4 text-gray-400"
            />
            <img 
                src={key} 
                alt="key" 
                className="key-icon absolute transform -translate-y-1/2 h-4 w-4 text-gray-400"
            />
            <input 
                type="text"
                placeholder="Search for a component"
                className="block w-full rounded-md border-0 py-2 pr-3 pl-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm/6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;