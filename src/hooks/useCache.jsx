import { useState } from 'react';

const useCache = () => {
  const [queries, setQueries] = useState([]); // queries = {key, value, expiretime, timestamp}[]

  const cacheData = (key, value, expireTime) => {
    setQueries((prev) => [
      ...prev.filter((query) => query.key !== key),
      { key, value, expireTime, timestamp: new Date().getTime() },
    ]);
  };

  const getCachedData = (key, expireTime) => {
    const cachedData = queries.find((query) => query.key === key);
    if (cachedData) {
      const currentTime = new Date().getTime();
      const cachedTime = cachedData.timestamp || 0;
      const timeDiff = currentTime - cachedTime;

      if (timeDiff <= expireTime) {
        return cachedData.value;
      }
    }
    return [];
  };

  return { cacheData, getCachedData };
};

export default useCache;
