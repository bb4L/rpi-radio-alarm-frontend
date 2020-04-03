import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Alarm, RpiService} from '../../services/rpi.service';
import {HelperService} from '../../services/helper/helper.service';

@Component({
    selector: 'app-alarm-detail',
    templateUrl: './alarm-detail.page.html',
    styleUrls: ['./alarm-detail.page.scss'],
})
export class AlarmDetailPage implements OnInit {
    alarm: Alarm | undefined;

    constructor(public activatedRoute: ActivatedRoute, private helper: HelperService, private rpiService: RpiService) {
    }

    ngOnInit() {
        const dataobj = this.activatedRoute.snapshot.paramMap.get('alarm');
        if (dataobj) {
            this.alarm = JSON.parse(dataobj);
        }
    }

    async saveAlarm() {
        if (this.alarm) {
            if (typeof (this.alarm.days) === 'string') {
                const days = this.alarm.days as string;
                this.alarm.days = days.split(',').map(function (item) {
                    return parseInt(item, 10);
                }).filter(value => {
                    return !Number.isNaN(value);
                });
            }

            if (this.alarm.idx) {
                await this.helper.presentLoading('Changing Alarm');
                (await this.rpiService.changeAlarm(this.alarm)).subscribe((result) => {
                    if (typeof result === 'string') {
                        this.alarm = JSON.parse(result);
                    }
                    this.helper.hideLoading();
                });
            } else {
                await this.helper.presentLoading('Create Alarm');
                if (!this.alarm.on) {
                    this.alarm.on = false;
                }
                (await this.rpiService.createAlarm(this.alarm)).subscribe((result) => {
                    if (typeof result === 'string') {
                        this.alarm = JSON.parse(result);
                    }
                    this.helper.hideLoading();
                });
            }
        }
    }
}
