const useLocalStorage = () => {
  const setStorageItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };

  // eslint-disable-next-line arrow-body-style
  const getStorageItem = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  const deleteStorageItem = (key: string): void => {
    localStorage.removeItem(key);
  };

  return {
    setStorageItem,
    getStorageItem,
    deleteStorageItem,
  };
};

export default useLocalStorage;
