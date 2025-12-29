//Saves and loads app data locally using Capacitor Preferences
//Used for: Measurement units and favourite recipes
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable ({ providedIn: 'root' })
export class StoreService {
  //Get saved measurement preference
  //If nothing saved yet, default to 'metric' 
  private readonly MEASURMENT_KEY = 'measurement';
  private readonly FAVOURITES_KEY = 'favourites';
  private readonly RECENT_KEY = 'recentSearches';

    //Get saved measurement preference
    async getMeasurement(): Promise<'metric' | 'us'> {
        const  { value } = await Preferences.get({ key: this.MEASURMENT_KEY});
          return (value as 'metric' | 'us') ?? 'metric';
  }

  //Save measurement preference
  async setMeasurement(m: 'metric' | 'us'): Promise<void> {
    await Preferences.set({ key: this.MEASURMENT_KEY, value: m});
  }

  //Get saved favourite recipes. If nothing saved yet, return empty array
  async getFavourites(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.FAVOURITES_KEY });
    return value ? JSON.parse(value) : [];
  }
  
  //Save favourite recipes list as JSON
  async setFavourites(favs: any[]): Promise<void> {
    await Preferences.set({ 
      key: this.FAVOURITES_KEY, 
      value: JSON.stringify(favs) 
    });
  }

// Get the last 5 searches (returns [] if none saved yet)
  async getRecentSearches(): Promise<string[]> {
  const { value } = await Preferences.get({ key: this.RECENT_KEY });
  return value ? JSON.parse(value) : [];
}

// Save the searches list
async setRecentSearches(items: string[]): Promise<void> {
  await Preferences.set ({ key: this.RECENT_KEY, value: JSON.stringify(items) });
}    
  }
  
