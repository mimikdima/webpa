import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'countDates'})
export class CountDatesPipe implements PipeTransform {
  transform(value: string): string {
    const today = moment(new Date());
    const createdDate = moment(value);

    const years = today.diff(createdDate, 'year');
    createdDate.add(years, 'years');

    const months = today.diff(createdDate, 'months');
    createdDate.add(months, 'months');

    const days = today.diff(createdDate, 'days');

    let result = '';
    (years) ? result += years + ' years ' : result = '';
    (months) ? result += months + ' months ' : result = '';
    (days) ? result += days + ' days ' : result = '';

    return  result;
  }
}
