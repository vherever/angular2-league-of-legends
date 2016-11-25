import {Component, OnInit} from '@angular/core';
import {SummonerService} from "../services/summoner.service";
import {SummonerInfo} from "../models/summoner-info";
import {DataHandlerService} from "../services/data-handler.service";
@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
})
export class AppComponent implements OnInit{
    toggledParent: boolean = false;

    apiVersion: string;
    regions: any;

    info: SummonerInfo;
    error: string;

    playerSummary: any;

    constructor(private summonerService: SummonerService,
                private dataService: DataHandlerService) {
        this.summonerService.getApiVersion()
            .subscribe(apiVersion => {
                this.apiVersion = apiVersion[0]; // get latest version of riot api

                this.dataService.data.game.apiVersion = apiVersion[0];
            });

        this.summonerService.getRegions()
            .subscribe(regions => {
                this.regions = regions;

                this.dataService.data.game.regions = regions;
            });
    }

    ngOnInit() {
        (window.innerWidth < 768) ? this.toggledParent = true : this.toggledParent = false;
    }

    onResize(event: any) {
        (event.target.innerWidth < 768) ? this.toggledParent = true : this.toggledParent = false;
    }

    onNotifyToggle(state: boolean): void {
        this.toggledParent = state;
    }

    onNotifySummonerData(data: SummonerInfo): void {
        this.info = data;
    }

    onErrorNotify(data: string): void {
        this.error = data;
    }

    onPlayerSummaryNotify(data: any): void {
        this.playerSummary = data;
    }
}
