import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {RpiService} from '../services/rpi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  host: string|undefined;
  hostinput: string;

  constructor(private storage: Storage, private rpiService: RpiService) {
    this.host = '';
    this.hostinput = '';
  }

  ngOnInit() {
    this.getHost();

  }

  getHost() {
    this.rpiService.getHost().then((val: string) => {
      this.hostinput = val;
      this.host = val;
    });
  }
}
