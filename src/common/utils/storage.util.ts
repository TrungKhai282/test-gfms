export const setLocalStorage = (key: string, data: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, data);
  }
};
export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }

  return undefined;
};
export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(key);
  }
};
