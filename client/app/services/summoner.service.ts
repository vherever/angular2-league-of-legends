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

    findSummonerByName(title: string) {
        return this.http.post('/api/summoner', {title: title})
            .map(res => res.json());
    }
}
