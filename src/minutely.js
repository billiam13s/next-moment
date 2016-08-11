import moment from 'moment';
import adjustDST from './adjustDST';
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

  let diffInterval = 0;
  if (INTERRUPT) {
    diffInterval = CURRENT.diff(BASE, "minutes");
    diffInterval = diffInterval > 0 ? diffInterval : 0;
  }

  const ADD_INTERVAL = (Math.floor(diffInterval / INTERVAL) + 1) * INTERVAL;
  let nextStart = BASE.clone().add(ADD_INTERVAL, "minutes");

  nextStart = adjustDST(BASE, nextStart);

  if (END_AT && nextStart.isAfter(END_AT)) {
    return false;
  }

  return nextStart;
};
