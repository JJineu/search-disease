import React, { useLayoutEffect, useRef } from 'react';
import { isEmptyArray } from '../utils';

import { useSearch } from '../context/searchContext';

import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/fa/search';

export default function SearchResult() {
  const {
    data: recommendWordList,
    inputValue,
    selectedIndex,
    setSelectedIndex,
    selectListItemByKeyArrow,
    addSearchHistory,
  } = useSearch();

  const listRef = useRef(undefined);

  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.focus();
    }
  });

  return (
    <>
      <WordList>
        <WordItem>
          <Icon icon={search} className='ic_search' />
          {inputValue}
        </WordItem>
        <Subtitle>추천 검색어</Subtitle>
        {isEmptyArray(recommendWordList) && <Subtitle>검색어 없음</Subtitle>}
        {!isEmptyArray(recommendWordList) && (
          <>
            {recommendWordList?.map((word, idx) => (
              <React.Fragment key={word.sickCd}>
                <WordItem
                  ref={idx === selectedIndex ? listRef : null}
                  onKeyDown={selectListItemByKeyArrow}
                  tabIndex={selectedIndex === idx ? 0 : -1}
                  onClick={() => {
                    addSearchHistory(word.sickNm);
                    setSelectedIndex(idx);
                  }}
                >
                  <Icon icon={search} className='ic_search' />
                  <p>{word.sickNm}</p>
                </WordItem>
              </React.Fragment>
            ))}
          </>
        )}
      </WordList>
    </>
  );
}

const Subtitle = styled.p`
  font-size: small;
  font-weight: lighter;
  color: var(--gray);
  padding: 5px 0 5px 20px;
`;

const WordList = styled.div`
  /* display: flex; */
  flex-direction: column;
  width: 400px;
  max-height: 400px;
  overflow-y: scroll;
  margin-top: 5px;
  padding: 10px 0;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid rgb(228, 228, 228);
`;

const WordItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;

  cursor: pointer;

  > p {
    padding: 0;
    margin: 0;
  }
  &:focus,
  &:focus-visible {
    outline: none;
    background-color: var(--grayBlue);
  }

  &:hover {
    background-color: var(--grayBlue);
  }

  .ic_search {
    padding: 0 8px;
    color: var(--gray);
  }
`;
