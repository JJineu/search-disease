import { DEBOUNCE } from '../constants';

export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0;
}

export function isEmptyArray(arr) {
  return Array.isArray(arr) && arr.length === 0;
}

export const debounce = (func, delay = DEBOUNCE.DEFAULT_TIME) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
