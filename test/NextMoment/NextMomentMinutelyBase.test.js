import {
  assert
} from 'chai'
import moment from 'moment';

import NextMoment from '../../src/NextMoment';


describe("NextMoment", () => {
  describe("Get next start date", () => {
    describe("Minutely", () => {

      describe("Basic", () => {
        const repeat = "minutely";
        const TODAY = moment();
        const startAt = TODAY.clone();
        const endAt = TODAY.clone().add(2, "minutes").add(30, "seconds");
        const interval = 1;
        const options = {
          repeat,
          interval,
          end_at: endAt.toDate()
        };
        const expected = TODAY.clone().add(interval, "minutes");

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
          const completedAt = TODAY.clone().add(1, "minutes").subtract(1, "seconds");
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
