import {
  assert
} from 'chai'
import moment from 'moment';
import basicTest from './minutelyBaseTest';

import minutely from '../../src/minutely';


describe("Minutely", () => {
  const TODAY = moment();

  describe("Non interrupt", () => {
    basicTest();

    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "minutes").add(30, "seconds");
    const interval = 1;
    const expected = TODAY.clone().add(interval, "minutes");
    const options = {
      "interval": interval,
      "end_at": endAt,
    };

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(1, "minutes").add(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "minutes").subtract(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "minutes").add(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(3, "minutes").subtract(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(3, "minutes").add(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before end - actual ending", (done) => {
      const endAt = TODAY.clone().add(1, "minutes");
      const options = {
        "interval": interval,
        "end_at": endAt
      };
      const completedAt = TODAY.clone().add(1, "minutes").subtract(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after end - actual ending", (done) => {
      const endAt = TODAY.clone().add(1, "minutes");
      const options = {
        "interval": interval,
        "end_at": endAt,
      };
      const completedAt = TODAY.clone().add(1, "minutes").add(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });
  }); // end of Non interrupt

  describe("Non interrupt 15min interval 35min length", () => {
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(35, "minutes");
    const interval = 15;
    const options = {
      "interval": interval,
      "end_at": endAt,
    };
    const expected = TODAY.clone().add(interval, "minutes");

    it("Second before start", (done) => {
      const completedAt = TODAY.clone().subtract(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after start", (done) => {
      const completedAt = TODAY.clone().add(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before first repeat", (done) => {
      const completedAt = TODAY.clone().add(15, "minutes").subtract(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(15, "minutes").add(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(30, "minutes").subtract(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(30, "minutes").add(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(35, "minutes").subtract(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(35, "minutes").add(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });
  }); // Non interrupt 15min interval 35min length

}); // end of Get next start date
