import {Component, Input} from "@angular/core";
import {DataHandlerService} from "../services/data-handler.service";
import {UtilsService} from "../services/utilsService";
@Component({
    selector: 'summoner-info',
    templateUrl: 'app/templates/summoner-info.component.html',
    styleUrls: ['app/styles/summoner-info.component.css']
})
export class SummonerInfoComponent {
    @Input() dataObject: any;
    constructor(private dataService: DataHandlerService,
                private utilsService:UtilsService) {}
}
