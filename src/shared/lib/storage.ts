type StorageValue = string | null;

const memoryStorage = new Map<string, string>();

function getBackingStore() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return {
      getItem: async (key: string): Promise<StorageValue> => window.localStorage.getItem(key),
      removeItem: async (key: string) => window.localStorage.removeItem(key),
      setItem: async (key: string, value: string) => window.localStorage.setItem(key, value),
    };
  }

  return {
    getItem: async (key: string): Promise<StorageValue> => memoryStorage.get(key) ?? null,
    removeItem: async (key: string) => {
      memoryStorage.delete(key);
    },
    setItem: async (key: string, value: string) => {
      memoryStorage.set(key, value);
    },
  };
}

export const appStorage = {
  async clear(key: string) {
    const store = getBackingStore();
    await store.removeItem(key);
  },
  async get<T>(key: string): Promise<T | null> {
    const store = getBackingStore();
    const value = await store.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  },
  async set<T>(key: string, value: T) {
    const store = getBackingStore();
    await store.setItem(key, JSON.stringify(value));
  },
};
