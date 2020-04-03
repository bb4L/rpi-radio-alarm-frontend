import {Component} from '@angular/core';
import {Alarm, RpiService} from '../../services/rpi.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HelperService} from '../../services/helper/helper.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-alarms',
    templateUrl: './alarms.page.html',
    styleUrls: ['./alarms.page.scss'],
})
export class AlarmsPage {
    alarms: Alarm[] | undefined;
    error: string | undefined;
    loading = false;

    constructor(private rpiService: RpiService, public helper: HelperService, public router: Router) {
    }

    ionViewWillEnter() {
        this.loading = true;
        (async () => {
            this.getAlarms();
        })();
    }

    async getAlarms() {
        this.loading = true;
        await this.helper.presentLoading('Loading Alarms');
        (await this.rpiService.getAlarms())
            .subscribe((res) => {
                this.alarms = res as Array<Alarm>;
                this.alarms.forEach((alarm, index) => {
                    alarm.idx = index;
                });
                (async () => {
                    await this.helper.hideLoading();
                })();
                this.loading = false;
            }, (err: HttpErrorResponse) => {
                this.error = err.message;
            });
    }

    doRefresh(event: any) {
        this.loading = true;
        (async () => {
            if (event) {
                try {
                    event.target.complete();
                } catch (e) {
                }
            }
            await this.getAlarms();
        })();
    }

    async showDelete(index: number) {
        await this.helper.presentAlert({
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

    showDetail(alarm: Alarm) {
        this.router.navigate(['alarm-detail', JSON.stringify(alarm)]);
    }

    newAlarm() {
        const alarm = {} as Alarm;
        this.router.navigate(['alarm-detail', JSON.stringify(alarm)]);
    }

    async saveAlarm(alarm: Alarm) {
        if (!this.loading) {
            await this.helper.presentLoading('Switch Alarm');
            (await this.rpiService.changeAlarm(alarm)).subscribe((res) => {
                this.helper.hideLoading();
            });
        }
    }

    async switchAlarm(alarm: Alarm) {
        alarm.on = !alarm.on;
        await this.saveAlarm(alarm);
    }
}
