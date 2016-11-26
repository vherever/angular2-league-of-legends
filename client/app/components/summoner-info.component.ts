import {Component, Input} from "@angular/core";
import {DataHandlerService} from "../services/data-handler.service";
@Component({
    selector: 'summoner-info',
    templateUrl: 'app/templates/summoner-info.component.html'
})
export class SummonerInfoComponent {
    @Input() dataObject: any;
    constructor(private dataService: DataHandlerService) {}
}
