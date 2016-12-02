import {Component, Input} from "@angular/core";
import {DataHandlerService} from "../services/data-handler.service";
@Component({
    selector: 'line-chart',
    templateUrl: 'app/templates/line-chart.component.html',
    styleUrls: ['app/styles/line-chart.component.css']
})
export class LineChartComponent {
    @Input() role:string;
    constructor(private dataService: DataHandlerService) {}
}
