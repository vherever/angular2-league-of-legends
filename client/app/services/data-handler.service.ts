import {Injectable} from "@angular/core";
import {DataHandler} from "../models/data-handler";
@Injectable()
export class DataHandlerService {
    data: DataHandler = {
        game: {
            apiVersion: undefined,
            regions: []
        },
        player: {
            id: undefined,
            name: ''
        }
    };
}
