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


function getDaysWeekArray(current) {
  if (current && !moment.isMoment(current)) {
    current = moment(current);
  }

  const TODAY = current || moment();
  const FIRST_DATE = TODAY.clone().startOf("months");
  const LAST_DATE = TODAY.clone().endOf("month");

  const ST_WK_7TH_DAY = FIRST_DATE.clone().endOf("week");
  const LAST_WK_1ST_DAY = LAST_DATE.clone().startOf("week");

  const TODAY_WEEK_DAY = TODAY.clone().day();
  const DAY_OF_MOMTH = TODAY.clone().date();

  const NUM_DAYS = LAST_DATE.date();
  const NUM_WEEKS = Math.ceil(NUM_DAYS / 7);

  let weekDays = new Array(NUM_WEEKS);
  let indexWeek = 0;

  for (let i = FIRST_DATE.date(); i <= NUM_DAYS && indexWeek < weekDays.length; i++) {

    let iDate = TODAY.clone().set("date", i)
    if ((ST_WK_7TH_DAY.date() < i && iDate.day() == FIRST_DATE.day())) {
      indexWeek++;
    }

    if (!weekDays[indexWeek]) {
      weekDays[indexWeek] = new Array(7);
    }

    let indexWeekDay = iDate.day();

    weekDays[indexWeek][indexWeekDay] = iDate;
  }

  return weekDays;
}

export {
  adjustDST,
  checkVars,
  getDaysWeekArray
}
