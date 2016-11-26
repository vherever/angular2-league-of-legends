import {Injectable} from "@angular/core";
import {DataHandler} from "../models/data-handler";
@Injectable()
export class DataHandlerService {
    data: DataHandler = {
        errorInput: '',
        errorFind: '',
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
        }
    };
}
