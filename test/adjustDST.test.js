import {
  assert
} from 'chai'
import moment from 'moment';

import adjustDST from '../src/adjustDST';

// 2015 Canada EST Daylight Saving times
describe("Helper", () => {
  describe("Adjust Daylight Saving Time", () => {
    describe("with invalid input", () => {
      it("should fail with non moment", (done) => {
        assert.isFalse(adjustDST(new Date, moment()));
        assert.isFalse(adjustDST(moment(), new Date));
        done();
      });

    });

    describe("Spring forward", () => {
      const DST_2015_STARTED_PRE = moment('2015-03-08T05:59:59.000Z'); // 00:59am
      const DST_2015_STARTED_START = moment('2015-03-08T06:00:00.000Z'); // 1:00am
      const DST_2015_STARTED_END = moment('2015-03-08T06:59:59.000Z'); // 1:59am
      const DST_2015_STARTED_POST = moment('2015-03-08T07:00:00.000Z'); // 3:00am

      describe("non adjustment", () => {
        it(DST_2015_STARTED_START.format(), (done) => {
          const orginal = DST_2015_STARTED_PRE.clone();
          const target = DST_2015_STARTED_START.clone();
          const expected = target.clone();
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });

        it(DST_2015_STARTED_END.format(), (done) => {
          const orginal = DST_2015_STARTED_PRE.clone();
          const target = DST_2015_STARTED_END.clone();
          const expected = target.clone();
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });
      });

      describe("subtract 1 hour " + DST_2015_STARTED_POST.format(), () => {
        it(DST_2015_STARTED_PRE.format(), (done) => {
          const orginal = DST_2015_STARTED_PRE.clone();
          const target = DST_2015_STARTED_POST.clone();
          const expected = target.clone().subtract(1, "hours");
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });

        it(DST_2015_STARTED_START.format(), (done) => {
          const orginal = DST_2015_STARTED_START.clone();
          const target = DST_2015_STARTED_POST.clone();
          const expected = target.clone().subtract(1, "hours");
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });

        it(DST_2015_STARTED_END.format(), (done) => {
          const orginal = DST_2015_STARTED_END.clone();
          const target = DST_2015_STARTED_POST.clone();
          const expected = target.clone().subtract(1, "hours");
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });
      });
    });

    describe("Fall back", () => {
      const DST_2015_ENDED_PRE = moment('2015-11-01T04:59:59.000Z'); // 00:59am
      const DST_2015_ENDED_START = moment('2015-11-01T05:00:00.000Z'); // 1:00am
      const DST_2015_ENDED_END = moment('2015-11-01T05:59:59.000Z'); // 1:59am
      const DST_2015_ENDED_POST = moment('2015-11-01T06:00:00.000Z'); // 1:00am

      describe("non adjustment", () => {
        it(DST_2015_ENDED_START.format(), (done) => {
          const orginal = DST_2015_ENDED_PRE.clone();
          const target = DST_2015_ENDED_START.clone();
          const expected = target.clone();
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });

        it(DST_2015_ENDED_END.format(), (done) => {
          const orginal = DST_2015_ENDED_PRE.clone();
          const target = DST_2015_ENDED_END.clone();
          const expected = target.clone();
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });
      });

      describe("add 1 hour " + DST_2015_ENDED_POST.format(), () => {
        it(DST_2015_ENDED_PRE.format(), (done) => {
          const orginal = DST_2015_ENDED_PRE.clone();
          const target = DST_2015_ENDED_POST.clone();
          const expected = target.clone().add(1, "hours");
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });

        it(DST_2015_ENDED_START.format(), (done) => {
          const orginal = DST_2015_ENDED_START.clone();
          const target = DST_2015_ENDED_POST.clone();
          const expected = target.clone().add(1, "hours");
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });

        it(DST_2015_ENDED_END.format(), (done) => {
          const orginal = DST_2015_ENDED_END.clone();
          const target = DST_2015_ENDED_POST.clone();
          const expected = target.clone().add(1, "hours");
          const result = adjustDST(orginal, target);

          assert.isTrue(moment.isMoment(result));
          assert.isTrue(expected.isSame(result));
          done();
        });
      });

    });
  });
});
