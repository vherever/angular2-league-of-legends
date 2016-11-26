import {Component, OnInit} from '@angular/core';
import {SummonerService} from "../services/summoner.service";
import {DataHandlerService} from "../services/data-handler.service";
@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
})
export class AppComponent implements OnInit{
    toggledParent: boolean = false;

    localStorageData: any = {
        summoner: localStorage.getItem('summoner') ? localStorage.getItem('summoner') : '',
        region: localStorage.getItem('region') ? localStorage.getItem('region') : 'na'
    };

    constructor(private summonerService: SummonerService,
                private dataService: DataHandlerService) {
        this.summonerService.getApiVersion()
            .subscribe(apiVersion => {
                this.dataService.data.game.apiVersion = apiVersion[0]; // get the latest version of riot api from array
            });

        this.summonerService.getRegions()
            .subscribe(regions => {
                this.dataService.data.game.regions = regions;
            });
    }

    private findSummonerByNameRequest(summoner: string, region: string) {
        if(summoner.length > 1 && summoner != '') {
            this.dataService.data.errorInput = ''; // if not enough characters long
            this.dataService.data.errorFind = ''; // if such name don't exist
            this.summonerService.findSummonerByName(summoner, region)
                .subscribe(info => {
                    if(info[summoner]) {
                        this.dataService.data.player = info[summoner];
                        localStorage.setItem('summoner', summoner);
                        localStorage.setItem('region', region);
                        this.getPlayerSummary(this.dataService.data.player.id, this.dataService.data.player.region);
                    } else {
                        this.dataService.data.errorFind = 'Wooops! This summoner is not exist. Please try another';
                    }
                });
        } else {
            this.dataService.data.errorFind = '';
            this.dataService.data.errorInput = 'The name must be at least two characters long!';
        }
    }

    onFindSummonerNotify(data: any): void {
        this.findSummonerByNameRequest(data.summoner, data.region);
    }

    onNotifyHeaderInit(data: boolean): void {
        if (this.localStorageData.summoner && this.localStorageData.region) {
            this.findSummonerByNameRequest(this.localStorageData.summoner, this.localStorageData.region);
        }
    }

    private getPlayerSummary(id: number, region: string) {
        this.summonerService.getPlayerSummary(id, region)
            .subscribe((playerSummary: any) => {
                this.dataService.data.playerSummary = playerSummary;
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
}
