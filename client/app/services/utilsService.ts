import {Injectable} from "@angular/core";
@Injectable()
export class UtilsService {
    // method to easily get values from objects
    public obj2Values(obj: any) {
        return Object.values(obj)[0];
    }
}
