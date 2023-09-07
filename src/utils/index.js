export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0;
}

export function isEmptyArray(arr) {
  return Array.isArray(arr) && arr.length === 0;
}

export const debounce = (func, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(null, args);
    }, delay);
  };
};
