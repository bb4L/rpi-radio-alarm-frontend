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
    isPlaying = false;
    isLoading = true;

    constructor(private rpiService: RpiService, public helper: HelperService) {
    }

    ionViewWillEnter() {
        this.isLoading = true;
        this.isPlaying = false;
        (async () => {
            this.getRadio();
        })();
    }

    async getRadio() {
        await this.helper.presentLoading('Loading Radio');
        (await this.rpiService.getRadio()).subscribe((result: any) => {
            this.isPlaying = (result as Radio).isPlaying as boolean;
            this.isLoading = false;
            this.helper.hideLoading();
        }, error => {
            // pass
        });
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

    doRefresh(event: any) {
        (async () => {
            if (event) {
                try {
                    event.target.complete();
                } catch (e) {
                }
            }
            await this.getRadio();
        })();
    }
}
