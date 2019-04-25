import {Component, OnInit} from '@angular/core';
import {Radio, RpiService} from '../../services/rpi.service';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.page.html',
    styleUrls: ['./radio.page.scss'],
})
export class RadioPage implements OnInit {

    radio: any;
    isPlaying: boolean;

    constructor(private rpiService: RpiService) {
        this.isPlaying = false;
    }

    ngOnInit() {
        (async () => {
            const res = await this.rpiService.getRadio();
            res.subscribe((result) => {
                console.log(result);
                this.isPlaying = (result as Radio).isPlaying as boolean;
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
