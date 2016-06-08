import moment from 'moment';
import adjustDST from './adjustDST';


export default function(base, options, interrupt = false, current = moment()) {
  let endAt = options.end_at;
  const interval = options.interval > 0 ? options.interval : 1; // set invalid interval to 1

  // convert to moment
  if (!moment.isMoment(base))
    base = moment(base);
  if (endAt && !moment.isMoment(endAt))
    endAt = moment(endAt);

  // current moment in time
  if (!current || !moment.isMoment(current))
    current = current ? moment(current) : moment();

  let diffInterval = 0;
  if (interrupt) {
    diffInterval = current.diff(base, "minutes");
    diffInterval = diffInterval > 0 ? diffInterval : 0;
  }

  const addInterval = (Math.floor(diffInterval / interval) + 1) * interval;
  let nextStart = base.clone().add(addInterval, "minutes");

  nextStart = adjustDST(base, nextStart);

  if (endAt && nextStart.isAfter(endAt)) {
    return false;
  }

  return nextStart;
};
