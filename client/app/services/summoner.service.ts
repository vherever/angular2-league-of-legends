import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
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
}
