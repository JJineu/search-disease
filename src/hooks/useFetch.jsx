/* eslint-disable */

import { useEffect, useReducer } from 'react';
import { STATUS } from '../constants';
import useCache from '../hooks/useCache';
import { isEmptyArray } from '../utils';

export default function useFetch(callback, endpoint, expireTime = 50000) {
  const [{ data, isLoading, error }, dispatch] = useReducer(useFetchReducer, {
    isLoading: false,
    error: null,
    data: null,
  });
  const { cacheData, getCachedData } = useCache();

  const fetchData = async (callback, endpoint, expireTime = 50000) => {
    try {
      if (!(callback || endpoint)) return;
      dispatch({ type: STATUS.LOADING });

      const cachedData = getCachedData(endpoint, expireTime);
      if (isEmptyArray(cachedData)) {
        console.info('calling api');
        const callbackData = await callback();
        dispatch({ type: STATUS.SUCCESS, data: callbackData });
        cacheData(endpoint, callbackData, expireTime);
      } else {
        dispatch({ type: STATUS.SUCCESS, data: cachedData });
      }
    } catch (error) {
      dispatch({ type: STATUS.ERROR, error });
    }
  };

  //   dispatch({ type: STATUS.IDLE });

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
        ...state,
        isLoading: true,
        error: null,
        // data: null,
      };
    case STATUS.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        // data: null,
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
