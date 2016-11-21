import {Component, Input} from "@angular/core";
import {SummonerService} from "../services/summoner.service";
import {SummonerInfo} from "../models/summoner-info";
import {UtilsService} from "../services/utilsService";
@Component({
    selector: 'find-summoner',
    templateUrl: 'app/templates/summoner-info.component.html'
})
export class SummonerInfoComponent {
    @Input() info: SummonerInfo;
    @Input() apiVersion: string;
    @Input() error: string;

    localStorageData: any = {
        summoner: localStorage.getItem('summoner'),
        region: localStorage.getItem('region')
    };

    constructor(
        private summonerService: SummonerService,
        private utilsService: UtilsService
    ) {
        if (this.localStorageData.summoner) {
            this.summonerService.findSummonerByName(this.localStorageData.summoner, this.localStorageData.region)
                .subscribe(info => {
                    this.info = this.utilsService.obj2Values(info);
                });
        }
    }
}
