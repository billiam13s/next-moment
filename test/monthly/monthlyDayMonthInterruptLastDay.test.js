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

  describe("Interrupt - Stick to last day of month", () => {
    const START_AT = L_DATE_C_MONTH.clone();
    const END_AT = ST_DAY_3RD_MONTH.clone();
    const MONTHLY_REPEAT_BY = "day_of_month";
    const INTERVAL = 1;
    const OPTIONS = {
      "interval": INTERVAL,
      "monthly_repeat_by": MONTHLY_REPEAT_BY,
      "stick_to_last_day": true,
      "end_at": END_AT,
      "interrupt": true
    };

    it("Second before start", (done) => {
      const COMPLETED_AT = L_DATE_C_MONTH.clone().subtract(1, "seconds");
      const EXPECTED = L_DATE_N_MONTH.clone();
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second after start", (done) => {
      const COMPLETED_AT = L_DATE_C_MONTH.clone().add(1, "seconds");
      const EXPECTED = L_DATE_N_MONTH.clone()
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second before first repeat", (done) => {
      const COMPLETED_AT = L_DATE_N_MONTH.clone().subtract(1, "seconds");
      const EXPECTED = L_DATE_N_MONTH.clone()
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second after first repeat", (done) => {
      const COMPLETED_AT = L_DATE_N_MONTH.clone().add(1, "seconds");
      const EXPECTED = L_DATE_2ND_MONTH.clone();
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second before last repeat", (done) => {
      const COMPLETED_AT = L_DATE_2ND_MONTH.clone().subtract(1, "seconds");
      const EXPECTED = L_DATE_2ND_MONTH.clone();
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second after last repeat", (done) => {
      const COMPLETED_AT = L_DATE_2ND_MONTH.clone().add(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isFalse(ACTUAL);
      done();

    });

    it("Second before end", (done) => {
      const COMPLETED_AT = L_DATE_3RD_MONTH.clone().subtract(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isFalse(ACTUAL);
      done();

    });

    it("Second after end", (done) => {
      const COMPLETED_AT = L_DATE_3RD_MONTH.clone().add(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isFalse(ACTUAL);
      done();

    });
  }); // end of Interrupt
}); // end of Get next start date
