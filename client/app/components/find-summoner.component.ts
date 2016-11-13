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
    this.summonerService.getSummonerInformation()
      .subscribe(info => {
        this.info = this.obj2Arr(info);
      })
  }

  private obj2Arr(obj: any) {
    return Object.values(obj)[0];
  }
}
