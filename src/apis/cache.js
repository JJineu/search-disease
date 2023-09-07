import { cacheStorage } from './config';

export async function setToCacheStorage(searchWord, response, expireTime) {
  const res = { expireTime, data: response, timestamp: new Date().getTime() };
  const clonedResponse = new Response(JSON.stringify(res));
  await cacheStorage.put(searchWord, clonedResponse);

  return;
}

export async function getFromCacheStorage(searchWord) {
  try {
    const response = await cacheStorage.get(searchWord);

    if (!(response && response.ok)) {
      return [];
    }
    const res = await response.json();

    const currentTime = new Date().getTime();
    const cachedTime = res.timestamp;
    const timeDiff = currentTime - cachedTime;

    if (timeDiff <= res.expireTime) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.error('Error while getting data from cache:', error);
    return [];
  }
}
