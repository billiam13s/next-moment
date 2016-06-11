/* eslint-env mocha */
import {
  assert
} from 'chai'
import moment from 'moment';
import basicTest from './hourlyBaseTest';

import hourly from '../../src/hourly';


// ****************************************************************************
// * CAUTION
// ****************************************************************************
//   TODO: Some of the test will fail when its run within the few hours of daylight
//   saving starts and ends dattes
// ****************************************************************************
describe("Hourly", () => {
  const TODAY = moment();

  describe("Interrupt", () => {
    basicTest();

    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "hours").add(30, "minutes");
    const interval = 1;
    const options = {
      "interval": interval,
      "end_at": endAt,
      "interrupt": true
    };

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(1, "hours").add(1, "seconds");
      const expected = TODAY.clone().add(2, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "hours").subtract(1, "seconds");
      const expected = TODAY.clone().add(2, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "hours").add(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(3, "hours").subtract(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(3, "hours").add(1, "seconds");
      const expected = TODAY.clone().add(interval, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });
  }); // end of Interrupt

  describe("Interrupt 2h interval 5h length", () => {
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(5, "hours");
    const interval = 2;
    const options = {
      "interval": interval,
      "end_at": endAt,
      "interrupt": true
    };
    const expected = TODAY.clone().add(interval, "hours");

    it("Second before start", (done) => {
      const completedAt = TODAY.clone().subtract(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after start", (done) => {
      const completedAt = TODAY.clone().add(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before first repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "hours").subtract(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "hours").add(1, "seconds");
      const expected = TODAY.clone().add(4, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(4, "hours").subtract(1, "seconds");
      const expected = TODAY.clone().add(4, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(4, "hours").add(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(5, "hours").subtract(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(5, "hours").add(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });
  }); // Interrupt 2h interval 5h length
}); // end of Get next start date
