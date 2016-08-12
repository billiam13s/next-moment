import {
  assert
} from 'chai'
import moment from 'moment';

import monthly from '../../src/monthly';


export default function() {
  describe("Basic - Day of the Month", () => {
    const TODAY = moment();
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "months").add(1, "days");
    const monthlyRepeatBy = "day_of_month";
    const interval = 1;
    const options = {
      "interval": interval,
      "monthly_repeat_by": monthlyRepeatBy,
      "end_at": endAt
    };
    const expected = TODAY.clone().add(interval, "months");

    it("Second before start", (done) => {
      const completedAt = TODAY.clone().subtract(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after start", (done) => {
      const completedAt = TODAY.clone().add(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before first repeat", (done) => {
      const completedAt = TODAY.clone().add(1, "months").subtract(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

  }); // end of basic describe function
}; // end of basic function
