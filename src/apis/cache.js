import { CACHE } from '../constants';
import { cacheStorage } from './config';

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
