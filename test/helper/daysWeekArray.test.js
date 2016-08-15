import {
  assert
} from 'chai'
import moment from 'moment';

import {
  getDaysWeekArray
} from '../../src/helper';

describe("Helper", () => {
  describe("daysWeekArray", () => {
    describe("current month", () => {
      const TODAY = moment();
      const FIRST_DATE = TODAY.clone().startOf("months");
      const LAST_DATE = TODAY.clone().endOf("month");

      // first saturday is where we can correctly determine the first end of day week
      const ST_WK_7TH_DAY = FIRST_DATE.clone().endOf("week");

      const ST_WK_1ST_DAY = ST_WK_7TH_DAY.date() == 7 ? FIRST_DATE.clone() : ST_WK_7TH_DAY.clone().add(1, "day");
      const ST_WK_2ND_DAY = ST_WK_7TH_DAY.date() == 6 ? FIRST_DATE.clone() : ST_WK_1ST_DAY.clone().add(1, "day");
      const ST_WK_3RD_DAY = ST_WK_7TH_DAY.date() == 5 ? FIRST_DATE.clone() : ST_WK_2ND_DAY.clone().add(1, "day");
      const ST_WK_4TH_DAY = ST_WK_7TH_DAY.date() == 4 ? FIRST_DATE.clone() : ST_WK_3RD_DAY.clone().add(1, "day");
      const ST_WK_5TH_DAY = ST_WK_7TH_DAY.date() == 3 ? FIRST_DATE.clone() : ST_WK_4TH_DAY.clone().add(1, "day");
      const ST_WK_6TH_DAY = ST_WK_7TH_DAY.date() == 2 ? FIRST_DATE.clone() : ST_WK_5TH_DAY.clone().add(1, "day");

      const ND_WK_1ST_DAY = ST_WK_1ST_DAY.clone().add(1, "week");
      const ND_WK_2ND_DAY = ST_WK_2ND_DAY.clone().add(1, "week");
      const ND_WK_3RD_DAY = ST_WK_3RD_DAY.clone().add(1, "week");
      const ND_WK_4TH_DAY = ST_WK_4TH_DAY.clone().add(1, "week");
      const ND_WK_5TH_DAY = ST_WK_5TH_DAY.clone().add(1, "week");
      const ND_WK_6TH_DAY = ST_WK_6TH_DAY.clone().add(1, "week");
      const ND_WK_7TH_DAY = ST_WK_7TH_DAY.clone().add(1, "week");

      const RD_WK_1ST_DAY = ST_WK_1ST_DAY.clone().add(2, "week");
      const RD_WK_2ND_DAY = ST_WK_2ND_DAY.clone().add(2, "week");
      const RD_WK_3RD_DAY = ST_WK_3RD_DAY.clone().add(2, "week");
      const RD_WK_4TH_DAY = ST_WK_4TH_DAY.clone().add(2, "week");
      const RD_WK_5TH_DAY = ST_WK_5TH_DAY.clone().add(2, "week");
      const RD_WK_6TH_DAY = ST_WK_6TH_DAY.clone().add(2, "week");
      const RD_WK_7TH_DAY = ST_WK_7TH_DAY.clone().add(2, "week");

      const FTH_WK_1ST_DAY = ST_WK_1ST_DAY.clone().add(3, "week");
      const FTH_WK_2ND_DAY = ST_WK_2ND_DAY.clone().add(3, "week");
      const FTH_WK_3RD_DAY = ST_WK_3RD_DAY.clone().add(3, "week");
      const FTH_WK_4TH_DAY = ST_WK_4TH_DAY.clone().add(3, "week");
      const FTH_WK_5TH_DAY = ST_WK_5TH_DAY.clone().add(3, "week");
      const FTH_WK_6TH_DAY = ST_WK_6TH_DAY.clone().add(3, "week");
      const FTH_WK_7TH_DAY = ST_WK_7TH_DAY.clone().add(3, "week");

      const LT_WK_1ST_DAY = LAST_DATE.clone().startOf("week");

      it("sundays to staurdays", (done) => {
        const DAYS_WEEK_ARR = getDaysWeekArray();
        const NUM_DAYS = moment().endOf("month").date();
        let counter = 0;

        assert.isArray(DAYS_WEEK_ARR);
        assert.isAtLeast(DAYS_WEEK_ARR.length, 4);
        assert.isAtMost(DAYS_WEEK_ARR.length, 6);

        for (let i = 0; i < DAYS_WEEK_ARR.length; i++) {
          let row = DAYS_WEEK_ARR[i];

          assert.isArray(row);
          assert.isAtMost(row.length, 7);

          for (let j = 0; j < row.length; j++) {
            let dayWeek = row[j];
            if (typeof dayWeek !== 'undefined') {
              assert.isTrue(moment.isMoment(dayWeek));
              assert.equal(dayWeek.day(), j);
              counter++;
            }
          }
        }

        assert.equal(counter, NUM_DAYS);
        done();

      });

      it("date range on current month", (done) => {
        const DAYS_WEEK_ARR = getDaysWeekArray();
        const NUM_DAYS = moment().endOf("month").date();
        let counter = 0;
        let days = new Array(NUM_DAYS);

        assert.isArray(DAYS_WEEK_ARR);
        assert.isAtLeast(DAYS_WEEK_ARR.length, 4);
        assert.isAtMost(DAYS_WEEK_ARR.length, 6);

        for (let i = 0; i < DAYS_WEEK_ARR.length; i++) {
          let row = DAYS_WEEK_ARR[i];

          assert.isArray(row);
          assert.isAtMost(row.length, 7);

          for (let j = 0; j < row.length; j++) {
            let dayWeek = row[j];
            if (typeof dayWeek !== 'undefined') {
              assert.isTrue(moment.isMoment(dayWeek));

              let index = dayWeek.date() - 1;
              days[index] = true;

            }
          }
        }

        for (let i = 0; i < days.length; i++) {
          assert.isTrue(days[i], "fail on days array " + i + " index");
        }
        done();

      });

      it("4 weeks dates and last week first day", (done) => {
        let DAYS_WEEK_ARR = getDaysWeekArray();

        assert.isArray(DAYS_WEEK_ARR);
        assert.isAtLeast(DAYS_WEEK_ARR.length, 4);
        assert.isAtMost(DAYS_WEEK_ARR.length, 6);

        for (let i = 0; i < 4; i++) {
          let row = DAYS_WEEK_ARR[i];

          assert.isArray(row);
          assert.isAtMost(row.length, 7);

          for (let j = 0; j < row.length; j++) {
            assert.isTrue(moment.isMoment(row[j]));
          }
        }

        assert.isTrue(ST_WK_1ST_DAY.isSame(DAYS_WEEK_ARR[0][0], "day"));
        assert.isTrue(ST_WK_2ND_DAY.isSame(DAYS_WEEK_ARR[0][1], "day"));
        assert.isTrue(ST_WK_3RD_DAY.isSame(DAYS_WEEK_ARR[0][2], "day"));
        assert.isTrue(ST_WK_4TH_DAY.isSame(DAYS_WEEK_ARR[0][3], "day"));
        assert.isTrue(ST_WK_5TH_DAY.isSame(DAYS_WEEK_ARR[0][4], "day"));
        assert.isTrue(ST_WK_6TH_DAY.isSame(DAYS_WEEK_ARR[0][5], "day"));
        assert.isTrue(ST_WK_7TH_DAY.isSame(DAYS_WEEK_ARR[0][6], "day"));

        assert.isTrue(ND_WK_1ST_DAY.isSame(DAYS_WEEK_ARR[1][0], "day"));
        assert.isTrue(ND_WK_2ND_DAY.isSame(DAYS_WEEK_ARR[1][1], "day"));
        assert.isTrue(ND_WK_3RD_DAY.isSame(DAYS_WEEK_ARR[1][2], "day"));
        assert.isTrue(ND_WK_4TH_DAY.isSame(DAYS_WEEK_ARR[1][3], "day"));
        assert.isTrue(ND_WK_5TH_DAY.isSame(DAYS_WEEK_ARR[1][4], "day"));
        assert.isTrue(ND_WK_6TH_DAY.isSame(DAYS_WEEK_ARR[1][5], "day"));
        assert.isTrue(ND_WK_7TH_DAY.isSame(DAYS_WEEK_ARR[1][6], "day"));

        assert.isTrue(RD_WK_1ST_DAY.isSame(DAYS_WEEK_ARR[2][0], "day"));
        assert.isTrue(RD_WK_2ND_DAY.isSame(DAYS_WEEK_ARR[2][1], "day"));
        assert.isTrue(RD_WK_3RD_DAY.isSame(DAYS_WEEK_ARR[2][2], "day"));
        assert.isTrue(RD_WK_4TH_DAY.isSame(DAYS_WEEK_ARR[2][3], "day"));
        assert.isTrue(RD_WK_5TH_DAY.isSame(DAYS_WEEK_ARR[2][4], "day"));
        assert.isTrue(RD_WK_6TH_DAY.isSame(DAYS_WEEK_ARR[2][5], "day"));
        assert.isTrue(RD_WK_7TH_DAY.isSame(DAYS_WEEK_ARR[2][6], "day"));

        assert.isTrue(FTH_WK_1ST_DAY.isSame(DAYS_WEEK_ARR[3][0], "day"));
        assert.isTrue(FTH_WK_2ND_DAY.isSame(DAYS_WEEK_ARR[3][1], "day"));
        assert.isTrue(FTH_WK_3RD_DAY.isSame(DAYS_WEEK_ARR[3][2], "day"));
        assert.isTrue(FTH_WK_4TH_DAY.isSame(DAYS_WEEK_ARR[3][3], "day"));
        assert.isTrue(FTH_WK_5TH_DAY.isSame(DAYS_WEEK_ARR[3][4], "day"));
        assert.isTrue(FTH_WK_6TH_DAY.isSame(DAYS_WEEK_ARR[3][5], "day"));
        assert.isTrue(FTH_WK_7TH_DAY.isSame(DAYS_WEEK_ARR[3][6], "day"));

        const LT_WK_1ST_DAY_DAY_WEEK = LT_WK_1ST_DAY.day();
        const LT_WK_1ST_DAY_WK_NUM = Math.ceil(LT_WK_1ST_DAY.date() / 7) - 1;

        assert.isTrue(LT_WK_1ST_DAY.isSame(DAYS_WEEK_ARR[LT_WK_1ST_DAY_WK_NUM][LT_WK_1ST_DAY_DAY_WEEK], "day"));

        const LAST_DATE_DAY_WEEK = LAST_DATE.day();
        const DAYS_WEEK_ARR_LAST_ROW = DAYS_WEEK_ARR.length - 1;
        assert.isTrue(LAST_DATE.isSame(DAYS_WEEK_ARR[DAYS_WEEK_ARR_LAST_ROW][LAST_DATE_DAY_WEEK], "day"));

        done();

      });
    });
  });
});
