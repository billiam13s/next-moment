import {
  assert
} from 'chai'
import moment from 'moment';

import NextMoment from '../../src/NextMoment';


describe("NextMoment", () => {
  describe("Get next start date", () => {
    describe("Monthly", () => {
      describe("Basic - Day of the Month", () => {
        const repeat = "monthly";
        const TODAY = moment();
        const startAt = TODAY.clone();
        const endAt = TODAY.clone().add(2, "months").add(1, "days");
        const monthlyRepeatBy = "day_of_month";
        const interval = 1;
        const options = {
          repeat,
          interval,
          "monthly_repeat_by": monthlyRepeatBy,
          end_at: endAt.toDate()
        };
        const expected = TODAY.clone().add(interval, "months");

        it("Second before start", (done) => {
          const completedAt = TODAY.clone().subtract(1, "seconds");
          let nextMoment = new NextMoment(startAt.toDate(), options, completedAt.clone());
          const actual = nextMoment.getNext();

          assert.typeOf(actual, "Date");
          assert.isTrue(expected.isSame(actual));
          done();

        });

        it("Second after start", (done) => {
          const completedAt = TODAY.clone().add(1, "seconds");
          let nextMoment = new NextMoment(startAt.toDate(), options, completedAt.clone());
          const actual = nextMoment.getNext();

          assert.typeOf(actual, "Date");
          assert.isTrue(expected.isSame(actual));
          done();

        });

        it("Second before first repeat", (done) => {
          const completedAt = TODAY.clone().add(1, "months").subtract(1, "seconds");
          let nextMoment = new NextMoment(startAt.toDate(), options, completedAt.clone());
          const actual = nextMoment.getNext();

          assert.typeOf(actual, "Date");
          assert.isTrue(expected.isSame(actual));
          done();

        });

      }); // end of basic describe function

    });
  });
});
