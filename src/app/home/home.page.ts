import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  host: string|undefined;
  hostinput: string;

  constructor(private storage: Storage) {
    this.host = '';
    this.hostinput = '';
  }

  ngOnInit() {
    this.storage.get('rpi-alarm-clock').then((val: string) => {
      this.hostinput = val;
      this.host = val;
    });
  }

  setHost() {
    this.storage.set('rpi-alarm-clock', this.hostinput);
    this.host = this.hostinput;
  }

  deleteStorage() {
    this.storage.clear();
    this.host = undefined;
  }
}
