import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextProps {
  searchText: string;
  results: any[];
  setSearchText: (text: string) => void;
  setResults: (results: any[]) => void;
}

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<any[]>([]);

  return (
    <SearchContext.Provider value={{ searchText, setSearchText, results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearchContext must be used within a SearchProvider");
  return context;
};
