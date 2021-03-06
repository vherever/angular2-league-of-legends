import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./components/app.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from '@angular/forms';
import {SummonerInfoComponent} from "./components/summoner-info.component";
import {SummonerService} from "./services/summoner.service";
import {SidebarComponent} from "./components/sidebar.component";
import {HeaderComponent} from "./components/header.component";
import {OverviewComponent} from "./components/overview.component";
import {MatchHistoryComponent} from "./components/match-history.component";
import {ChampionStatisticsComponent} from "./components/champion-statistics.component";
import {RoleStatisticsComponent} from "./components/role-statistics.component";
import {Tabs} from "./components/tabs.component";
import {Tab} from "./components/tab.component";
import {UtilsService} from "./services/utilsService";
import {DataHandlerService} from "./services/data-handler.service";
import {LineChartComponent} from "./components/line-chart.component";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        SlimLoadingBarModule.forRoot()
    ],
    declarations: [
        AppComponent,
        SummonerInfoComponent,
        SidebarComponent,
        HeaderComponent,
        OverviewComponent,
        MatchHistoryComponent,
        ChampionStatisticsComponent,
        RoleStatisticsComponent,
        Tabs,
        Tab,
        LineChartComponent
    ],
    providers: [
        SummonerService,
        UtilsService,
        DataHandlerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
