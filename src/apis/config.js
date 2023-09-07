class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  fetch(url, options = {}) {
    return window.fetch(`${this.baseURL}${url}`, {
      ...options,
    });
  }
}

export const httpClient = new HttpClient(process.env.REACT_APP_BASEURL);

class CacheStorage {
  constructor(KEY) {
    this.KEY = KEY;
    this.cachePromise = caches.open(this.KEY);
  }
  async put(url, response) {
    const cache = await this.cachePromise;
    await cache.put(url, response);
  }

  async get(url) {
    const cache = await this.cachePromise;
    return await cache.match(url);
  }
}

const KEY = 'disease';
export const cacheStorage = new CacheStorage(KEY);
