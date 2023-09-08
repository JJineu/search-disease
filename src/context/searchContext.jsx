import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

const SearchContext = createContext(null);

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }) {
  const { fetchData, data } = useFetch();

  const [inputValue, setInputValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [searchHistory, setSearchHistory] = useState([]);
  // const [inputFocus, setInputFocus] = useState(false);

  const addSearchHistory = (clickWord) => {
    const isExistedSearchHistory = searchHistory.find((resentSearch) => resentSearch === clickWord);
    if (!clickWord.trim()) return;
    if (isExistedSearchHistory) {
      setSearchHistory((prev) => [
        clickWord,
        ...prev.filter((resentSearch) => resentSearch !== clickWord),
      ]);
    } else {
      if (searchHistory.length > 9) searchHistory.pop();
      setSearchHistory((prev) => [clickWord, ...prev]);
    }
  };

  const selectListItemByKeyArrow = (e) => {
    if (e.nativeEvent.isComposing) return;
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const lastIndex = data.length - 1;
        setSelectedIndex((prev) => (prev < lastIndex ? prev + 1 : 0));
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const lastIndex = data.length - 1;
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : lastIndex));
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [inputValue]);

  return (
    <SearchContext.Provider
      value={{
        fetchData,
        data,
        inputValue,
        setInputValue,
        selectedIndex,
        setSelectedIndex,
        selectListItemByKeyArrow,
        addSearchHistory,
        // searchHistory,
        // setSearchHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
