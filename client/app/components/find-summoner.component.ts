import {Component} from "@angular/core";
import {SummonerService} from "../services/summoner.service";
@Component({
  selector: 'find-summoner',
  templateUrl: 'app/templates/find-summoner.component.html'
})
export class FindSummonerComponent {
  info: any;
  title: string;
  summonerInfo: any = [];

  constructor(private summonerService: SummonerService) {
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
}
