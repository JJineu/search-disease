import { useEffect, useReducer } from 'react';
import { STATUS } from '../constants';
import { isEmptyArray } from '../utils';
import { setToCacheStorage, getFromCacheStorage } from '../apis/cache';

export default function useFetch(callback, endpoint, expireTime = 50000) {
  const [{ data, isLoading, error }, dispatch] = useReducer(useFetchReducer, {
    isLoading: false,
    error: null,
    data: null,
  });

  const fetchData = async (callback, endpoint, expireTime = 50000) => {
    try {
      if (!(callback || endpoint)) return;
      dispatch({ type: STATUS.LOADING });

      const cachedData = await getFromCacheStorage(endpoint, expireTime);
      if (isEmptyArray(cachedData)) {
        console.info('calling api');
        const callbackData = await callback();
        dispatch({ type: STATUS.SUCCESS, data: callbackData });
        setToCacheStorage(endpoint, callbackData, expireTime);
      } else {
        dispatch({ type: STATUS.SUCCESS, data: cachedData });
      }
    } catch (error) {
      dispatch({ type: STATUS.ERROR, error });
    }
  };

  useEffect(() => {
    fetchData(callback, endpoint, expireTime);
  }, [callback, endpoint, expireTime]);

  return { data, isLoading, error, fetchData };
}

const useFetchReducer = (state, action) => {
  switch (action.type) {
    case STATUS.IDLE:
      return {
        isLoading: false,
        error: null,
        data: null,
      };
    case STATUS.LOADING:
      return {
        data: null,
        isLoading: true,
        error: null,
      };
    case STATUS.ERROR:
      return {
        data: null,
        isLoading: false,
        error: action.error,
      };
    case STATUS.SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    default:
      throw new Error(`[useFetch] ${action.type} is not valid`);
  }
};
