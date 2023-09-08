# Search disease

# 💡 프로젝트 개요

질병명 검색 및 검색어 추천을 구현한 웹 프로젝트입니다.

- 진행 기간: 약 4일(2023.09.05 ~ 2023.09.08)

- 개발 인원 : 1인 [@김현진](https://github.com/JJineu)

- 배포 주소 : [https://search-disease.vercel.app/](https://search-disease.vercel.app/)

<br>

※ 개발 과정은 Notion으로 정리했습니다.

- [Notion](https://www.notion.so/ongoingjin/week-03-like-react-query-7ace65753c054860b957115aff724363)

※ 개인 과제를 바탕으로 팀 과제를 진행했습니다. (2023.09.08 ~ 2023.09.09)

- [팀 Domain](https://pre-onboarding-12th-3-2.vercel.app/)
- [팀 과제 Git](https://github.com/wanted-internship-team/pre-onboarding-12th-3-2)
- [팀 Notion](https://www.notion.so/somtha/3-ea1ca1bd81884f4ca676c62905617284)

<br>

주요 구현 사항

- 검색어 캐싱 기능

- 키보드 이벤트 기능

- 디바운스

<br>
<br>
<img src='https://github.com/JJineu/search-disease/assets/96639305/38c1b35c-4be4-4274-89ad-8b511caf0d78'>

<br>
<br>
# 🧑🏻‍💻 프로젝트 정보

### 실행 방법

- 다음 링크를 클릭하시거나, [https://search-disease.vercel.app/](https://search-disease.vercel.app/)

- 프로젝트를 clone 하여 실행할 수 있습니다.

  ```jsx
  // 실행하기 위해서는 Node.js가 설치된 환경이 필요합니다.
  git clone https://github.com/JJineu/search-disease.git
  npm install
  npm start
  ```

  ```jsx
  // .env 설정이 필요합니다.
  REACT_APP_BASE_URL=https://json-server-ruddy-gamma.vercel.app
  ```

### 프로젝트 구조

```jsx
src
 ┣ 📂 apis        네트워크 저장소 api 호출관련 로직
 ┣ 📂 components  컴포넌트 분리
 ┣ 📂 constants   상수 처리
 ┣ 📂 context
 ┣ 📂 hooks       커스텀 훅
 ┣ 📂 pages
 ┗ 📂 utils

```

### 개발 환경 및 사용기술

- JavaScript / React
- HTTP Client: fetch

```jsx
// dependencies
    "json-server": "^0.17.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
// devDependencies
    "concurrently": "^8.2.1",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^14.0.1",
    "prettier": "^3.0.3",
    "react-icons-kit": "^2.0.0",
    "styled-components": "^6.0.7"
```

<br>
<br>

# 📝 구현 상세 내용

## 1. API 호출을 줄이기 위한 전략 - 디바운스

input 입력 마다 api가 호출되어, 의미 없는 검색어 호출이 잦았습니다. <br>
debounce와 throttle 전략이 있었고, 유저의 입력에 반응적인 debounce가 적합하다고 생각했습니다.

기존의 debounce 로직은 input의 value를 전달해, debounce한 값을 반환하는 방식이었습니다.

이벤트가 발생할 때마다 useDebounce 훅이 호출되고, useEffect는 value 값에 의존하고 있으므로, timer 가 초기화되고 새로운 timer가 설정됩니다. 그래서 마지막 이벤트 호출이 있을 때만 setState를 하게 됩니다. <br>

```jsx
import React, { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

위와 같은 방식은 Input 입력이 일어날 때마다 기존 페이지가 계속 리렌더링이 일어납니다. 그래서 value 대신 callback을 반환하는 디바운스 함수를 만들었습니다.

```jsx
export const debounce = (func, delay = DEBOUNCE.DEFAULT_TIME) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
```

input의 onChange 이벤트 핸들러로 debouncedChangeSearchWord를 참조하도록 했고, Input 이벤트가 발생했을 때 debounce에 전달되는 콜백이 디바운스되어 실행되도록 했습니다.

```jsx
const debouncedChangeSearchWord = useDebounce((e) => {
  fetchData(() => searchDisease(searchWord), searchWord);
}, 800);
```

## 2. 키보드 이벤트 처리

key 프로퍼티의 ArrowDown, ArrowUp와 keydown 이벤트로 리스트 내에서 이동하는 부분을 구현했습니다. 리스트의 인덱스 값과 selectedIndex 값을 비교하여 리스트의 ref값을 포커싱하도록 구현했습니다.<br>

키보드 이벤트가 랜덤하게 두 번씩 일어나는 경우가 있었는데, 결론은 한글 인코딩의 문제였습니다. 한글 특성상 다른 문자들과 달리 자음 모음이 합쳐져 한 글자가 완성되는데, 완전한 한 글자를 인식하는 부분이 리액트에는 반영되지 않았습니다.

그래서 nativeEvent의 isComposing 프로퍼티로 글자를 조합 중인 경우 return 하도록 설정했습니다.

```jsx
const selectListItemByKeyArrow = (e) => {
  if (e.nativeEvent.isComposing) return;
  switch (e.key) {
    case 'ArrowDown': {
      const lastIndex = data.length - 1;
      setSelectedIndex((prev) => (prev < lastIndex ? prev + 1 : 0));
      break;
    }
    case 'ArrowUp': {
      const lastIndex = data.length - 1;
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : lastIndex));
      break;
    }
    default:
      break;
  }
};
```

또한 검색된 데이터가 많을 경우 스크롤이 생겼는데, 키보드 이벤트로 리스트 아이템들을 접근하는 경우 scroll과 충돌이 있었습니다.

그래서 이벤트 실행 시점에 `e.preventDefault()` 를 추가해 브라우저의 다른 기본 이벤트들을 막았습니다.

## 3. API 호출별 캐싱 기능

캐싱 시점, 캐싱 저장소, 캐싱 저장 방식에 대해 고민했습니다.<br>

기존에는 fetch와 cache 처리 부분이 비동기 호출이기 때문에 각자 data, error, loading 상태를 관리하고 있었습니다. 그런데, 유저는 api를 호출할 때 캐싱된 데이터인지 아닌지 설정할 필요가 없고 내부로직에서 처리만 해야된다는 것을 깨달았습니다. 그래서 useFetch의 로직에 캐싱 여부를 확인하는 코드를 넣었습니다.

요구 사항은 로컬 캐싱을 구현하는 것이었습니다. 클라이언트에서 캐싱 처리를 하는 것 중 가장 빠른 것은 다른 저장소를 사용하지 않는 것이라 생각해 리액트 상태로 관리했습니다.

아래가 해당 시점까지의 fetch 로직 입니다.

```jsx
const fetch = async () => {
  try {
    if (!(callback || endpoint)) return;
    dispatch({ type: STATUS.LOADING });

    const cachedData = getCachedData(key, expireTime);
    if (cachedData) {
      dispatch({ type: STATUS.SUCCESS, data: cachedData.value });
    } else {
      console.info('calling api');
      const data = await callback();
      dispatch({ type: STATUS.SUCCESS, data });
      cacheData(endpoint, data, expireTime);
    }
  } catch (error) {
    dispatch({ type: STATUS.ERROR, error });
  }
};
```

저장해야 되는 데이터가 많아지면서 메모리가 낭비된다는 생각을 했습니다. 먼저 고민했던 것은, cachedData 상태를 일정 시점마다 확인하여 데이터를 비워주는 것이었습니다. cron의 스캐줄링 기능처럼 useInterval 같은 인터럽트를 실행해 배열을 순회해야 될지, 그렇다면 저장 방식은 배열이 아니라 해시를 사용해야 될지 였습니다.

이후 브라우저 저장소를 살펴봤습니다. local storage, session storage, indexDB, cache storage 중 데이터 저장을 많이 할 수 있는, 그래서 직접 데이터 양을 관리하지 않아도 되는 cache storage를 사용했습니다.

기존의 코드가 꽤 추상화가 되어, cacheData 를 처리하는 부분에 함수만 바꿔서 useFetch 로직을 업데이트 하였고, cacheStorage 와 관련된 로직은 아래와 같이 구현했습니다.

```jsx
/**
 * @param {string} keyword
 * @param {Array} data
 * @param {number} expireTime
 */
export async function setToCacheStorage(keyword, data, expireTime = CACHE.DEFAULT_EXPIRE_TIME) {
  const expirationTime = new Date().getTime() + expireTime;
  const res = { data, expirationTime };
  const clonedResponse = new Response(JSON.stringify(res));

  try {
    await cacheStorage.put(keyword, clonedResponse);
  } catch (error) {
    console.error('Error while setting data from cache:', error);
  }
}

/**
 * @param {string} keyword
 * @returns {Array}
 */
export async function getFromCacheStorage(keyword) {
  try {
    const response = await cacheStorage.get(keyword);

    if (!(response && response.ok)) {
      return [];
    }
    const res = await response.json();

    if (res.expirationTime > new Date().getTime()) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.error('Error while getting data from cache:', error);
    return [];
  }
}
```

이렇게 저장소를 바꾸더라도 기본 로직이 크게 변하지 않아도 된다는 이점을 꺠달아, 원래의 http와 storage 로직을 class 형태로 인스턴스화 했습니다.

```jsx
class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  fetch(url, options = {}) {
    return window.fetch(`${this.baseURL}${url}`, {
      ...options,
    });
  }
}

class CacheStorage {
  constructor(KEY) {
    this.KEY = KEY;
    this.cachePromise = caches.open(this.KEY);
  }
  async put(url, response) {
    const cache = await this.cachePromise;
    await cache.put(url, response);
  }

  async get(url) {
    const cache = await this.cachePromise;
    return await cache.match(url);
  }
}
```
