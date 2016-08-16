import {
  assert
} from 'chai'
import moment from 'moment';
import {
  getDaysWeekArray
} from '../../src/helper';
import basicTest from './monthlyDayWeekBaseTest';

import monthly from '../../src/monthly';


describe("monthly", () => {
  const TODAY = moment();
  const ND_MONTH_TODAY = TODAY.clone().add(1, "months");
  const RD_MONTH_TODAY = TODAY.clone().add(2, "months");
  const FTH_MONTH_TODAY = TODAY.clone().add(3, "months");
  const VTH_MONTH_TODAY = TODAY.clone().add(4, "months");
  const STH_MONTH_TODAY = TODAY.clone().add(5, "months");

  const ND_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(ND_MONTH_TODAY);
  const RD_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(RD_MONTH_TODAY);
  const FTH_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(FTH_MONTH_TODAY);
  const VTH_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(VTH_MONTH_TODAY);
  const STH_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(STH_MONTH_TODAY);

  const DAY_OF_WEEK = TODAY.day();
  const WK_NUM = Math.ceil(TODAY.date() / 7) - 1;

  const ND_MONTH_EXPECTED = ND_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
  const RD_MONTH_EXPECTED = RD_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
  const FTH_MONTH_EXPECTED = FTH_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
  const VTH_MONTH_EXPECTED = VTH_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
  const STH_MONTH_EXPECTED = STH_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];

  describe("Interrupt", () => {
    basicTest();

    const START_AT = TODAY.clone();
    const END_AT = RD_MONTH_EXPECTED.clone().add(1, "days");
    const INTERVAL = 1;
    const OPTIONS = {
      "interval": INTERVAL,
      "monthly_repeat_by": "day_of_week",
      "end_at": END_AT,
      "interrupt": true
    };

    it("Second after first repeat", (done) => {
      const COMPLETED_AT = ND_MONTH_EXPECTED.clone().add(1, "seconds");
      const EXPECTED = RD_MONTH_EXPECTED.clone();
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second before last repeat", (done) => {
      const COMPLETED_AT = RD_MONTH_EXPECTED.clone().subtract(1, "seconds");
      const EXPECTED = RD_MONTH_EXPECTED.clone();
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second after last repeat", (done) => {
      const COMPLETED_AT = RD_MONTH_EXPECTED.clone().add(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isFalse(ACTUAL);
      done();

    });

    it("Second before end", (done) => {
      const COMPLETED_AT = FTH_MONTH_EXPECTED.clone().subtract(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isFalse(ACTUAL);
      done();

    });

    it("Second after end", (done) => {
      const COMPLETED_AT = FTH_MONTH_EXPECTED.clone().add(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isFalse(ACTUAL);
      done();

    });
  }); // end of Interrupt

  describe("Interrupt 2 months INTERVAL 6 months length", () => {
    const START_AT = TODAY.clone();
    const END_AT = STH_MONTH_EXPECTED.clone();
    const INTERVAL = 2;
    const OPTIONS = {
      "interval": INTERVAL,
      "monthly_repeat_by": "day_of_week",
      "end_at": END_AT,
      "interrupt": true
    };
    const EXPECTED = RD_MONTH_EXPECTED.clone();

    it("Second before start", (done) => {
      const COMPLETED_AT = TODAY.clone().subtract(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second after start", (done) => {
      const COMPLETED_AT = TODAY.clone().add(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second before first repeat", (done) => {
      const COMPLETED_AT = RD_MONTH_EXPECTED.clone().subtract(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second after first repeat", (done) => {
      const COMPLETED_AT = RD_MONTH_EXPECTED.clone().add(1, "seconds");
      const EXPECTED = VTH_MONTH_EXPECTED.clone();
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second before last repeat", (done) => {
      const COMPLETED_AT = VTH_MONTH_EXPECTED.clone().subtract(1, "seconds");
      const EXPECTED = VTH_MONTH_EXPECTED.clone();
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isTrue(moment.isMoment(ACTUAL));
      assert.isTrue(EXPECTED.isSame(ACTUAL));
      done();

    });

    it("Second after last repeat", (done) => {
      const COMPLETED_AT = VTH_MONTH_EXPECTED.clone().add(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isFalse(ACTUAL);
      done();

    });

    it("Second before end", (done) => {
      const COMPLETED_AT = STH_MONTH_EXPECTED.clone().subtract(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isFalse(ACTUAL);
      done();

    });

    it("Second after end", (done) => {
      const COMPLETED_AT = STH_MONTH_EXPECTED.clone().add(1, "seconds");
      const ACTUAL = monthly(START_AT, OPTIONS, COMPLETED_AT.clone());

      assert.isFalse(ACTUAL);
      done();

    });
  }); // Interrupt 2 months INTERVAL 6 months length

}); // end of Get next start date
