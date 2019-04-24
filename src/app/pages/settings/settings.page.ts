import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {RpiService} from '../../services/rpi.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    host: string | undefined;
    hostinput: string;

    constructor(private storage: Storage, private rpiService: RpiService) {
        this.host = '';
        this.hostinput = '';
    }

    ngOnInit() {
        this.getHost();
    }

    getHost() {
        this.rpiService.getHost().then((val: string) => {
            this.host = val;
        });
    }

    async setHost() {
        this.rpiService.setHost(this.hostinput).then(value => {
            this.host = value;
        });
    }

    async deleteStorage() {
        await this.storage.clear();
        this.host = undefined;
    }

}
