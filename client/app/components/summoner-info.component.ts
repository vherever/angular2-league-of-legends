import {Component, Input} from "@angular/core";
import {SummonerService} from "../services/summoner.service";
import {SummonerInfo} from "../models/summoner-info";
import {UtilsService} from "../services/utilsService";
import {DataHandlerService} from "../services/data-handler.service";
import {DataHandler} from "../models/data-handler";
@Component({
    selector: 'summoner-info',
    templateUrl: 'app/templates/summoner-info.component.html'
})
export class SummonerInfoComponent {
    @Input() info: SummonerInfo;
    @Input() apiVersion: string;
    @Input() error: string;

    @Input() playerSummary: any;

    localStorageData: any = {
        summoner: localStorage.getItem('summoner'),
        region: localStorage.getItem('region')
    };

    // data object
    @Input() dataObject: any;

    constructor(private summonerService: SummonerService,
                private utilsService: UtilsService,
                private dataService: DataHandlerService) {
        if (this.localStorageData.summoner) {
            this.summonerService.findSummonerByName(this.localStorageData.summoner, this.localStorageData.region)
                .subscribe(info => {
                    this.info = this.utilsService.obj2Values(info);
                    this.getPlayerSummary(this.info.id, this.localStorageData.region);
                });
        }
    }

    private getPlayerSummary(id: number, region: string) {
        // getPlayerSummary
        this.summonerService.getPlayerSummary(id, region)
            .subscribe((playerSummary: any) => {
                this.playerSummary = playerSummary;
        });
    }

    ngOnInit() {
        console.log('data from summoner-info', this.dataObject)
    }
}
