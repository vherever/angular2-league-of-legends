import {Injectable} from "@angular/core";
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

    public calculateMatchesByRoleInPercentage(val: number, percents: number, matchesNumber: number) {
        return percents * val / matchesNumber;
    }

    // sort array by popularity
    public sortByPopularity(arr: any) {
        let _arr: any[] = [];
        _.each(arr, function (i) {
            _arr.push(i);
        });

        return _.sortBy(this.countTheSameItem(_arr), function (i) {
            return -i.count;
        });
    }

    private countTheSameItem(original: any[]) {
        let compressed: any[] = [];
        // make a copy of the input array
        let copy: any[] = original.slice(0);

        // first loop goes over every element
        for (var i = 0; i < original.length; i++) {
            let myCount: number = 0;
            // loop over every element in the copy and see if it's the same
            for (var w = 0; w < copy.length; w++) {
                if (original[i] == copy[w]) {
                    // increase amount of times duplicate is found
                    myCount++;
                    // sets item to undefined
                    delete copy[w];
                }
            }
            if (myCount > 0) {
                let a: any = {};
                a.value = original[i];
                a.count = myCount;
                compressed.push(a);
            }
        }
        return compressed;
    }

}
