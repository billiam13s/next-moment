import moment from 'moment';
import adjustDST from './adjustDST';
import {
  checkVars
} from './helper';


function calculateDayOfWeek(CURRENT, BASE, INTERVAL, INTERRUPT) {
  let diffInterval = 0;
  let addInterval = 0;
}

function calculateDayOfMonth(CURRENT, BASE, INTERVAL, INTERRUPT) {
  let diffInterval = 0;
  // let addInterval = 0;

  if (INTERRUPT) {
    diffInterval = CURRENT.diff(BASE, "months");
    diffInterval = diffInterval > 0 ? diffInterval : 0;
  }

  const ADD_INTERVAL = (Math.floor(diffInterval / INTERVAL) + 1) * INTERVAL;
  let nextStart = BASE.clone().add(ADD_INTERVAL, "months");

  return nextStart
}

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

  const monthlyRepeatBy = options.monthly_repeat_by;

  let nextStart = false;

  switch (monthlyRepeatBy) {
    case "day_of_week":
      nextStart = calculateDayOfWeek(CURRENT, BASE, INTERVAL, INTERRUPT);
      break;
    case "day_of_month":
      nextStart = calculateDayOfMonth(CURRENT, BASE, INTERVAL, INTERRUPT);
      break;
    default:

  }

  if (END_AT && moment.isMoment(nextStart) && nextStart.isAfter(END_AT)) {
    nextStart = false;
  }

  return nextStart;
}
