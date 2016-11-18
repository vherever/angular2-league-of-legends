import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Tab } from './tab.component';
@Component({
    selector: 'tabs',
    templateUrl: 'app/templates/tabs.component.html'
})
export class Tabs implements AfterContentInit {

    @ContentChildren(Tab) tabs: QueryList<Tab>;

    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        let activeTabs = this.tabs.filter((tab)=>tab.active);

        // if there is no active tab set, activate the first
        if(activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: Tab){
        // deactivate all tabs
        this.tabs.toArray().forEach(tab => tab.active = false);

        // activate the tab the user has clicked on.
        tab.active = true;
    }

}
