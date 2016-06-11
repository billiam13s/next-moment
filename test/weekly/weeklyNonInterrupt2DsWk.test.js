import {
  assert
} from 'chai'
import moment from 'moment';

import weekly from '../../src/weekly';

describe("weekly", () => {
  const TODAY = moment();
  const SUNDAY = TODAY.clone().day("sunday");
  const MONDAY = TODAY.clone().day("monday");
  const TUESDAY = TODAY.clone().day("tuesday");
  const THURSDAY = TODAY.clone().day("thursday");
  const FRIDAY = TODAY.clone().day("friday");
  const SATURDAY = TODAY.clone().day("saturday");
  const ND_MONDAY = MONDAY.clone().add(1, "weeks");
  const ND_FRIDAY = FRIDAY.clone().add(1, "weeks");
  const RD_MONDAY = MONDAY.clone().add(2, "weeks");
  const RD_FRIDAY = FRIDAY.clone().add(2, "weeks");
  const FI_MONDAY = MONDAY.clone().add(4, "weeks");

  describe("Non interrupt 2ds a wk", () => {
    const endAt = SUNDAY.clone().add(2, "weeks").add(3, "days");
    const interval = 1;
    const daysWk = ["monday", "friday"];
    const options = {
      "interval": interval,
      "end_at": endAt,
      "days_week": daysWk
    };

    describe("Sun", () => {
      const startAt = SUNDAY.clone();
      const expected = MONDAY.clone();

      it("Second before 1st Mon repeat", (done) => {
        const completedAt = MONDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after 1st Mon repeat", (done) => {
        const completedAt = MONDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());


        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before 1st Fri repeat", (done) => {
        const completedAt = FRIDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after 1st Fri repeat", (done) => {
        const completedAt = FRIDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before 2nd Mon repeat", (done) => {
        const completedAt = ND_MONDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after 2nd Mon repeat", (done) => {
        const completedAt = ND_MONDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before 2nd Fri repeat", (done) => {
        const completedAt = ND_FRIDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after 2nd Fri repeat", (done) => {
        const completedAt = ND_FRIDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before end", (done) => {
        const completedAt = endAt.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after end", (done) => {
        const completedAt = endAt.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before end Mon - actual ending", (done) => {
        const options = {
          "interval": interval,
          "end_at": MONDAY.clone(),
          "days_week": daysWk
        }
        const completedAt = MONDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after end Mon - actual ending", (done) => {
        const options = {
          "interval": interval,
          "end_at": MONDAY.clone(),
          "days_week": daysWk
        };
        const completedAt = MONDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before end Fri - actual ending", (done) => {
        const options = {
          "interval": interval,
          "end_at": FRIDAY.clone(),
          "days_week": daysWk
        };
        const completedAt = FRIDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after end Fri - actual ending", (done) => {
        const options = {
          "interval": interval,
          "end_at": FRIDAY.clone(),
          "days_week": daysWk,
        }
        const completedAt = FRIDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });
    }); // end Non interrupt 2ds a wk.Sun

    describe("Mon", () => {
      const startAt = MONDAY.clone();
      const expected = FRIDAY.clone();

      it("Second before 1st Mon repeat", (done) => {
        const completedAt = MONDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after 1st Mon repeat", (done) => {
        const completedAt = MONDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before 1st Fri repeat", (done) => {
        const completedAt = FRIDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after 1st Fri repeat", (done) => {
        const completedAt = FRIDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });
    }); // end of Non interrupt 2ds a wk.Mon

    describe("FRI", () => {
      const startAt = FRIDAY.clone();
      const expected = ND_MONDAY.clone();

      it("Second before 1st Mon repeat", (done) => {
        const completedAt = MONDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after 1st Mon repeat", (done) => {
        const completedAt = MONDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before 1st Fri repeat", (done) => {
        const completedAt = FRIDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after 1st Fri repeat", (done) => {
        const completedAt = FRIDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });
    }); // end of Non interrupt 2ds a wk.FRI
  }); // end of Non interrupt 2ds a wk
})
