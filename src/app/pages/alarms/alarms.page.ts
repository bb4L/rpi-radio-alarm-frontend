import {Component, OnInit} from '@angular/core';
import {Alarm, RpiService} from '../../services/rpi.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-alarms',
    templateUrl: './alarms.page.html',
    styleUrls: ['./alarms.page.scss'],
})
export class AlarmsPage implements OnInit {
    alarms: Alarm[] | undefined;
    error: string | undefined;

    constructor(private rpiService: RpiService, private loadingController: LoadingController, private alertController: AlertController) {
    }

    ngOnInit() {
        this.getAlarms();
    }

    async getAlarms() {
        await this.presentLoading('Loading Alarms');
        (await this.rpiService.getAlarms())
            .subscribe((res) => {
                this.alarms = res as Array<Alarm>;
                console.log('alarms ready');
                this.loadingController.dismiss();

            }, (err: HttpErrorResponse) => {
                this.error = err.message;
            });
    }

    async changeAlarm(event: any, i: number) {
            if (this.alarms) {
                if (this.alarms[i]) {
                    const turnOn = this.alarms[i]['on'].valueOf();

                    await this.presentLoading('Setting on =' + turnOn);
                    (await this.rpiService.switchAlarm(i, !turnOn))
                        .subscribe((res) => {
                            this.loadingController.dismiss();
                        }, (err: HttpErrorResponse) => {
                            this.error = err.message;
                        });
                }
            }
    }

    async presentLoading(message: string) {
        const loading = await this.loadingController.create({
            message: message,
            duration: 8000
        });
        await loading.present();
    }

    doRefresh(event: any) {
        (async () => {
            event.target.complete();
            await this.getAlarms();
        })();

    }

    async showDelete(index: number) {
        await this.presentAlert({
            header: 'Delete',
            subHeader: 'Alarm with index ' + index,
            message: 'Do you Really want to Delete this Alarm?',
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary'
            }, {
                text: 'Delete',
                cssClass: 'danger',
                handler: async () => {
                    (await this.rpiService.deleteAlarm(index)).subscribe(resp => {
                        this.alarms = resp as Alarm[];
                    });
                }
            }]
        });

    }

    async presentAlert(message: object) {
        const alert = await this.alertController.create(message);
        await alert.present();
    }
}
