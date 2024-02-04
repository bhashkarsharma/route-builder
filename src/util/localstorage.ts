export const readFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (!value) return;

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export const writeToLocalStorage = (key: string, val: unknown) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
