import moment from 'moment';
import {
  checkVars,
  getDaysWeekArray
} from './helper';


function calculateDayOfWeek(CURRENT, BASE, INTERVAL, INTERRUPT) {
  let diffInterval = 0;
  let addInterval = 0;

  let nextStart = false;

  const DAY_OF_WEEK = BASE.day();
  const WK_NUM = Math.ceil(BASE.date() / 7) - 1;

  // skip the 5th day week option. Not every month have 5th Sunday, Monday, etcs.
  if (WK_NUM < 4) {
    const NEXT_MONTH_TODAY = BASE.clone().add(INTERVAL, "months");
    const MONTH_DAYS_WEEK_ARR = getDaysWeekArray(NEXT_MONTH_TODAY);

    nextStart = MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];

    if (INTERRUPT && CURRENT.isAfter(nextStart)) {
      nextStart = calculateDayOfWeek(CURRENT, nextStart, INTERVAL, INTERRUPT);
    }
  }

  return nextStart;

}

function calculateDayOfMonth(CURRENT, BASE, INTERVAL, STICK_TO_LAST_DAY, INTERRUPT) {
  let nextStart = BASE.clone().add(INTERVAL, "months");

  const LAST_DATE_OF_MONTH = BASE.clone().endOf("month");
  const LAST_DATE_OF_NEXT_START = nextStart.clone().endOf("month");

  if (BASE.isSame(LAST_DATE_OF_MONTH, 'day') &&
    !nextStart.isSame(LAST_DATE_OF_NEXT_START, 'day') &&
    LAST_DATE_OF_NEXT_START.isAfter(nextStart) &&
    STICK_TO_LAST_DAY) {
    nextStart = nextStart.clone().set("date", LAST_DATE_OF_NEXT_START.date());
  }

  if (INTERRUPT && CURRENT.isAfter(nextStart)) {
    nextStart = calculateDayOfMonth(CURRENT, nextStart, INTERVAL, STICK_TO_LAST_DAY, INTERRUPT);
  }

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

  const MONTHLY_REPEAT_BY = options.monthly_repeat_by;
  const STICK_TO_LAST_DAY = options.stick_to_last_day;

  let nextStart = false;

  switch (MONTHLY_REPEAT_BY) {
    case "day_of_week":
      nextStart = calculateDayOfWeek(CURRENT, BASE, INTERVAL, INTERRUPT);
      break;
    case "day_of_month":
      nextStart = calculateDayOfMonth(CURRENT, BASE, INTERVAL, STICK_TO_LAST_DAY, INTERRUPT);
      break;
    default:

  }

  if (END_AT && moment.isMoment(nextStart) && nextStart.isAfter(END_AT)) {
    nextStart = false;
  }

  return nextStart;
}
