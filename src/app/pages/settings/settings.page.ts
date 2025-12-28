import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StoreService } from 'src/app/services/store.service';

@Component({
  standalone: true,
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  imports: [CommonModule, IonicModule],
})

export class SettingsPage {
  measurement: 'metric' | 'us' = 'metric';

constructor(private store: StoreService) { }

async ionViewWillEnter() {
  this.measurement = await this.store.getMeasurement();
}

async changeMeasurement(value: 'metric' | "us") {
  this.measurement = value;
  await this.store.setMeasurement(value);
  }
}