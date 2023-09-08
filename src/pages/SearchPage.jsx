import React from 'react';

import SearchInput from '../components/SearchInput';
import { useSearch } from '../context/searchContext';

import SearchResult from '../components/SearchResult';
// import SearchHistory from '../components/SearchHistory';

export default function SearchPage() {
  const { inputValue } = useSearch();

  return (
    <>
      <SearchInput />
      {inputValue && <SearchResult />}
      {/* {!inputValue && inputFocus && <SearchHistory />} */}
    </>
  );
}
