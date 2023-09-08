import React from 'react';

import { useSearch } from '../context/searchContext';

import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/fa/search';

export default function SearchHistory() {
  const { setSelectedIndex, searchHistory } = useSearch();

  return (
    <>
      <WordList>
        <Subtitle>최근 검색어</Subtitle>
        {searchHistory.map((result, idx) => (
          <WordItem
            key={idx}
            onClick={() => {
              setSelectedIndex(idx);
            }}
          >
            <Icon icon={search} className='ic_search' />
            {result}
          </WordItem>
        ))}
        {/* <Subtitle>추천 검색어로 검색해 보세요</Subtitle> */}
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
    color: black;
    font-weight: 500;
    background-color: rgba(10, 90, 203, 0.2);
    border-radius: 5px;
  }

  &:hover {
    background-color: var(--lightGray);
  }

  .ic_search {
    padding: 0 8px;
    color: var(--gray);
  }
`;
