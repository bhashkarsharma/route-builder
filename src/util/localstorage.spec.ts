import {
  readFromLocalStorage,
  removeFromLocalStorage,
  writeToLocalStorage,
} from './localstorage';

const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: unknown) {
      store[key] = String(value);
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('localStorageUtils', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('writeToLocalStorage should store a JSON string', () => {
    const key = 'testKey';
    const value = { a: 1 };
    writeToLocalStorage(key, value);

    expect(localStorageMock.getItem(key)).toEqual(JSON.stringify(value));
  });

  test('readFromLocalStorage should return an object for valid JSON', () => {
    const key = 'testKey';
    const value = { a: 1 };

    localStorageMock.setItem(key, JSON.stringify(value));

    const result = readFromLocalStorage(key);

    expect(result).toEqual(value);
  });

  test('readFromLocalStorage should return a string for non-JSON values', () => {
    const key = 'testKey';
    const value = 'non-JSON value';
    localStorageMock.setItem(key, value);
    const result = readFromLocalStorage(key);

    expect(result).toBe(value);
  });

  test('readFromLocalStorage should return undefined for non-existent keys', () => {
    const key = 'nonExistentKey';

    const result = readFromLocalStorage(key);

    expect(result).toBeUndefined();
  });

  test('removeFromLocalStorage should remove the item from localStorage', () => {
    const key = 'testKey';
    const value = { a: 1 };
    localStorageMock.setItem(key, value);

    removeFromLocalStorage(key);

    const result = localStorageMock.getItem(key);
    expect(result).toBeNull();
  });

  test('removeFromLocalStorage should not affect other items', () => {
    const key1 = 'testKey1';
    const value1 = { a: 1 };
    const key2 = 'testKey2';
    const value2 = { b: 2 };

    writeToLocalStorage(key1, value1);
    writeToLocalStorage(key2, value2);

    removeFromLocalStorage(key1);

    const result1 = localStorageMock.getItem(key1);
    const result2 = localStorageMock.getItem(key2);

    expect(result1).toBeNull();
    expect(result2).toEqual(JSON.stringify(value2));
  });

  test('removing a non-existent item should not throw', () => {
    const nonExistentKey = 'nonExistentKey';

    expect(() => removeFromLocalStorage(nonExistentKey)).not.toThrow();
  });
});
