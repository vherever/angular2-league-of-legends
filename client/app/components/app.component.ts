import {Component, OnInit} from '@angular/core';
import {SummonerService} from "../services/summoner.service";
import {SummonerInfo} from "../models/summoner-info";
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

    constructor(private summonerService: SummonerService) {
        this.summonerService.getApiVersion()
            .subscribe(apiVersion => {
                this.apiVersion = apiVersion[0]; // get latest version of riot api
            });

        this.summonerService.getRegions()
            .subscribe(regions => {
                this.regions = regions;
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
}
