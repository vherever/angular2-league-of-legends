import {Component, OnInit} from '@angular/core';
import {SummonerService} from "../services/summoner.service";
import {DataHandlerService} from "../services/data-handler.service";
import {UtilsService} from "../services/utilsService";
@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
    styleUrls: ['app/styles/app.component.css']
})
export class AppComponent implements OnInit{
    toggledParent: boolean = false;

    localStorageData: any = {
        summoner: localStorage.getItem('summoner') ? localStorage.getItem('summoner') : '',
        region: localStorage.getItem('region') ? localStorage.getItem('region') : 'na',
        apiVersion: localStorage.getItem('apiVersion') ? localStorage.getItem('apiVersion') : ''
    };

    // TODO matchHistory for the last 7 days

    // TODO GetRecentGames playerPosition
    // Player position (Legal values: TOP(1), MIDDLE(2), JUNGLE(3), BOT(4))
    // playerRole (Legal values: DUO(1), SUPPORT(2), CARRY(3), SOLO(4))


    constructor(private summonerService: SummonerService,
                private dataService: DataHandlerService,
                private utilsService: UtilsService) {

        console.log('data', this.dataService);

        // clear apiVersion in localStorage every 24 hours
        this.utilsService.clearLocalStorage();

        if(this.localStorageData.apiVersion.length === 0) {
            this.summonerService.getApiVersion()
                .subscribe(apiVersion => {
                    this.dataService.data.game.apiVersion = apiVersion[0]; // get the latest version of riot api from array
                    localStorage.setItem('apiVersion', apiVersion[0]);
                });
        } else {
            this.dataService.data.game.apiVersion = this.localStorageData.apiVersion;
        }


        this.summonerService.getRegions()
            .subscribe(regions => {
                this.dataService.data.game.regions = regions;
            });
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
                        this.getRecentGames(this.dataService.data.player.id);
                        this.getLeagueEntryData(this.dataService.data.player.id);
                        this.getMatchHistory(this.dataService.data.player.id, this.dataService.data.player.region);
                    } else {
                        this.dataService.data.errorFind = 'Wooops! This summoner is not exist. Please try another';
                    }
                });
        } else {
            this.dataService.data.errorFind = '';
            this.dataService.data.errorInput = 'The name must be at least two characters long!';
        }
    }

    private getRecentGames(summonerId: number) {
        this.summonerService.getRecentGames(summonerId)
            .subscribe(recentGames => {
                this.dataService.data.recentGames = recentGames;
            });
    }

    private getLeagueEntryData(summonerId: number) {
        this.summonerService.getLeagueEntryData(summonerId)
            .subscribe(leagueData => {
                if(leagueData.error) {
                    this.dataService.data.leagueEntryData = leagueData;
                } else {
                    this.dataService.data.leagueEntryData = leagueData[summonerId][0];
                }
            })
    }

    private getMatchHistory(summonerId: number, region: string) {
        this.summonerService.getMatchHistory(summonerId, region)
            .subscribe(matchHistory => {
                this.dataService.data.matchHistory = matchHistory;
            })
    }
}
