import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable ({ providedIn: 'root' })
export class StoreService {
    async getMeasurement(): Promise<'metric' | 'us'> {
        const  { value } = await Preferences.get({ key: 'measurement'});
          return (value as 'metric' | 'us') ?? 'metric';
  }

  async setMeasurement(m: 'metric' | 'us'): Promise<void> {
    await Preferences.set({ key: 'measurement', value: m});
  }

  async getFavourites(): Promise<any[]> {
    const { value } = await Preferences.get({ key: 'favourites'});
    return value ? JSON.parse(value) : [];
  }

  async setFavourites(favs: any[]): Promise<void> {
    await Preferences.set({ key: 'favourites', value: JSON.stringify(favs) });
  }

    }
