/**
 * * Using this hook to set and get items from local storage with optimzation.
 */

import { useCallback, useEffect, useState } from "react";

/**
 * @function useLocalStorage
 * @description Hook that is type generic and mimics the behavior of
 * useState Hook.
 * @returns an array of value of the provided key and [default value] and
 * a write function that sets the value of the provided key.
 */
function useLocalStorage<T = string>(
  key: string,
  defaultValue: T,
  // eslint-disable-next-line no-unused-vars
): [T, (valueToSet: T) => void] {
  const getLocalStorageValue = useCallback(() => {
    if (typeof window === "undefined" || !("localStorage" in window)) {
      return (defaultValue ?? "") as T;
    }
    const readValue = window.localStorage.getItem(key);
    return readValue !== null
      ? JSON.parse(readValue)
      : ((defaultValue ?? "") as T);
  }, [key, defaultValue]);

  const [value, setValue] = useState<T>(getLocalStorageValue());

  const setLocalStorageValue = useCallback(
    (valueToSet: T) => {
      try {
        const newValue = valueToSet instanceof Function ? valueToSet(value) : valueToSet;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setValue(valueToSet);
        window.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, value],
  );

  useEffect(() => {
    setValue(getLocalStorageValue());
  }, [setValue, getLocalStorageValue]);

  return [
    value === undefined ? ((defaultValue ?? "") as T) : value,
    setLocalStorageValue,
  ];
}

export default useLocalStorage;
