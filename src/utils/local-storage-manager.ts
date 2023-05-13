export enum STORAGE_KEYS {
  REFRESH_JWT = "refresh_jwt", // TO DO
  JWT = "jwt",
}

export class LocalStorageManager {
  public static setToLocalStorage(key: STORAGE_KEYS | string, value: any) {
    localStorage.setItem(key, value);
  }

  public static getFromLocalStorage<T>(key: STORAGE_KEYS | string): T | null {
    const data = localStorage.getItem(key);

    return data as T | null;
  }

  public static removeFromLocalStorage(key: STORAGE_KEYS | string) {
    localStorage.removeItem(key);
  }
}
