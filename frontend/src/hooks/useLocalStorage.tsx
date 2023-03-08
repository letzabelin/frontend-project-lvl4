import { useState } from 'react';

const useLocalStorage = <T, >(key: string, defaultValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      }

      localStorage.setItem(key, JSON.stringify(defaultValue));

      return defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } finally {
      setStoredValue(value);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
