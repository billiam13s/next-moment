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

  describe("Interrupt 2ds wk 2wks interval 5wks length", () => {
    const endAt = SUNDAY.clone().add(4, "weeks").add(3, "days");
    const interval = 2;
    const daysWk = ["monday", "friday"];
    const options = {
      "interval": interval,
      "end_at": endAt,
      "days_week": daysWk,
      "interrupt": true
    };

    describe("Sun", () => {
      const startAt = SUNDAY.clone();

      it("Second before 1st Mon repeat", (done) => {
        const completedAt = MONDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(MONDAY.isSame(actual));
        done();

      });

      it("Second after 1st Mon repeat", (done) => {
        const completedAt = MONDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(FRIDAY.isSame(actual));
        done();

      });

      it("Second before 1st Fri repeat", (done) => {
        const completedAt = FRIDAY.clone().subtract(1, "seconds");
        //const expected    = FRIDAY.clone();
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(FRIDAY.isSame(actual));
        done();

      });

      it("Second after 1st Fri repeat", (done) => {
        const completedAt = FRIDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(RD_MONDAY.isSame(actual));
        done();

      });

      it("Second before 3rd Mon repeat", (done) => {
        const completedAt = RD_MONDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(RD_MONDAY.isSame(actual));
        done();

      });

      it("Second after 3rd Mon repeat", (done) => {
        const completedAt = RD_MONDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(RD_FRIDAY.isSame(actual));
        done();

      });

      it("Second before 3rd Fri repeat", (done) => {
        const completedAt = RD_FRIDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(RD_FRIDAY.isSame(actual));
        done();

      });

      it("Second after 3rd Fri repeat", (done) => {
        const completedAt = RD_FRIDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(FI_MONDAY.isSame(actual));
        done();

      });

      it("Second before 5th Mon repeat", (done) => {
        const completedAt = FI_MONDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(FI_MONDAY.isSame(actual));
        done();

      });

      it("Second after 5th Mon repeat", (done) => {
        const completedAt = FI_MONDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isFalse(actual);
        done();

      });

      it("Second before end Mon - actual ending", (done) => {
        const options = {
          "interval": interval,
          "end_at": MONDAY.clone(),
          "days_week": daysWk,
          "interrupt": true
        };
        const completedAt = MONDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(MONDAY.isSame(actual));
        done();

      });

      it("Second after end Mon - actual ending", (done) => {
        const options = {
          "interval": interval,
          "end_at": MONDAY.clone(),
          "days_week": daysWk,
          "interrupt": true
        };
        const completedAt = MONDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isFalse(actual);
        done();

      });

      it("Second before end Fri - actual ending", (done) => {
        const options = {
          "interval": interval,
          "end_at": FRIDAY.clone(),
          "days_week": daysWk,
          "interrupt": true
        };
        const completedAt = FRIDAY.clone().subtract(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(FRIDAY.isSame(actual));
        done();

      });

      it("Second after end Fri - actual ending", (done) => {
        const options = {
          "interval": interval,
          "end_at": FRIDAY.clone(),
          "days_week": daysWk,
          "interrupt": true
        };
        const completedAt = FRIDAY.clone().add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isFalse(actual);
        done();

      });
    }); // end of Interrupt 2ds wk 2wks interval 5wks length.Sun

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
        assert.isTrue(RD_MONDAY.isSame(actual));
        done();

      });
    }); // end of Interrupt 2ds wk 2wks interval 5wks length.Mon

    describe("FRI", () => {
      const startAt = FRIDAY.clone();
      const expected = RD_MONDAY.clone();

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
    }); // end of Interrupt 2ds wk 2wks interval 5wks length.FRI
  }); // end of Interrupt 2ds wk 2wks interval 5wks length
});
