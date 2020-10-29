import {Component, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HostData, RpiService} from '../services/rpi.service';
import {HelperService} from '../services/helper/helper.service';
import {IonRouterOutlet, Platform} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  host: string | undefined;
  hostinput: string;
  hostData: HostData | undefined;
  subscription: any;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet | undefined;

  constructor(private storage: Storage,
              private rpiService: RpiService,
              public helper: HelperService,
              private platform: Platform
  ) {
    this.host = '';
    this.hostinput = '';
    this.platform.backButton.subscribeWithPriority(1, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      }
    });
  }

  ionViewWillEnter() {
    this.getHost();
  }


  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(() => {
      // @ts-ignore
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

  getHost() {
    this.rpiService.getHost().then((val: string) => {
      this.hostinput = val;
      this.host = val;
      this.hostData = JSON.parse(val);
    });
  }

}
