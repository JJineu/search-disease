const useDebounce = (func, delay = 500) => {
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

export default useDebounce;
