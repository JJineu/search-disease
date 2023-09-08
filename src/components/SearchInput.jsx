import React from 'react';

import { debounce } from '../utils';
import { searchDisease } from '../apis/search';
import { useSearch } from '../context/searchContext';

import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/fa/search';

export default function SearchInput() {
  const { fetchData, setInputValue, inputValue, selectListItemByKeyArrow, addSearchHistory } =
    useSearch();

  const debouncedChangeSearchWord = debounce((e) => {
    setInputValue(e.target.value);
    const searchWord = e.target.value.trim();
    if (searchWord) {
      fetchData(() => searchDisease(searchWord), searchWord);
    }
  }, 300);

  return (
    <SearchContainer>
      <Icon icon={search} className='ic_search' />
      <StyledInput
        type='search'
        placeholder='질환명을 입력해 주세요.'
        onChange={debouncedChangeSearchWord}
        onKeyDown={selectListItemByKeyArrow}
      />
      <Icon className='ic_search2' icon={search} onClick={() => addSearchHistory(inputValue)} />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 60px;

  .ic_search {
    position: absolute;
    left: 18px;
    color: var(--gray);
  }
  .ic_search2 {
    position: absolute;
    right: 10px;
    padding: 8px 10px 9px 11px;
    border-radius: 100%;
    color: var(--white);
    background-color: var(--blue);
    cursor: pointer;
  }
  .ic_remove {
    position: absolute;
    right: 60px;
    color: var(--gray);

    cursor: pointer;
    &:hover {
      transform: scale(1.02);
      transition: transform 0.2s ease-in-out;
    }
  }
`;

const StyledInput = styled.input`
  width: 400px;
  align-items: center;
  padding: 20px 80px 20px 40px;
  border-radius: 40px;
  border: 2px solid rgb(228, 228, 228);
  outline: none;
  background-color: var(--white);

  transition: border-color 0.3s;

  &:focus {
    border: 2px solid rgb(105, 130, 255);
  }
`;
