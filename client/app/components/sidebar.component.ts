import {Component, Input} from "@angular/core";
@Component({
    selector: 'sidebar',
    templateUrl: 'app/templates/sidebar.component.html'
})
export class SidebarComponent {
    @Input() toggledChild: boolean = false;
}
