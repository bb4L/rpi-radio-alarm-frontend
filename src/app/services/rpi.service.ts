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
        return this.http.get<Alarm[]>(this.url + 'alarm');
    }

    async switchAlarm(i: number, turnOff: boolean) {
        await this.beforeApiCall();
        const url = this.url + 'alarm/' + i;
        if (turnOff) {
            return this.http.put(url, {'on': 'false'});
        } else {
            return this.http.put(url, {'on': 'true'});
        }
    }

    async deleteAlarm(index: number) {
        await this.beforeApiCall();
        return this.http.delete(this.url + 'alarm/' + index);
    }

    async createAlarm(alarm: any) {
        await this.beforeApiCall();
        const url = this.url + 'alarm/';
        return this.http.post(url, alarm);
    }

    getHost() {
        return this.storage.get('rpi-alarm-clock');
    }

    setHost(value: string) {
        this.init_done = false;
        return this.storage.set('rpi-alarm-clock', value);
    }

}
