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
