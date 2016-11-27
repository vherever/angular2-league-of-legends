import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SummonerService {
    constructor(private http: Http) {
    }

    getApiVersion() {
        return this.http.get('/api/getApiVersion')
            .map(res => res.json());
    }

    getRegions() {
        return this.http.get('/api/getRegions')
            .map(res => res.json());
    }

    findSummonerByName(summoner: string, region: string) {
        return this.http.post('/api/summoner', {summoner: summoner, region: region})
            .map(res => res.json());
    }

    getPlayerSummary(summonerId: number, region: string) {
        return this.http.post('/api/getPlayerSummary', {summonerId: summonerId, region: region})
            // .map(res => res.json());
            .map(this.extractData);
    }

    //parsing error syntax error unexpected end of input
    private extractData(res: Response) {
        let body: any;
        // check if empty, before call json
        if (res.text()) {
            body = res.json();
        }
        return body || '';
    }

    getRecentGames(summonerId: number) {
        return this.http.post('/api/getRecentGames', {summonerId: summonerId})
            .map(res => res.json());
    }

    getLeagueEntryData(summonerId: number) {
        return this.http.post('/api/getLeagueEntryData', {summonerId: summonerId})
            .map(res => res.json());
    }
}
