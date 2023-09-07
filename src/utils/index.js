export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0;
}

export function isEmptyArray(arr) {
  return Array.isArray(arr) && arr.length === 0;
}

export function isKoreanWord(input) {
  const koreanPattern = /^[가-힣]+$/;
  return koreanPattern.test(input);
}

export const debounce = (func, delay = 500) => {
  let timer;
  return (...args) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};
