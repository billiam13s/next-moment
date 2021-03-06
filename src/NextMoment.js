import moment from 'moment';
import minutely from './minutely';
import hourly from './hourly';
import daily from './daily';
import weekly from './weekly';
import monthly from './monthly';

export default class NextMoment {
  constructor(start, options, current = null) {
    this.start = start;
    this.options = options;
    this.current = current;
  }

  getNext() {
    var result = false;

    if (moment.isDate(this.start) || moment.isMoment(this.start)) {
      switch (this.options.repeat) {
        case "minutely":
          result = minutely(this.start, this.options, this.current);
          break;

        case "hourly":
          result = hourly(this.start, this.options, this.current);
          break;

        case "daily":
          result = daily(this.start, this.options, this.current);
          break;

        case "weekly":
          result = weekly(this.start, this.options, this.current);
          break;

        case "monthly":
          result = monthly(this.start, this.options, this.current);
          break;

        default:
          break;
      }

      this.start = result;

    }

    return moment.isMoment(result) ? result.toDate() : false;
  }
}
