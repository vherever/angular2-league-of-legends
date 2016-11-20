import {Component} from "@angular/core";
import {SummonerService} from "../services/summoner.service";
import {SummonerInfo} from "../models/summoner-info";
@Component({
    selector: 'find-summoner',
    templateUrl: 'app/templates/find-summoner.component.html'
})
export class FindSummonerComponent {
    info: SummonerInfo;
    apiVersion: string;
    regions: any;
    localStorageData: any = {
        summoner: localStorage.getItem('summoner'),
        region: localStorage.getItem('region')
    };
    summoner: string = this.localStorageData.summoner ? this.localStorageData.summoner : '';
    region: string = this.localStorageData.region ? this.localStorageData.region : 'euw';
    error: string;
    errorValidate: string;


    constructor(private summonerService: SummonerService) {
        this.summonerService.getApiVersion()
            .subscribe(apiVersion => {
                this.apiVersion = apiVersion[0]; // latest version of riot api
            });

        this.summonerService.getRegions()
            .subscribe(regions => {
                this.regions = regions;
            });

        // get the name of summoner from localStorage
        if(this.localStorageData.summoner) {
            this.summonerService.findSummonerByName(this.localStorageData.summoner, this.localStorageData.region)
                .subscribe(info => {
                    this.info = this.obj2Values(info);
                });
        }
    }

    // method to easily get values from objects
    private obj2Values(obj: any) {
        return Object.values(obj)[0];
    }

    findSummoner() {
        if(this.summoner.length > 1 && this.summoner != '') {
            this.summonerService.findSummonerByName(this.summoner, this.region)
                .subscribe(info => {
                    this.info = this.obj2Values(info);
                    // this.summoner = '';
                    if (this.info.name && this.region) {
                        //set summoner and region to localStorage values if not undefined
                        localStorage.setItem('summoner', this.info.name);
                        localStorage.setItem('region', this.region);
                        this.errorValidate = '';
                    } else {
                        this.info = null;
                        this.error = info;
                    }
                })
        } else {
            this.errorValidate = 'The name must be at least 2 characters long'
        }
    }
}
