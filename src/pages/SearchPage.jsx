import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { isEmptyArray, debounce } from '../utils';
import { searchDisease } from '../apis/search';

import styled, { css } from 'styled-components';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/fa/search';
import { remove } from 'react-icons-kit/fa/remove';

export default function SearchPage() {
  const { data, fetchData } = useFetch();
  /**
   * @type {Array<{sickCd; string, sickNm: string}>}
   */
  const [recommendWordList, setRecommendWordList] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const debouncedChangeSearchWord = debounce((e) => {
    setInputValue(e.target.value);
    const searchWord = e.target.value.trim();
    if (searchWord) {
      fetchData(() => searchDisease(searchWord), searchWord);
    }
  }, 1000);

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

  const removeSearchWord = () => {
    const inputElement = document.getElementById('search-input');
    if (inputElement) {
      inputElement.value = '';
      setInputValue('');
    }
  };

  const selectListItemByKeyArrow = (e) => {
    if (e.nativeEvent.isComposing) return;
    // e.prevent.default();

    switch (e.key) {
      case 'ArrowDown': {
        const lastIndex = recommendWordList.length - 1;
        setSelectedIndex((prev) => (prev < lastIndex ? prev + 1 : 0));
        break;
      }
      case 'ArrowUp': {
        const lastIndex = recommendWordList.length - 1;
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : lastIndex));
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (data === null) return;
    setRecommendWordList(data);
  }, [data]);

  return (
    <>
      <SearchContainer>
        <Icon icon={search} className='ic_search' />
        <SearchInput
          id='search-input'
          type='text'
          onChange={debouncedChangeSearchWord}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onKeyDown={selectListItemByKeyArrow}
          placeholder='질환명을 입력해 주세요.'
        />
        {inputValue && <Icon className='ic_remove' icon={remove} onClick={removeSearchWord} />}
        <Icon className='ic_search2' icon={search} onClick={() => addSearchHistory(inputValue)} />
      </SearchContainer>
      {inputValue && (
        <WordList>
          <WordItem>
            <Icon icon={search} className='ic_search' />
            {inputValue}
          </WordItem>
          <Subtitle>추천 검색어</Subtitle>
          {isEmptyArray(recommendWordList) && <Subtitle>검색어 없음</Subtitle>}
          {!isEmptyArray(recommendWordList) && (
            <div id='recommend-word-list'>
              {recommendWordList?.map((word, idx) => (
                <WordItem
                  key={idx}
                  isSelected={idx === selectedIndex}
                  isInputFocus={inputFocus}
                  onClick={() => addSearchHistory(word.sickNm)}
                >
                  <Icon icon={search} className='ic_search' />
                  <p>{word.sickNm}</p>
                </WordItem>
              ))}
            </div>
          )}
        </WordList>
      )}
      {!inputValue && inputFocus && (
        <WordList>
          <Subtitle>최근 검색어</Subtitle>
          {searchHistory.map((result, idx) => (
            <WordItem key={idx} isSelected={idx === selectedIndex} isInputFocus={inputFocus}>
              <Icon icon={search} className='ic_search' />
              {result}
            </WordItem>
          ))}
          {/* <Subtitle>추천 검색어로 검색해 보세요</Subtitle> */}
        </WordList>
      )}
    </>
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
    color: gray;
  }
  .ic_search2 {
    position: absolute;
    right: 10px;
    padding: 8px 10px 9px 11px;
    border-radius: 100%;
    color: white;
    background-color: #435fff;
    cursor: pointer;
  }
  .ic_remove {
    position: absolute;
    right: 60px;
    color: gray;

    cursor: pointer;
    &:hover {
      transform: scale(1.02);
      transition: transform 0.2s ease-in-out;
    }
  }
`;

const SearchInput = styled.input`
  width: 400px;
  align-items: center;
  padding: 20px 80px 20px 40px;
  border-radius: 40px;
  border: 2px solid rgb(228, 228, 228);
  outline: none;

  transition: border-color 0.3s;

  &:focus {
    border: 2px solid rgb(105, 130, 255);
  }
`;

const Subtitle = styled.p`
  font-size: small;
  font-weight: lighter;
  color: gray;
  padding: 5px 0 5px 20px;
`;

const WordList = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  margin-top: 5px;
  padding: 10px 0;
  background-color: white;
  border-radius: 10px;
  border: 1px solid rgb(228, 228, 228);
`;

const WordItem = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;

  cursor: pointer;

  ${({ isSelected, isInputFocus }) =>
    isSelected &&
    isInputFocus &&
    css`
      background-color: #f0f0f0;
    `}

  &:hover {
    background-color: #f0f0f0;
  }

  .ic_search {
    padding: 0 8px;
    color: gray;
  }
`;
