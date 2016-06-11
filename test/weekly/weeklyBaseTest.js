import {
  assert
} from 'chai'
import moment from 'moment';

import weekly from '../../src/weekly';


export default function() {
  describe("Basic", () => {
    const TODAY = moment();
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "weeks").add(1, "days");
    const interval = 1;
    const options = {
      "interval": interval,
      "end_at": endAt
    };
    const expected = TODAY.clone().add(interval, "weeks");

    it("Second before start", (done) => {
      const completedAt = TODAY.clone().subtract(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after start", (done) => {
      const completedAt = TODAY.clone().add(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before first repeat", (done) => {
      const completedAt = TODAY.clone().add(1, "weeks").subtract(1, "seconds");
      const actual = weekly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

  }); // end of basic describe function
}; // end of basic function
