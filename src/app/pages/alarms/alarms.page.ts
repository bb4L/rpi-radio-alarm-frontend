import {Component, OnInit} from '@angular/core';
import {Alarm, RpiService} from '../../services/rpi.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-alarms',
    templateUrl: './alarms.page.html',
    styleUrls: ['./alarms.page.scss'],
})
export class AlarmsPage implements OnInit {
    alarms: Alarm[] | undefined;
    error: string | undefined;

    constructor(private rpiService: RpiService, private loadingController: LoadingController) {
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

    changeAlarm(i: number) {
        (async () => {
            if (this.alarms) {
                if (this.alarms[i]) {
                    this.presentLoading('Sending Change');
                    (await this.rpiService.switchAlarm(i, !this.alarms[i].on))
                        .subscribe((res) => {
                            this.alarms = res as Array<Alarm>;
                            this.loadingController.dismiss();

                        }, (err: HttpErrorResponse) => {
                            this.error = err.message;
                        });
                }
            }
        })();

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
}
