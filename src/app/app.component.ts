import {Component, ViewChild} from '@angular/core';
import {IonRouterOutlet, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component(
    {
      selector: 'app-root',
      templateUrl: 'app.component.html'
    }
)
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Radio',
      url: '/radio',
      icon: 'radio'
    },
    {
      title: 'Alarms',
      url: '/alarms',
      icon: 'notifications-outline'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet | undefined;
  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }
}
