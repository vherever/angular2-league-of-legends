import {Component, Input, Output, EventEmitter} from "@angular/core";
@Component({
    selector: 'header-menu',
    templateUrl: 'app/templates/header.component.html'
})
export class HeaderComponent {
    @Input() toggledChild: boolean;

    @Output() notifyToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

    onToggleClick() {
        this.toggledChild = !this.toggledChild;
        this.notifyToggled.emit(this.toggledChild);
    }
}
