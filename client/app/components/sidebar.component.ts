import {Component, Input} from "@angular/core";
@Component({
    selector: 'sidebar',
    templateUrl: 'app/templates/sidebar.component.html',
    styleUrls: ['app/styles/sidebar.component.css']
})
export class SidebarComponent {
    @Input() toggledChild: boolean = false;
}
