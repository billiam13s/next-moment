import moment from 'moment';

export default function(base, next) {
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
