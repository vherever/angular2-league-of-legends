import {Injectable} from "@angular/core";
import {DataHandler} from "../models/data-handler";
@Injectable()
export class DataHandlerService {
    data: DataHandler = {
        errorInput: '',
        errorFind: '',
        _data: {
            matchesByRole: {
                mid: undefined,
                adc: undefined,
                sup: undefined,
                jun: undefined,
                top: undefined,
            }
        },
        game: {
            apiVersion: undefined,
            regions: []
        },
        player: {
            region: '',
            id: undefined,
            name: '',
            profileIconId: undefined,
            revisionDate: undefined,
            summonerLevel: undefined
        },
        playerSummary: {
            aggregatedStats: [],
            modifyDate: undefined,
            playerStatSummaryType: '',
            wins: undefined
        },
        recentGames: {
            championId: undefined,
            createDate: undefined,
            fellowPlayers: [],
            gameId: undefined,
            gameMode: '',
            gameType: '',
            invalid: false,
            ipEarned: undefined,
            level: undefined,
            mapId: undefined,
            spell1: undefined,
            spell2: undefined,
            stats: [],
            subType: '',
            teamId: undefined
        },
        leagueEntryData: {
            entries: [],
            name: '',
            queue: '',
            tier: ''
        },
        matchHistory: {
            endIndex: undefined,
            matches: [],
            startIndex: undefined,
            totalGames: undefined
        }
    };
}
