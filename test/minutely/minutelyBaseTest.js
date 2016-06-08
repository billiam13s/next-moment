import {
  assert
} from 'chai'
import moment from 'moment';

import minutely from '../../src/minutely';


export default function() {
  describe("Basic", () => {
    const TODAY = moment();
    const startAt = TODAY.clone();
    const endAt = TODAY.clone().add(2, "minutes").add(30, "seconds");
    const interval = 1;
    const options = {
      "interval": interval,
      "end_at": endAt
    };
    const expected = TODAY.clone().add(interval, "minutes");

    it("Second before start", (done) => {
      const completedAt = TODAY.clone().subtract(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second after start", (done) => {
      const completedAt = TODAY.clone().add(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

    it("Second before first repeat", (done) => {
      const completedAt = TODAY.clone().add(1, "minutes").subtract(1, "seconds");
      const actual = minutely(startAt, options, completedAt.clone());

      assert.isTrue(moment.isMoment(actual));
      assert.isTrue(expected.isSame(actual));
      done();

    });

  }); // end of basic describe function
};
