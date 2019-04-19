import {Component, OnInit} from '@angular/core';
import {Alarm, RpiService} from '../../services/rpi.service';
import {isArrayLike} from 'rxjs/internal-compatibility';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-alarms',
    templateUrl: './alarms.page.html',
    styleUrls: ['./alarms.page.scss'],
})
export class AlarmsPage implements OnInit {
    alarms: Alarm[] | undefined;
    error: string | undefined;

    // constructor() {
    constructor(private rpiService: RpiService) {
    }

    ngOnInit() {
        console.log('Test');
        (async () => {
            (await this.rpiService.getAlarms())
                .subscribe((res) => {
                    this.alarms = res as Array<Alarm>;
                    console.log('res');
                    console.log(res);
                    console.log(this.alarms[0]);
                    if (isArrayLike(res)) {
                        console.log(res[0]);

                    }


                }, (err: HttpErrorResponse) => {

                    console.log(err.message);
                    this.error = err.message;
                    console.log(this.error);
                });
            //     .map(this.handleData);
        })();
    }


    changeAlarm(i: number) {
        (async () => {
            if (this.alarms) {
                if (this.alarms[i]) {
                    (await this.rpiService.switchAlarm(i, !this.alarms[i].on))
                        .subscribe((res) => {
                            this.alarms = res as Array<Alarm>;
                            console.log('res');
                            console.log(res);
                            console.log(this.alarms[0]);
                            if (isArrayLike(res)) {
                                console.log(res[0]);

                            }


                        }, (err: HttpErrorResponse) => {

                            console.log(err.message);
                            this.error = err.message;
                            console.log(this.error);
                        });
                }
            }
        })();

    }

}
