import {Component} from '@angular/core';
import {Radio, RpiService} from '../../services/rpi.service';
import {HelperService} from '../../services/helper/helper.service';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.page.html',
    styleUrls: ['./radio.page.scss'],
})
export class RadioPage {

    radio: any;
    isPlaying: boolean;

    constructor(private rpiService: RpiService, public helper: HelperService) {
        this.isPlaying = false;
    }

    async ionViewWillEnter() {
        await this.helper.presentLoading('Loading Radio');
        (async () => {
            const res = await this.rpiService.getRadio();
            res.subscribe((result: any) => {
                this.isPlaying = (result as Radio).isPlaying as boolean;
                this.helper.hideLoading();
            });
        })();
    }

    async startRadio() {
        (await this.rpiService.startRadio()).subscribe(() => {
            this.isPlaying = true;
        });
    }

    async stopRadio() {
        (await this.rpiService.stopRadio()).subscribe(() => {
            this.isPlaying = false;
        });
    }
}
