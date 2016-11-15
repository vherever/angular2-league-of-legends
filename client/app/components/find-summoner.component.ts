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
    title: string;

    constructor(private summonerService: SummonerService) {
        this.summonerService.getApiVersion()
            .subscribe(apiVersion => {
                this.apiVersion = apiVersion[0]; // latest version of riot api
            });
    }

    private obj2Values(obj: any) {
        return Object.values(obj)[0];
    }

    findSummoner() {
        this.summonerService.findSummonerByName(this.title)
            .subscribe(info => {
                this.info = this.obj2Values(info);
                this.title = '';
            })
    }

    OnMenuToggle(event) {
        event.preventDefault();
        console.log('toggle');
    }
}
