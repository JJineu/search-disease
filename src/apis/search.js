import { httpClient } from './config';

export const searchDisease = async (endpoint, options = '') => {
  const response = await httpClient.fetch(`sick?q=${endpoint}${options}`);
  const res = await response.json();
  return res;
};
