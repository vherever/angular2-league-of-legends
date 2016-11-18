import { Component, Input } from '@angular/core';

@Component({
    selector: 'tab',
    templateUrl: 'app/templates/tab.component.html'
})
export class Tab {
    @Input('tabTitle') title: string;
    @Input() active = false;
}
