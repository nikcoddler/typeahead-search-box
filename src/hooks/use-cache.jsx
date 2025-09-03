import { useRef } from "react";

const getCurrentTimeStamp = () => Math.floor(Date.now() / 1000);

const useCache = (key, expireInSecond) => {
  const cache = useRef(JSON.parse(localStorage.getItem(key)) || {});
  const setCache = (query, data) => {
    const timestamp = getCurrentTimeStamp();

    cache.current[query] = { data, timestamp };
    localStorage.setItem(key, JSON.stringify(cache.current));
  };

  const getCache = (query) => {
    const cachedData = cache.current[query];

    if (cachedData) {
      const { data, timestamp } = cachedData;

      if (getCurrentTimeStamp() - timestamp < expireInSecond) {
        return data;
      } else {
        delete cache.current[query];

        localStorage.setItem(key, JSON.stringify(cache.current));
      }
    } else {
      return null;
    }
  };

  return { setCache, getCache };
};

export default useCache;
