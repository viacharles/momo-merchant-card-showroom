import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem<T>(key: string): T | null {
    if (!this.isBrowserStorageAvailable()) {
      return null;
    }

    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return null;
    }

    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isBrowserStorageAvailable()) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  private isBrowserStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
