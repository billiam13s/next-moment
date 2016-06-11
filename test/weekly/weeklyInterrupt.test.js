import {
  assert
} from 'chai'
import moment from 'moment';
import basicTest from './weeklyBaseTest';

import weekly from '../../src/weekly';


describe("weekly", () => {
  const TODAY = moment();

  describe("Interrupt", () => {
    basicTest();

    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "weeks").add(1, "days");
    const interval = 1;
    const options = {
      "interval": interval,
      "end_at": endAt,
      "interrupt": true
    };

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(1, "weeks").add(1, "seconds");
      const expected = TODAY.clone().add(2, "weeks");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "weeks").subtract(1, "seconds");
      const expected = TODAY.clone().add(2, "weeks");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "weeks").add(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(3, "weeks").subtract(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(3, "weeks").add(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });
  }); // end of Interrupt

  describe("Interrupt 2wks interval 6wks length", () => {
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(5, "weeks");
    const interval = 2;
    const options = {
      "interval": interval,
      "end_at": endAt,
      "interrupt": true
    };
    const expected = TODAY.clone().add(interval, "weeks");

    it("Second before start", (done) => {
      const completedAt = TODAY.clone().subtract(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after start", (done) => {
      const completedAt = TODAY.clone().add(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before first repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "weeks").subtract(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "weeks").add(1, "seconds");
      const expected = TODAY.clone().add(4, "weeks");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(4, "weeks").subtract(1, "seconds");
      const expected = TODAY.clone().add(4, "weeks");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(4, "weeks").add(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(5, "weeks").subtract(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(5, "weeks").add(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });
  }); // Interrupt 2wks interval 6wks length

}); // end of Get next start date
