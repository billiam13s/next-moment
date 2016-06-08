import {
  assert
} from 'chai'
import moment from 'moment';

import minutely from '../../src/minutely';


describe("Minutely", () => {
  const TODAY = moment();

  describe("Override Interrupt", () => {
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(3, "minutes");
    const interval = 1;

    it("Second after first repeat - global", (done) => {
      const completedAt = TODAY.clone().add(1, "minutes").add(1, "seconds");
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      };
      const expected = TODAY.clone().add(interval, "minutes");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat - global", (done) => {
      const completedAt = TODAY.clone().add(2, "minutes").subtract(1, "seconds");
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      };
      const expected = TODAY.clone().add(interval, "minutes");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat - global", (done) => {
      const completedAt = TODAY.clone().add(2, "minutes").add(1, "seconds");
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      };
      const expected = TODAY.clone().add(interval, "minutes");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after first repeat - data", (done) => {
      const completedAt = TODAY.clone().add(1, "minutes").add(1, "seconds");
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };
      const expected = TODAY.clone().add(2, "minutes");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat - data", (done) => {
      const completedAt = TODAY.clone().add(2, "minutes").subtract(1, "seconds");
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };
      const expected = TODAY.clone().add(2, "minutes");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat - data", (done) => {
      const completedAt = TODAY.clone().add(2, "minutes").add(1, "seconds");
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };
      const expected = TODAY.clone().add(3, "minutes");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });
  }); // end of Override Interrupt
}); // end of Get next start date
