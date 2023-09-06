/* eslint-disable */
import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { isEmptyArray, isKoreanWord } from '../utils';
import useFetch from '../hooks/useFetch';

export default function SearchPage() {
  const [recommendWordList, setRecommendWordList] = useState([]); // { sickCd: string, sickNm: string }[]
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const { data, fetchData } = useFetch();

  const getDisease = async (endpoint, options = '') => {
    const response = await fetch(`http://localhost:4000/sick?q=${endpoint}${options}`);
    const res = await response.json();
    return res;
  };

  const debouncedChangeSearchWord = useDebounce(async (e) => {
    const endpoint = e.target.value.trim();
    if (endpoint && isKoreanWord(endpoint)) {
      fetchData(() => getDisease(endpoint, '&_sort=sickCd&order=DESC&_limit=5'), endpoint);
    }
  }, 1000);

  const addSearchHistory = (clickWord) => {
    const isExistedSearchHistory = searchHistory.find((resentSearch) => resentSearch === clickWord);
    if (isExistedSearchHistory) {
      setSearchHistory((prev) => [
        clickWord,
        ...prev.filter((resentSearch) => resentSearch !== clickWord),
      ]);
    } else {
      setSearchHistory((prev) => [clickWord, ...prev]);
    }
  };

  // 추천 검색어 기능
  useEffect(() => {
    if (data === null) return;
    setRecommendWordList(data);
  }, [data]);

  return (
    <div>
      <label>
        {/* <input type='text' onChange={debouncedChangeSearchWord} onKeyDown={handleKeyDown} /> */}
        <input type='text' onChange={debouncedChangeSearchWord} />
      </label>
      <div>
        <p>추천 검색어</p>
        {isEmptyArray(recommendWordList) ? (
          <p>검색어 없음</p>
        ) : (
          <div id='recommend-word-list'>
            {recommendWordList?.map((word, idx) => (
              <div
                onClick={() => addSearchHistory(word.sickNm)}
                // isFocus={selectedIdx === idx ? true : false}
                id={`recommend-word-${idx}`}
                className={selectedIdx === idx ? 'selected' : ''}
                key={idx}
              >
                <p>{word.sickNm}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <p>최근 검색어</p>
        {searchHistory.map((result, idx) => (
          <div key={idx}>{result}</div>
        ))}
      </div>
    </div>
  );
}
