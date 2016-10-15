import {
  assert
} from 'chai'
import moment from 'moment';

import NextMoment from '../../src/NextMoment';


describe("NextMoment", () => {
  describe("Get next start date", () => {
    const TODAY = moment();

    describe("Hourly", () => {
      const REPEAT = "hourly";
      const START_AT = TODAY.clone();
      const END_AT = TODAY.clone().add(3, "hours");
      const INTERVAL = 1;
      const OPTIONS = {
        "repeat": REPEAT,
        "interval": INTERVAL,
        "end_at": END_AT.toDate()
      };
      const EXPECTED = TODAY.clone().add(INTERVAL, "hours");

      describe("Basic", () => {
        it("Second before start", (done) => {
          const COMPLETED_AT = TODAY.clone().subtract(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));
          done();

        });

        it("Second after start", (done) => {
          const COMPLETED_AT = TODAY.clone().add(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));
          done();

        });

        it("Second before first repeat", (done) => {
          const COMPLETED_AT = TODAY.clone().add(1, "hours").subtract(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));
          done();

        });
      }); // end of basic

      // Non interrupt
      describe("Non interrupt", () => {
        it("Second after first repeat", (done) => {
          const COMPLETED_AT = TODAY.clone().add(1, "hours").add(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));
          done();

        });
      }); // end of non interrupt

      // Interrupt
      describe("Interrupt", () => {
        it("Second after first repeat", (done) => {
          const OPTIONS = {
            "repeat": REPEAT,
            "interval": INTERVAL,
            "END_AT": END_AT.toDate(),
            "interrupt": true
          };
          const COMPLETED_AT = TODAY.clone().add(1, "hours").add(1, "seconds");
          const EXPECTED = TODAY.clone().add(2, "hours");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));
          done();

        });
      }); // end of interrupt

      describe("getNext() getNext()", () => {
        const SECOND_EXPECTED = EXPECTED.clone().add(INTERVAL, "hours");
        const THRID_EXPECTED = SECOND_EXPECTED.clone().add(INTERVAL, "hours");

        it("Second before start", (done) => {
          const COMPLETED_AT = TODAY.clone().subtract(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();
          const SECOND_ACTUAL = nextMoment.getNext();
          const THRID_ACTUAL = nextMoment.getNext();
          const FOURTH_ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));

          assert.typeOf(SECOND_ACTUAL, "Date");
          assert.isTrue(SECOND_EXPECTED.isSame(SECOND_ACTUAL));

          assert.typeOf(THRID_ACTUAL, "Date");
          assert.isTrue(THRID_EXPECTED.isSame(THRID_ACTUAL));

          assert.isFalse(FOURTH_ACTUAL);
          done();

        });

        it("Second after start", (done) => {
          const COMPLETED_AT = TODAY.clone().add(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();
          const SECOND_ACTUAL = nextMoment.getNext();
          const THRID_ACTUAL = nextMoment.getNext();
          const FOURTH_ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));

          assert.typeOf(SECOND_ACTUAL, "Date");
          assert.isTrue(SECOND_EXPECTED.isSame(SECOND_ACTUAL));

          assert.typeOf(THRID_ACTUAL, "Date");
          assert.isTrue(THRID_EXPECTED.isSame(THRID_ACTUAL));

          assert.isFalse(FOURTH_ACTUAL);
          done();

        });

        it("Second before first repeat", (done) => {
          const COMPLETED_AT = TODAY.clone().add(1, "hours").subtract(1, "seconds");
          let nextMoment = new NextMoment(START_AT.toDate(), OPTIONS, COMPLETED_AT.clone());
          const ACTUAL = nextMoment.getNext();
          const SECOND_ACTUAL = nextMoment.getNext();
          const THRID_ACTUAL = nextMoment.getNext();
          const FOURTH_ACTUAL = nextMoment.getNext();

          assert.typeOf(ACTUAL, "Date");
          assert.isTrue(EXPECTED.isSame(ACTUAL));

          assert.typeOf(SECOND_ACTUAL, "Date");
          assert.isTrue(SECOND_EXPECTED.isSame(SECOND_ACTUAL));

          assert.typeOf(THRID_ACTUAL, "Date");
          assert.isTrue(THRID_EXPECTED.isSame(THRID_ACTUAL));

          assert.isFalse(FOURTH_ACTUAL);
          done();

        });
      }); // end of getNext() getNext()

    }); // end of Hourly
  }); // end of Get next start date

});
