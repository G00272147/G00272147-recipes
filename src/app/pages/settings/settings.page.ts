// Allows user to change measurement settings (metric or US)
// and saves the preference using StoreService so it persists after closing the app.
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StoreService } from 'src/app/services/store.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-settings',
  templateUrl: './settings.page.html',

  // RouterModule is required so routerLine buttons work in HTML
  imports: [CommonModule, IonicModule, RouterModule],
})

export class SettingsPage {
  // Stores selected measurement system (default is metric)
  measurement: 'metric' | 'us' = 'metric';

  // Inject StoreService to load/save measurement preference
constructor(private store: StoreService) { }

// Loads previously saved measurement preference when entering the page (metric if none saved)
async ionViewWillEnter() {
  this.measurement = await this.store.getMeasurement();
}

// Called when user changes measurement preference; saves new preference
async changeMeasurement(value: 'metric' | "us") {
  this.measurement = value;
  await this.store.setMeasurement(value);
  }
}