import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./components/app.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from '@angular/forms';
import {FindSummonerComponent} from "./components/find-summoner.component";
import {SummonerService} from "./services/summoner.service";
import {SidebarComponent} from "./components/sidebar.component";
import {HeaderComponent} from "./components/header.component";
import {OverviewComponent} from "./components/overview.component";
import {MatchHistoryComponent} from "./components/match-history.component";
import {ChampionStatisticsComponent} from "./components/champion-statistics.component";
import {RoleStatisticsComponent} from "./components/role-statistics.component";
import {Tabs} from "./components/tabs.component";
import {Tab} from "./components/tab.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        FindSummonerComponent,
        SidebarComponent,
        HeaderComponent,
        OverviewComponent,
        MatchHistoryComponent,
        ChampionStatisticsComponent,
        RoleStatisticsComponent,
        Tabs,
        Tab
    ],
    providers: [SummonerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
