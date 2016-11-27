import {Injectable} from "@angular/core";
import * as _ from 'underscore';
@Injectable()
export class UtilsService {
    // method to easily get values from objects
    public obj2Values(obj: any) {
        return Object.values(obj)[0];
    }

    // make -1 to +1
    public negativeInPositive(number: number) {
        return Math.abs(number);
    }

    // clear localStorage after 24 hours
    public clearLocalStorage() {
        var hours: number = 24; // Reset when storage is more than 24hours
        var now: any = new Date().getTime();
        var setupTime: any = localStorage.getItem('setupTime');
        if (setupTime == null) {
            localStorage.setItem('setupTime', now)
        } else {
            if(now - setupTime > hours*60*60*1000) {
                localStorage.setItem('apiVersion', '');
                localStorage.setItem('setupTime', now);
            }
        }
    }

    //check if object is not undefined
    public isUndefined(obj: any) {
        return typeof(obj);
    }
}
