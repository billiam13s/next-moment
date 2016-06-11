import {
  assert
} from 'chai'
import moment from 'moment';

import daily from '../../src/daily';

describe("Daily", () => {
  describe("Override Interrupt", () => {
    const TODAY = moment();
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(3, "days");
    const interval = 1;

    it("Second after first repeat - global", (done) => {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      };
      const completedAt = TODAY.clone().add(1, "days").add(1, "seconds");
      const expected = TODAY.clone().add(interval, "days");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat - global", (done) => {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      };
      const completedAt = TODAY.clone().add(2, "days").subtract(1, "seconds");
      const expected = TODAY.clone().add(interval, "days");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat - global", (done) => {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      };
      const completedAt = TODAY.clone().add(2, "days").add(1, "seconds");
      const expected = TODAY.clone().add(interval, "days");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after first repeat - data", (done) => {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };
      const completedAt = TODAY.clone().add(1, "days").add(1, "seconds");
      const expected = TODAY.clone().add(2, "days");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat - data", (done) => {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };
      const completedAt = TODAY.clone().add(2, "days").subtract(1, "seconds");
      const expected = TODAY.clone().add(2, "days");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat - data", (done) => {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };
      const completedAt = TODAY.clone().add(2, "days").add(1, "seconds");
      const expected = TODAY.clone().add(3, "days");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });
  }); // end of Override Interrupt
});
