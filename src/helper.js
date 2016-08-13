import moment from 'moment';

function adjustDST(base, next) {
  if (!moment.isMoment(base) || !moment.isMoment(next)) {
    return false;
  }
  const result = next.clone();

  if (base.isDST() != result.isDST()) {
    if (base.isDST()) {
      // fall back
      result.add(1, "hours");
    } else {
      // spring forward
      result.subtract(1, "hours");
    }
  }
  return result;
};


function checkVars(current, base, interval, endAt, interrupt) {
  // current moment in time
  current = current || moment();
  if (!moment.isMoment(current))
    current = moment(current);

  if (interrupt === undefined)
    interrupt = false;

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

export {
  adjustDST,
  checkVars
}
