import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./components/app.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from '@angular/forms';
import {FindSummonerComponent} from "./components/find-summoner.component";
import {SummonerService} from "./services/summoner.service";
import {SidebarComponent} from "./components/sidebar.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        FindSummonerComponent,
        SidebarComponent
    ],
    providers: [SummonerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
