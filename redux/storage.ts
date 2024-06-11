import createWebStorage from "redux-persist/lib/storage/createWebStorage";

interface NoopStorage {
  getItem: (_key: string) => Promise<null>;
  setItem: (_key: string, value: any) => Promise<any>;
  removeItem: (_key: string) => Promise<void>;
}

const createNoopStorage = (): NoopStorage => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage: NoopStorage | ReturnType<typeof createWebStorage> = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
