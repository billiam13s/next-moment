import moment from 'moment';
import {
  checkVars
} from './helper';


export default function(base, options, current) {
  const {
    CURRENT,
    BASE,
    INTERVAL,
    END_AT,
    INTERRUPT
  } = checkVars(
    current,
    base,
    options.interval,
    options.end_at,
    options.interrupt
  );

  const days_week = options.days_week;

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
      daysOnWk.push(BASE.clone().day(currentValue));
    });

    for (i = 0; i < daysOnWk.length && !found; i++) {
      dayWk = daysOnWk[i];

      if (INTERRUPT) {
        if (dayWk.isAfter(CURRENT) && dayWk.isAfter(BASE)) {
          nextStart = dayWk;
          found = true;
        }
      } else {
        // non interrupt
        if (CURRENT.isBefore(dayWk) && BASE.isBefore(dayWk)) {
          nextStart = dayWk;
          found = true;
        } else if (CURRENT.isAfter(dayWk) && BASE.isBefore(dayWk)) {
          nextStart = dayWk;
          found = true;
        }
      }
    }

    for (i = 0; i < daysOnWk.length && !found; i++) {
      dayWk = daysOnWk[i];
      diffInterval = 0;

      if (INTERRUPT) {
        diffInterval = CURRENT.diff(BASE, "weeks");
        diffInterval = diffInterval > 0 ? diffInterval - 1 : 0;
      }

      addInterval = (Math.floor(diffInterval / INTERVAL) + 1) * INTERVAL;
      dayWk = dayWk.add(addInterval, "weeks");

      if (!fRepeatWeekAfter) {
        // take the firest repeat on this week and advance to next interval repeat.
        // it is use when repeat is not on the week.
        fRepeatWeekAfter = dayWk.clone().add(addInterval, "weeks");
      }

      if (INTERRUPT) {
        if (dayWk.isAfter(CURRENT)) {
          nextStart = dayWk;
          found = true;
        }
      } else {
        if (CURRENT.isBefore(dayWk) && BASE.isBefore(dayWk)) {
          nextStart = dayWk;
          found = true;
        } else if (CURRENT.isAfter(dayWk) && BASE.isBefore(dayWk)) {
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
    if (INTERRUPT) {
      diffInterval = CURRENT.diff(BASE, "weeks");
      diffInterval = diffInterval > 0 ? diffInterval : 0;
    }

    addInterval = (Math.floor(diffInterval / INTERVAL) + 1) * INTERVAL;
    nextStart = BASE.clone().add(addInterval, "weeks");
  }

  if (END_AT && nextStart.isAfter(END_AT)) {
    nextStart = false;
  }

  return nextStart;
};
