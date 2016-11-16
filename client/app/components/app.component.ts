import {Component, OnInit} from '@angular/core';
@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
})
export class AppComponent implements OnInit{
    toggledParent: boolean = false;

    ngOnInit() {
        (window.innerWidth < 768) ? this.toggledParent = true : this.toggledParent = false;
    }

    onResize(event: any) {
        (event.target.innerWidth < 768) ? this.toggledParent = true : this.toggledParent = false;
    }

    onNotifyToggle(state: boolean): void {
        this.toggledParent = state;
    }
}
