import {
  assert
} from 'chai'
import moment from 'moment';
import {
  getDaysWeekArray
} from '../../src/helper';

import monthly from '../../src/monthly';


describe("monthly", () => {
  describe("Non interrupt", () => {
    const TODAY = moment();
    const ND_MONTH_TODAY = TODAY.clone().add(1, "months");
    const RD_MONTH_TODAY = TODAY.clone().add(2, "months");
    const FTH_MONTH_TODAY = TODAY.clone().add(3, "months");
    const VTH_MONTH_TODAY = TODAY.clone().add(4, "months");
    const STH_MONTH_TODAY = TODAY.clone().add(5, "months");

    const C_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(TODAY);
    const ND_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(ND_MONTH_TODAY);
    const RD_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(RD_MONTH_TODAY);
    const FTH_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(FTH_MONTH_TODAY);
    const VTH_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(VTH_MONTH_TODAY);
    const STH_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(STH_MONTH_TODAY);

    describe("First Sunday", () => {
      // First Sunday
      const DAY_OF_WEEK = 0;
      const WK_NUM = 0;

      const ND_MONTH_EXPECTED = ND_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
      const RD_MONTH_EXPECTED = RD_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
      const FTH_MONTH_EXPECTED = FTH_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
      const VTH_MONTH_EXPECTED = VTH_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
      const STH_MONTH_EXPECTED = STH_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];

      const START_AT = C_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK].clone();
      const END_AT = RD_MONTH_EXPECTED.clone().add(1, "days");
      const INTERVAL = 1;
      const options = {
        "interval": INTERVAL,
        "monthly_repeat_by": "day_of_week",
        "end_at": END_AT
      };

      const EXPECTED = ND_MONTH_EXPECTED;

      it("Second before start", (done) => {
        const COMPLETED_AT = START_AT.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after start", (done) => {
        const COMPLETED_AT = START_AT.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second before first repeat", (done) => {
        const COMPLETED_AT = ND_MONTH_EXPECTED.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after first repeat", (done) => {
        const COMPLETED_AT = ND_MONTH_EXPECTED.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second before last repeat", (done) => {
        const COMPLETED_AT = RD_MONTH_EXPECTED.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after last repeat", (done) => {
        const COMPLETED_AT = RD_MONTH_EXPECTED.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second before end", (done) => {
        const COMPLETED_AT = END_AT.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after end", (done) => {
        const COMPLETED_AT = END_AT.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second before end - ACTUAL ending", (done) => {
        const END_AT = ND_MONTH_EXPECTED.clone();
        options.end_at = END_AT;

        const COMPLETED_AT = ND_MONTH_EXPECTED.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after end - ACTUAL ending", (done) => {
        const END_AT = ND_MONTH_EXPECTED.clone();
        options.end_at = END_AT;

        const COMPLETED_AT = ND_MONTH_EXPECTED.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });
    }); // End of Frist Sunday

    describe("First Monday", () => {
      // First Monday
      const DAY_OF_WEEK = 1;
      const WK_NUM = 0;

      const ND_MONTH_EXPECTED = ND_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
      const RD_MONTH_EXPECTED = RD_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
      const FTH_MONTH_EXPECTED = FTH_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
      const VTH_MONTH_EXPECTED = VTH_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
      const STH_MONTH_EXPECTED = STH_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];

      const START_AT = C_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK].clone();
      const END_AT = RD_MONTH_EXPECTED.clone().add(1, "days");
      const INTERVAL = 1;
      const options = {
        "interval": INTERVAL,
        "monthly_repeat_by": "day_of_week",
        "end_at": END_AT
      };

      const EXPECTED = ND_MONTH_EXPECTED;

      it("Second before start", (done) => {
        const COMPLETED_AT = START_AT.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after start", (done) => {
        const COMPLETED_AT = START_AT.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second before first repeat", (done) => {
        const COMPLETED_AT = ND_MONTH_EXPECTED.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after first repeat", (done) => {
        const COMPLETED_AT = ND_MONTH_EXPECTED.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second before last repeat", (done) => {
        const COMPLETED_AT = RD_MONTH_EXPECTED.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after last repeat", (done) => {
        const COMPLETED_AT = RD_MONTH_EXPECTED.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second before end", (done) => {
        const COMPLETED_AT = END_AT.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after end", (done) => {
        const COMPLETED_AT = END_AT.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second before end - ACTUAL ending", (done) => {
        const END_AT = ND_MONTH_EXPECTED.clone();
        options.end_at = END_AT;

        const COMPLETED_AT = ND_MONTH_EXPECTED.clone().subtract(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });

      it("Second after end - ACTUAL ending", (done) => {
        const END_AT = ND_MONTH_EXPECTED.clone();
        options.end_at = END_AT;

        const COMPLETED_AT = ND_MONTH_EXPECTED.clone().add(1, "seconds");
        const ACTUAL = monthly(START_AT, options, COMPLETED_AT.clone());

        assert.isTrue(moment.isMoment(ACTUAL));
        assert.isTrue(EXPECTED.isSame(ACTUAL));
        done();

      });
    }); // End of Frist Monday

  }); // End of Non interrupt
}); // end of Get next start date
