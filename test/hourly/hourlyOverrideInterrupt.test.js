/* eslint-env mocha */
import {
  assert
} from 'chai'
import moment from 'moment';

import hourly from '../../src/hourly';


// ****************************************************************************
// * CAUTION
// ****************************************************************************
//   TODO: Some of the test will fail when its run within the few hours of daylight
//   saving starts and ends dattes
// ****************************************************************************
describe("Hourly", function() {
  const TODAY = moment();

  describe("Override Interrupt", function() {
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(3, "hours");
    const interval = 1;

    it("Second after first repeat - global", function(done) {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      }
      const completedAt = TODAY.clone().add(1, "hours").add(1, "seconds");
      const expected = TODAY.clone().add(interval, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat - global", function(done) {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      };
      const completedAt = TODAY.clone().add(2, "hours").subtract(1, "seconds");
      const expected = TODAY.clone().add(interval, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat - global", function(done) {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      };
      const completedAt = TODAY.clone().add(2, "hours").add(1, "seconds");
      const expected = TODAY.clone().add(interval, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after first repeat - data", function(done) {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };
      const completedAt = TODAY.clone().add(1, "hours").add(1, "seconds");
      const expected = TODAY.clone().add(2, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat - data", function(done) {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };
      const completedAt = TODAY.clone().add(2, "hours").subtract(1, "seconds");
      const expected = TODAY.clone().add(2, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat - data", function(done) {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };
      const completedAt = TODAY.clone().add(2, "hours").add(1, "seconds");
      const expected = TODAY.clone().add(3, "hours");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });
  }); // end of Override Interrupt
}); // end of Get next start date
