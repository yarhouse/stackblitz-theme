import { Injectable } from '@angular/core';
// import moment from 'moment';
import { formatDistanceToNow, parseISO } from 'date-fns';

@Injectable({
    providedIn: 'root'
})
export class TimeHelperService {
    toRelativeTimeSince(time: string) {
        return formatDistanceToNow(parseISO(time));
    }
}
