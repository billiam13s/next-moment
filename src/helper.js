import moment from 'moment';

export function checkVars(current, base, interval, endAt, interrupt) {
  // current moment in time
  current = current || moment();
  if (!moment.isMoment(current))
    current = moment(current);

  // set invalid interval to 1
  interval = interval > 0 ? interval : 1;

  // convert to moment
  if (!moment.isMoment(base))
    base = moment(base);
  if (endAt && !moment.isMoment(endAt))
    endAt = moment(endAt);

  return {
    CURRENT: current,
    BASE: base,
    INTERVAL: interval,
    END_AT: endAt,
    INTERRUPT: interrupt
  }
}
