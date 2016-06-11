import moment from 'moment';
import adjustDST from './adjustDST';


export default function(base, options, current = moment()) {
  let endAt = options.end_at;
  const interval = options.interval > 0 ? options.interval : 1; // set invalid interval to 1
  const days_week = options.days_week;

  // convert to moment
  if (!moment.isMoment(base))
    base = moment(base);
  if (endAt && !moment.isMoment(endAt))
    endAt = moment(endAt);

  // current moment in time
  if (!moment.isMoment(current))
    current = moment(current);

  let nextStart = false;
  let diffInterval = 0;
  let addInterval = 0;

  if (days_week && days_week.length) {
    let daysOnWk = [];
    let i = 0;
    let dayWk = null;
    let found = false;
    let fRepeatWeekAfter = null; // holder for next repeat is on the following week*.

    days_week.forEach(function(currentValue) {
      daysOnWk.push(base.clone().day(currentValue));
    });

    for (i = 0; i < daysOnWk.length && !found; i++) {
      dayWk = daysOnWk[i];

      if (options.interrupt) {
        if (dayWk.isAfter(current) && dayWk.isAfter(base)) {
          nextStart = dayWk;
          found = true;
        }
      } else {
        // non interrupt
        if (current.isBefore(dayWk) && base.isBefore(dayWk)) {
          nextStart = dayWk;
          found = true;
        } else if (current.isAfter(dayWk) && base.isBefore(dayWk)) {
          nextStart = dayWk;
          found = true;
        }
      }
    }

    for (i = 0; i < daysOnWk.length && !found; i++) {
      dayWk = daysOnWk[i];
      diffInterval = 0;

      if (options.interrupt) {
        diffInterval = current.diff(base, "weeks");
        diffInterval = diffInterval > 0 ? diffInterval - 1 : 0;
      }

      addInterval = (Math.floor(diffInterval / interval) + 1) * interval;
      dayWk = dayWk.add(addInterval, "weeks");

      if (!fRepeatWeekAfter) {
        // take the firest repeat on this week and advance to next interval repeat.
        // it is use when repeat is not on the week.
        fRepeatWeekAfter = dayWk.clone().add(addInterval, "weeks");
      }

      if (options.interrupt) {
        if (dayWk.isAfter(current)) {
          nextStart = dayWk;
          found = true;
        }
      } else {
        if (current.isBefore(dayWk) && base.isBefore(dayWk)) {
          nextStart = dayWk;
          found = true;
        } else if (current.isAfter(dayWk) && base.isBefore(dayWk)) {
          nextStart = dayWk;
          found = true;
        }
      }
    }

    if (!found && fRepeatWeekAfter) {
      nextStart = fRepeatWeekAfter;
    }
  } else {
    diffInterval = 0;
    if (options.interrupt) {
      diffInterval = current.diff(base, "weeks");
      diffInterval = diffInterval > 0 ? diffInterval : 0;
    }

    addInterval = (Math.floor(diffInterval / interval) + 1) * interval;
    nextStart = base.clone().add(addInterval, "weeks");
  }

  if (endAt && nextStart.isAfter(endAt)) {
    nextStart = false;
  }

  return nextStart;
};
