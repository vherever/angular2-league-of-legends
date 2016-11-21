import {Component, Input, Output, EventEmitter} from "@angular/core";
import {SummonerInfo} from "../models/summoner-info";
import {SummonerService} from "../services/summoner.service";
import {UtilsService} from "../services/utilsService";
@Component({
    selector: 'header-menu',
    templateUrl: 'app/templates/header.component.html'
})
export class HeaderComponent {
    @Input() toggledChild: boolean;
    @Output() notifyToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() apiVersion: string;
    @Input() regions: any;

    @Output() notifySummonerReq: EventEmitter<SummonerInfo> = new EventEmitter<SummonerInfo>();

    @Output() errorNotify: EventEmitter<string> = new EventEmitter<string>();

    info: SummonerInfo;
    localStorageData: any = {
        summoner: localStorage.getItem('summoner'),
        region: localStorage.getItem('region')
    };
    summoner: string = this.localStorageData.summoner ? this.localStorageData.summoner : '';
    region: string = this.localStorageData.region ? this.localStorageData.region : 'euw';
    // error: string;
    errorValidate: string;

    constructor(
        private summonerService: SummonerService,
        private utilsService: UtilsService
    ) {}

    onToggleClick() {
        this.toggledChild = !this.toggledChild;
        this.notifyToggled.emit(this.toggledChild);
    }

    findSummoner() {
        if(this.summoner.length > 1 && this.summoner != '') {
            this.summonerService.findSummonerByName(this.summoner, this.region)
                .subscribe(info => {
                    this.info = this.utilsService.obj2Values(info);
                    // this.summoner = '';
                    if (this.info.name && this.region) {
                        //set summoner and region to localStorage values if not undefined
                        localStorage.setItem('summoner', this.info.name);
                        localStorage.setItem('region', this.region);
                        this.errorValidate = '';
                        this.errorNotify.emit('');

                        this.notifySummonerReq.emit(this.info);
                    } else {
                        this.info = null;
                        this.errorNotify.emit(info);
                    }
                })
        } else {
            this.errorValidate = 'The name must be at least 2 characters long'
        }
    }
}
