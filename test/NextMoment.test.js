import {
  assert
} from 'chai'
import moment from 'moment';

import NextMoment from '../src/NextMoment';


describe("NextMoment", () => {
  describe("Get next start date", () => {
    const TODAY = moment();

    describe("Hourly", () => {
      const REPEAT = "hourly";
      const startAt = TODAY.clone();
      const endAt = TODAY.clone().add(3, "hours");
      const interval = 1;
      const options = {
        "repeat": REPEAT,
        "interval": interval,
        "end_at": endAt.toDate()
      };
      const expected = TODAY.clone().add(interval, "hours");

      describe("Basic", () => {
        it("Second before start", (done) => {
          const completedAt = TODAY.clone().subtract(1, "seconds");
          const nextMoment = new NextMoment(startAt.toDate(), options, completedAt.clone());
          const actual = nextMoment.getNext();

          assert.typeOf(actual, "Date");
          assert.isTrue(expected.isSame(actual));
          done();

        });

        it("Second after start", (done) => {
          const completedAt = TODAY.clone().add(1, "seconds");
          const nextMoment = new NextMoment(startAt.toDate(), options, completedAt.clone());
          const actual = nextMoment.getNext();

          assert.typeOf(actual, "Date");
          assert.isTrue(expected.isSame(actual));
          done();

        });

        it("Second before first repeat", (done) => {
          const completedAt = TODAY.clone().add(1, "hours").subtract(1, "seconds");
          const nextMoment = new NextMoment(startAt.toDate(), options, completedAt.clone());
          const actual = nextMoment.getNext();

          assert.typeOf(actual, "Date");
          assert.isTrue(expected.isSame(actual));
          done();

        });
      }); // end of basic

      // Non interrupt
      describe("Non interrupt", () => {
        it("Second after first repeat", (done) => {
          const completedAt = TODAY.clone().add(1, "hours").add(1, "seconds");
          const nextMoment = new NextMoment(startAt.toDate(), options, completedAt.clone());
          const actual = nextMoment.getNext();

          assert.typeOf(actual, "Date");
          assert.isTrue(expected.isSame(actual));
          done();

        });
      }); // end of non interrupt

      // Interrupt
      describe("Interrupt", () => {
        it("Second after first repeat", (done) => {
          const options = {
            "repeat": REPEAT,
            "interval": interval,
            "end_at": endAt.toDate(),
            "interrupt": true
          };
          const completedAt = TODAY.clone().add(1, "hours").add(1, "seconds");
          const expected = TODAY.clone().add(2, "hours");
          const nextMoment = new NextMoment(startAt.toDate(), options, completedAt.clone());
          const actual = nextMoment.getNext();

          assert.typeOf(actual, "Date");
          assert.isTrue(expected.isSame(actual));
          done();

        });
      }); // end of interrupt

    }); // end of Hourly
  }); // end of Get next start date

});
