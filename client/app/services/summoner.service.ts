import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SummonerService {
  constructor(private http: Http) {
    console.log('Summoner Service initialized!');
  }

  getSummonerInformation() {
    return this.http.get('/api/summoner')
      .map(res => res.json());
  }
}
