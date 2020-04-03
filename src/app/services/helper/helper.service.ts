import {Injectable} from '@angular/core';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    constructor(private loadingController: LoadingController, private alertController: AlertController,
                private toastController: ToastController) {
    }

    async presentLoading(message: string) {
        const loading = await this.loadingController.create({
            message: message,
            duration: 8000
        });
        await loading.present();
    }

    async hideLoading() {
        await this.loadingController.dismiss();
    }

    async presentAlert(message: object) {
        const alert = await this.alertController.create(message);
        await alert.present();
    }

    async loadingShowing() {
        const top = await this.loadingController.getTop();
        console.log('top');
        console.log(top);
        return !!top;
    }

    async exitApp() {
        // @ts-ignore
        navigator['app'].exitApp();
    }

    presentExitToast(msg: string, platform: Platform) {
        const subevent = platform.backButton.subscribeWithPriority(1000, this.exitApp);
        this.presentToast(msg).then(() => {
            subevent.unsubscribe();
        });

    }

    async presentToast(msg: string) {
        try {

            const toast = await this.toastController.create({
                message: msg,
                duration: 2000
            });
            toast.present();
        } catch (e) {
            console.log(e);
        }
    }
}
