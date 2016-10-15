import {
  assert
} from 'chai'
import moment from 'moment';

import NextMoment from '../../src/NextMoment';


describe("NextMoment", () => {
  describe("Get next start date", () => {
    describe("Daily", () => {

      describe("Basic", () => {
        const repeat = "daily";
        const TODAY = moment();
        const startAt = TODAY.clone();
        const endAt = TODAY.clone().add(2, "days").add(1, 'hours');
        const interval = 1;
        const options = {
          repeat,
          interval,
          end_at: endAt.toDate()
        };
        const expected = TODAY.clone().add(interval, "days");

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
          const completedAt = TODAY.clone().add(1, "days").subtract(1, "seconds");
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
