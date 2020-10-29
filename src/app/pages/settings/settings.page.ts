import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {RpiService, HostData} from '../../services/rpi.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    hostData: HostData;
    parsestring = '';

    constructor(private storage: Storage, private rpiService: RpiService) {
        this.hostData = new HostData();
    }

    ngOnInit() {
        this.getHost();
    }

    getHost() {
        this.rpiService.getHost().then((val: string) => {
            const JSobj = JSON.parse(val) as HostData;
            if (JSobj) {
                this.hostData = JSobj;
            }
        });
    }

    async saveData() {
        this.rpiService.setHost(this.hostData).then(value => {
            this.hostData = JSON.parse(value);
        });
    }

    async deleteStorage() {
        await this.storage.clear();
        this.hostData = new HostData();
        await this.saveData();
    }

    async readParseString() {
        const values = this.parsestring.split(',');
        this.hostData.host = values[0];
        this.hostData.port = parseInt(values[1], 10);
        this.hostData.customHeader = values[2];
        this.hostData.customHeaderValue = values[3];
        this.hostData.extrapath = values[4];
        await this.saveData();
    }

}
