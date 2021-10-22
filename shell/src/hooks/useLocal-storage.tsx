import { useState, useEffect } from "react";

const getFromStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const setStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(getFromStorage(key) || defaultValue);

  useEffect(() => {
    setStorage(key, state);
  }, [key, state]);

  return [state, setState] as const;
};

export default useLocalStorage;
