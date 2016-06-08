import {
  assert
} from 'chai'
import moment from 'moment';

import hourly from '../../src/hourly';


export default function() {
  describe("Basic", () => {
    const TODAY = moment();
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "hours").add(30, "minutes");
    const interval = 1;
    const options = {
      "interval": interval,
      "end_at": endAt,
    };
    const expected = TODAY.clone().add(interval, "hours");

    it("Second before start", function(done) {
      const completedAt = TODAY.clone().subtract(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after start", function(done) {
      const completedAt = TODAY.clone().add(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before first repeat", function(done) {
      const completedAt = TODAY.clone().add(1, "hours").subtract(1, "seconds");
      const actual = hourly(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

  }); // end of basic describe function
};
