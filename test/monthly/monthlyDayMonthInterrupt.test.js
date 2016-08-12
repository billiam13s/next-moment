import {
  assert
} from 'chai'
import moment from 'moment';
import basicTest from './monthlyDayMonthBaseTest';

import monthly from '../../src/monthly';


describe("monthly", () => {
  const TODAY = moment();

  describe("Interrupt", () => {
    basicTest();

    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "months").add(1, "days");
    const monthlyRepeatBy = "day_of_month";
    const interval = 1;
    const options = {
      "interval": interval,
      "monthly_repeat_by": monthlyRepeatBy,
      "end_at": endAt,
      "interrupt": true
    };

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(1, "months").add(1, "seconds");
      const expected = TODAY.clone().add(2, "months");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "months").subtract(1, "seconds");
      const expected = TODAY.clone().add(2, "months");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "months").add(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(3, "months").subtract(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(3, "months").add(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });
  }); // end of Interrupt

  describe("Interrupt 2 months interval 6 months length", () => {
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(5, "months");
    const monthlyRepeatBy = "day_of_month";
    const interval = 2;
    const options = {
      "interval": interval,
      "monthly_repeat_by": monthlyRepeatBy,
      "end_at": endAt,
      "interrupt": true
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
      const completedAt = TODAY.clone().add(2, "months").subtract(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after first repeat", (done) => {
      const completedAt = TODAY.clone().add(2, "months").add(1, "seconds");
      const expected = TODAY.clone().add(4, "months");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = TODAY.clone().add(4, "months").subtract(1, "seconds");
      const expected = TODAY.clone().add(4, "months");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = TODAY.clone().add(4, "months").add(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second before end", (done) => {
      const completedAt = TODAY.clone().add(5, "months").subtract(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });

    it("Second after end", (done) => {
      const completedAt = TODAY.clone().add(5, "months").add(1, "seconds");
      const actual = monthly(startAt, options, completedAt.clone());

      assert.isFalse(actual);
      done();

    });
  }); // Interrupt 2 months interval 6 months length

}); // end of Get next start date
