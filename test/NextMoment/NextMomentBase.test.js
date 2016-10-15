import {
  assert
} from 'chai'
import moment from 'moment';

import NextMoment from '../../src/NextMoment';


describe("NextMoment", () => {
  describe("Get next start date", () => {
    it("unexists repeat type", (done) => {
      const repeat = "";
      const TODAY = moment();
      const startAt = TODAY.clone();
      const interval = 1;
      const options = {
        repeat,
        interval
      };
      const completedAt = TODAY.clone().subtract(1, "seconds");
      let nextMoment = new NextMoment(startAt.toDate(), options, completedAt.clone());
      const actual = nextMoment.getNext();

      assert.isFalse(actual);
      done();

    }); // end of basic describe function

  });
});
