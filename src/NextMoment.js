import moment from 'moment';
import minutely from './minutely';
import hourly from './hourly';
import daily from './daily';
import weekly from './weekly';

export default class NextMoment {
  constructor(start, options, current = null) {
    this.start = start;
    this.options = options;
    this.current = current;
  }

  getNext() {
    var result = false;

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

      default:
        break;
    }

    return moment.isMoment(result) ? result.toDate() : false;
  }
}
