import {
  assert
} from 'chai'
import moment from 'moment';

import monthly from '../../src/monthly';


describe("monthly", () => {
  const L_DAY_C_MONTH = moment().endOf("month").date();
  const L_DATE_C_MONTH = moment().set("date", L_DAY_C_MONTH);

  const ST_DAY_N_MONTH = L_DATE_C_MONTH.clone().add(1, "days");
  const L_DAY_N_MONTH = ST_DAY_N_MONTH.clone().endOf("month").date();
  const L_DATE_N_MONTH = ST_DAY_N_MONTH.clone().set("date", L_DAY_N_MONTH);

  const ST_DAY_2ND_MONTH = L_DATE_N_MONTH.clone().add(1, "days");
  const L_DAY_2ND_MONTH = ST_DAY_2ND_MONTH.clone().endOf("month").date();
  const L_DATE_2ND_MONTH = ST_DAY_2ND_MONTH.clone().set("date", L_DAY_2ND_MONTH);

  const ST_DAY_3RD_MONTH = L_DATE_2ND_MONTH.clone().add(1, "days");
  const L_DAY_3RD_MONTH = ST_DAY_3RD_MONTH.clone().endOf("month").date();
  const L_DATE_3RD_MONTH = ST_DAY_3RD_MONTH.clone().set("date", L_DAY_3RD_MONTH);

  describe("Non interrupt - Stick to last day of month", () => {
    const START_AT = L_DATE_C_MONTH.clone();
    const END_AT = ST_DAY_3RD_MONTH.clone();
    const MONTHLY_REPEAT_BY = "day_of_month";
    const INTERVAL = 1;
    let options = {
      "interval": INTERVAL,
      "monthly_repeat_by": MONTHLY_REPEAT_BY,
      "stick_to_last_day": true,
      "end_at": END_AT
    };
    const EXPECTED = L_DATE_N_MONTH.clone();

    it("Second before start", (done) => {
      const COMPLETED_AT = L_DATE_C_MONTH.clone().subtract(1, "seconds");
      const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second after start", (done) => {
      const COMPLETED_AT = L_DATE_C_MONTH.clone().add(1, "seconds");
      const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second before first repeat", (done) => {
      const COMPLETED_AT = L_DATE_N_MONTH.clone().subtract(1, "seconds");
      const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second after first repeat", (done) => {
      const completedAt = L_DATE_N_MONTH.clone().add(1, "seconds");
      const actual = monthly(START_AT, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(EXPECTED.isSame(actual));
      done();

    });

    it("Second before last repeat", (done) => {
      const completedAt = L_DATE_2ND_MONTH.clone().subtract(1, "seconds");
      const actual = monthly(START_AT, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(EXPECTED.isSame(actual));
      done();

    });

    it("Second after last repeat", (done) => {
      const completedAt = L_DATE_2ND_MONTH.clone().add(1, "seconds");
      const actual = monthly(START_AT, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(EXPECTED.isSame(actual));
      done();

    });

    it("Second before end", (done) => {
      const completedAt = END_AT.clone().subtract(1, "seconds");
      const actual = monthly(START_AT, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(EXPECTED.isSame(actual));
      done();

    });

    it("Second after end", (done) => {
      const completedAt = END_AT.clone().add(1, "months");
      const actual = monthly(START_AT, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(EXPECTED.isSame(actual));
      done();

    });

    it("Second before end - actual ending", (done) => {
      const END_AT = L_DATE_N_MONTH.clone();
      options.end_at = END_AT;

      const completedAt = L_DATE_N_MONTH.clone().subtract(1, "seconds");
      const actual = monthly(START_AT, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(EXPECTED.isSame(actual));
      done();

    });

    it("Second after end - actual ending", (done) => {
      const END_AT = L_DATE_N_MONTH.clone();
      options.end_at = END_AT;

      const completedAt = L_DATE_N_MONTH.clone().add(1, "seconds");
      const actual = monthly(START_AT, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(EXPECTED.isSame(actual));
      done();

    });
  }); // End of Non interrupt
}); // end of Get next start date
