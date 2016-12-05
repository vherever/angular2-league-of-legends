import {Component, OnInit} from '@angular/core';
import {SummonerService} from "../services/summoner.service";
import {DataHandlerService} from "../services/data-handler.service";
import {UtilsService} from "../services/utilsService";
import * as _ from 'underscore';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {take} from "rxjs/operator/take";
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
                private utilsService: UtilsService,
                private slimLoadingBarService: SlimLoadingBarService) {

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
            // show progress bar
            this.slimLoadingBarService.start();

            this.dataService.data.errorInput = ''; // if not enough characters long
            this.dataService.data.errorFind = ''; // if such name don't exist
            this.summonerService.findSummonerByName(summoner, region)
                .subscribe(info => {
                    if(info[summoner]) {
                        this.dataService.data.player = info[summoner];
                        localStorage.setItem('summoner', summoner);
                        localStorage.setItem('region', region);

                        this.getPlayerSummary(this.dataService.data.player.id, this.dataService.data.player.region);
                        this.getChampionList(this.dataService.data.player.region);
                        this.getRecentGames(this.dataService.data.player.id);
                        this.getLeagueEntryData(this.dataService.data.player.id);
                    } else {
                        this.slimLoadingBarService.complete(); // complete loading bar
                        this.dataService.data.errorFind = info.error;
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
                if(this.dataService.data.matchHistory.matches) {
                    this.calculateMatchesByRole(this.dataService.data.matchHistory.matches.slice(0, 30));
                    this.calculateTopPlayedChampionsById(this.dataService.data.matchHistory.matches);
                }
            })
    }

    private calculateMatchesByRole(matchHistory: any) {
        // let sliced = matchHistory.slice(0, 30);
        let _matchesByRole = {
            mid: _.where(matchHistory, {'lane': 'MID'}),
            adc: _.where(matchHistory, {'lane': 'BOTTOM', 'role': 'DUO_CARRY'}),
            sup: _.where(matchHistory, {'lane': 'BOTTOM', 'role': 'DUO_SUPPORT'}),
            jun: _.where(matchHistory, {'lane': 'JUNGLE'}),
            top: _.where(matchHistory, {'lane': 'TOP'})
        };

        this.dataService.data._data.matchesByRole = {
            mid: this.utilsService.calculateMatchesByRoleInPercentage(_matchesByRole.mid.length, 100, 30),
            adc: this.utilsService.calculateMatchesByRoleInPercentage(_matchesByRole.adc.length, 100, 30),
            sup: this.utilsService.calculateMatchesByRoleInPercentage(_matchesByRole.sup.length, 100, 30),
            jun: this.utilsService.calculateMatchesByRoleInPercentage(_matchesByRole.jun.length, 100, 30),
            top: this.utilsService.calculateMatchesByRoleInPercentage(_matchesByRole.top.length, 100, 30)
        };
    }



    private getChampionById(championId: number) {
        this.dataService.data._data.championInfo = (_.where(this.dataService.data.champions.data, {'id': championId}))[0];

        // end progress bar, add this method to the end of your request stack
        this.slimLoadingBarService.complete();
    }

    private getChampionList(region: string) {
        this.summonerService.getChampionList(region)
            .subscribe(champions => {
                this.dataService.data.champions = champions;
                this.getMatchHistory(this.dataService.data.player.id, this.dataService.data.player.region);
                this.getChampionById(this.dataService.data.recentGames[0].championId);

            })
    }

    private calculateTopPlayedChampionsById(matchHistory: any[]) {
        let champions: any[] = [];

        _.each(matchHistory, function (i) {
            champions.push(i.champion);
        });

        var that = this;

        _.each(this.dataService.data.champions.data, (j) => {
            _.each(that.utilsService.sortByPopularity(champions).slice(0,5), (i) => {
                if(i.value === j.id) {
                    that.dataService.data._data.topChampions.push(Object.assign({'count': i.count}, j));
                }
            });
        });

        console.log(this.dataService.data._data.topChampions);
    }
}
