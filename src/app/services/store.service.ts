//Saves and loads app data locally using Capacitor Preferences
//Used for: Measurement units and favourite recipes
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable ({ providedIn: 'root' })
export class StoreService {
  //Get saved measurement preference
  //If nothing saved yet, default to 'metric' 
    async getMeasurement(): Promise<'metric' | 'us'> {
        const  { value } = await Preferences.get({ key: 'measurement'});
          return (value as 'metric' | 'us') ?? 'metric';
  }
  //Save measurement preference
  async setMeasurement(m: 'metric' | 'us'): Promise<void> {
    await Preferences.set({ key: 'measurement', value: m});
  }

  //Get saved favourite recipes. If nothing saved yet, return empty array
  async getFavourites(): Promise<any[]> {
    const { value } = await Preferences.get({ key: 'favourites'});
    return value ? JSON.parse(value) : [];
  }
  
  //Save favourite recipes list as JSON
  async setFavourites(favs: any[]): Promise<void> {
    await Preferences.set({ key: 'favourites', value: JSON.stringify(favs) });
  }

    }
