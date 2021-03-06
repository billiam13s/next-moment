/* eslint-env mocha */
import {
  assert
} from 'chai'
import moment from 'moment';
import basicTest from './dailyBaseTest';

import daily from '../../src/daily';

describe("Daily", () => {
  const TODAY = moment();

  describe("Non interrupt", () => {
    basicTest();

    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "days").add(1, "hours");
    const interval = 1;
    const options = {
      "interval": interval,
      "end_at": endAt
    };
    const expected = TODAY.clone().add(interval, "days");

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(1, "days").add(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "days").subtract(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "days").add(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(3, "days").subtract(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(3, "days").add(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before end - actual ending", (done) => {
      const endAt = TODAY.clone().add(1, "days");
      const options = {
        "interval": interval,
        "end_at": endAt
      };
      const completedAt = TODAY.clone().add(1, "days").subtract(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after end - actual ending", (done) => {
      const endAt = TODAY.clone().add(1, "days");
      const options = {
        "interval": interval,
        "end_at": endAt
      };
      const completedAt = TODAY.clone().add(1, "days").add(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });
  }); // end of Non interrupt

  describe("Non interrupt 2d interval 5d length", () => {
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(5, "days");
    const interval = 2;
    const options = {
      "interval": interval,
      "end_at": endAt
    };
    const expected = TODAY.clone().add(interval, "days");

    it("Second before start", (done) => {
      const completedAt = TODAY.clone().subtract(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after start", (done) => {
      const completedAt = TODAY.clone().add(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before first repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "days").subtract(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "days").add(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(4, "days").subtract(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(4, "days").add(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(5, "days").subtract(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(5, "days").add(1, "seconds");
      const actual = daily(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });
  }); // Non interrupt 2d interval 5d length
}); // end of Get next start date
