import { PATH } from '../constants';
import { httpClient } from './config';

export const searchDisease = async (keyword) => {
  const response = await httpClient.fetch(`${PATH.SICK}?q=${keyword}`);
  return await response.json();
};
