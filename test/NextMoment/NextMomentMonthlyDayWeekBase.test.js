import {
  assert
} from 'chai'
import moment from 'moment';
import {
  getDaysWeekArray
} from '../../src/helper';

import NextMoment from '../../src/NextMoment';


describe("NextMoment", () => {
  describe("Get next start date", () => {
    describe("Monthly", () => {
      const TODAY = moment();
      const ND_MONTH_TODAY = TODAY.clone().add(1, "months");
      const RD_MONTH_TODAY = TODAY.clone().add(2, "months");

      const ND_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(ND_MONTH_TODAY);
      const RD_MONTH_DAYS_WEEK_ARR = getDaysWeekArray(RD_MONTH_TODAY);

      const DAY_OF_WEEK = TODAY.day();
      const WK_NUM = Math.ceil(TODAY.date() / 7) - 1;

      const ND_MONTH_EXPECTED = ND_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];
      const RD_MONTH_EXPECTED = RD_MONTH_DAYS_WEEK_ARR[WK_NUM][DAY_OF_WEEK];

      describe("Basic - Day of the Month", () => {
        const REPEAT = "monthly";
        const START_AT = TODAY.clone();
        const END_AT = RD_MONTH_EXPECTED.clone().add(1, "days");
        const INTERVAL = 1;
        const OPTIONS = {
          "repeat": REPEAT,
          "interval": INTERVAL,
          "monthly_repeat_by": "day_of_week",
          "end_at": END_AT
        };

        const EXPECTED = ND_MONTH_EXPECTED;

        it("Second before start", (done) => {
          const COMPLETED_AT = EXPECTED.clone().subtract(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));
          done();

        });

        it("Second after start", (done) => {
          const COMPLETED_AT = EXPECTED.clone().add(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));
          done();

        });

        it("Second before first repeat", (done) => {
          const COMPLETED_AT = EXPECTED.clone().add(1, "weeks").subtract(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));
          done();

        });

      }); // end of basic describe function

    });
  });
});
