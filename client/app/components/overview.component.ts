import {Component} from "@angular/core";
import {DataHandlerService} from "../services/data-handler.service";
@Component({
    selector: 'overview',
    templateUrl: 'app/templates/overview.component.html'
})
export class OverviewComponent {
    constructor(private dataService: DataHandlerService) {}
}
