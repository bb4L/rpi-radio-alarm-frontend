import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';


export interface Alarm {
    name: string;
    on: boolean;
    min: number;
    days: number[];
    hour: number;
}

@Injectable({
    providedIn: 'root'
})
export class RpiService {
    url = '';
    obs: any;
    init_done = false;


    constructor(private http: HttpClient, private storage: Storage, private router: Router) {
    }


    handleStorageValue(value: any) {
        if (value == null) {
            this.router.navigateByUrl('/');
        } else {

            this.url = 'http://' + value + ':8001/';
            this.init_done = true;
        }

    }

    async getUrl() {
        return this.storage.get('rpi-alarm-clock').then((value) => {
            this.handleStorageValue(value);
        });
    }

    async beforeApiCall() {
        if (!this.init_done) {
            await this.getUrl();
        }
    }

    async getAlarms() {
        await this.beforeApiCall();
        return this.http.get<Alarm[]>(this.url + 'alarm/status');
    }

    async switchAlarm(i: number, changeToOn: boolean) {
        await this.beforeApiCall();
        if (changeToOn) {
            return this.http.post(this.url + 'alarm/turnon', {'Alarm': i});
        } else {
            return this.http.post(this.url + 'alarm/turnoff', {'Alarm': i});
        }
    }
}
