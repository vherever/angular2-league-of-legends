import {Component, Input, Output, EventEmitter} from "@angular/core";
import {DataHandler} from "../models/data-handler";
import {DataHandlerService} from "../services/data-handler.service";
@Component({
    selector: 'header-menu',
    templateUrl: 'app/templates/header.component.html',
    styleUrls: ['app/styles/header.component.css']
})
export class HeaderComponent {
    @Input() toggledChild: boolean;
    @Output() notifyToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() findSummonerNotify: EventEmitter<any> = new EventEmitter<any>();
    @Output() headerInitNotify: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() dataObject: any;

    localStorageData: any = {
        summoner: localStorage.getItem('summoner') ? localStorage.getItem('summoner') : '',
        region: localStorage.getItem('region') ? localStorage.getItem('region') : 'na'
    };

    // our ng-model
    model: any = {
        summoner: this.localStorageData.summoner ? this.localStorageData.summoner : '',
        region: this.localStorageData.region ? this.localStorageData.region : 'euw'
    };

    constructor(private dataService: DataHandlerService) {}

    onToggleClick() {
        this.toggledChild = !this.toggledChild;
        this.notifyToggled.emit(this.toggledChild);
    }


    findSummonerByName() {
        this.findSummonerNotify.emit(this.model);
    }

    ngOnInit() {
        this.headerInitNotify.emit(true);
    }
}
