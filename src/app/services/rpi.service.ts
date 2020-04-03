import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';


export interface Alarm {
    idx: number;
    name: string;
    on: boolean;
    min: number;
    days: number[];
    hour: number;
}

export interface Radio {
    isPlaying: boolean;
}

export class HostData {
    https: boolean;
    host: string;
    port: number;
    extrapath: string;
    customHeader: string;
    customHeaderValue: string;

    constructor() {
        this.https = false;
        this.host = 'alsp.local';
        this.port = 80;
        this.customHeader = '';
        this.customHeaderValue = '';
        this.extrapath = '';
    }

}

@Injectable({
    providedIn: 'root'
})
export class RpiService {
    url = '';
    init_done = false;
    custom_header = false;
    custom_header_val = new HttpHeaders();
    cust_header_key = '';
    cust_header_val = '';
    private _headers = new HttpHeaders();

    constructor(private http: HttpClient, private storage: Storage, private router: Router) {
    }

    handleStorageValue(value: HostData) {
        if (value == null) {
            this.router.navigateByUrl('/');
        } else {
            this.url = 'https://' + value.host +':'+ value.port;
            if (value.extrapath.length > 0){
                this.url = 'https://' + value.host + ':' + value.port + '/' + value.extrapath + '/';
            }
            if(value.customHeader.length > 1 && value.customHeaderValue.length > 1) {
                this.custom_header = true;
                this.custom_header_val = this._headers.set(value.customHeader, value.customHeaderValue);
                this.cust_header_key = value.customHeader as string;
                this.cust_header_val = value.customHeaderValue as string;
            }
            this.init_done = true;
        }

    }

    async getUrl() {
        return this.storage.get('rpi-alarm-clock').then((value) => {
            this.handleStorageValue(JSON.parse(value) as HostData);
        });
    }

    async beforeApiCall() {
        if (!this.init_done) {
            await this.getUrl();
        }
    }

    async getAlarms() {
        await this.beforeApiCall();
        return this.http.get<Alarm[]>(this.url + 'alarm',  {headers : this.custom_header_val });
    }

    async switchAlarm(i: number, turnOff: boolean) {
        await this.beforeApiCall();
        const url = this.url + 'alarm/' + i;
        if (turnOff) {
            return this.http.put(url, {'on': false}, {headers: this.custom_header_val});
        } else {
            return this.http.put(url, {'on': true}, {headers: this.custom_header_val});
        }
    }

    async changeAlarm(alarm: Alarm) {
        await this.beforeApiCall();
        const url = this.url + 'alarm/' + alarm.idx;
        return this.http.put(url, JSON.stringify(alarm), {headers: this.custom_header_val});
    }

    async deleteAlarm(index: number) {
        await this.beforeApiCall();
        return this.http.delete(this.url + 'alarm/' + index, {headers: this.custom_header_val});
    }

    async getRadio() {
        await this.beforeApiCall();
        return this.http.get(this.url + 'radio', {headers: this.custom_header_val});
    }

    async startRadio() {
        await this.beforeApiCall();
        return this.http.post(this.url + 'radio', {'switch': 'on'},{ headers : this.custom_header_val });
    }

    async stopRadio() {
        await this.beforeApiCall();
        return this.http.post(this.url + 'radio', {'switch': 'off'},{ headers : this.custom_header_val });
    }

    async createAlarm(alarm: any) {
        await this.beforeApiCall();
        const url = this.url + 'alarm';
        return this.http.post(url, alarm,{ headers : this.custom_header_val });
    }

    getHost() {
        return this.storage.get('rpi-alarm-clock');
    }

    setHost(hostdata: HostData) {
        this.init_done = false;
        return this.storage.set('rpi-alarm-clock', JSON.stringify(hostdata));
    }

}
