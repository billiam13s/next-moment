import {
  assert
} from 'chai'
import moment from 'moment';

import weekly from '../../src/weekly';


describe("weekly", () => {
  const TODAY = moment();

  describe("Override Interrupt", () => {
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "weeks").add(1, "days");
    const interval = 1;

    describe("Non Interrupt", () => {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": false
      };

      it("Second after first repeat - global", (done) => {

        const completedAt = TODAY.clone().add(1, "weeks").add(1, "seconds");
        const expected = TODAY.clone().add(interval, "weeks");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before last repeat - global", (done) => {
        const completedAt = TODAY.clone().add(2, "weeks").subtract(1, "seconds");
        const expected = TODAY.clone().add(interval, "weeks");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after last repeat - global", (done) => {
        const completedAt = TODAY.clone().add(2, "weeks").add(1, "seconds");
        const expected = TODAY.clone().add(interval, "weeks");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });
    });

    describe("Interrupt", () => {
      const options = {
        "interval": interval,
        "end_at": endAt,
        "interrupt": true
      };

      it("Second after first repeat - data", (done) => {
        const completedAt = TODAY.clone().add(1, "weeks").add(1, "seconds");
        const expected = TODAY.clone().add(2, "weeks");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second before last repeat - data", (done) => {
        const completedAt = TODAY.clone().add(2, "weeks").subtract(1, "seconds");
        const expected = TODAY.clone().add(2, "weeks");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isTrue(moment.isMoment(actual));
        assert.isTrue(expected.isSame(actual));
        done();

      });

      it("Second after last repeat - data", (done) => {
        const completedAt = TODAY.clone().add(2, "weeks").add(1, "seconds");
        const actual = weekly(startAt, options, completedAt.clone());

        assert.isFalse(actual);
        done();

      });
    });
  }); // end of Override Interrupt
}); // end of Get next start date
