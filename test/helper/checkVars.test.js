import {
  assert
} from 'chai'
import moment from 'moment';

import {checkVars} from '../../src/helper';

let assertReturnObject = (actual) => {
  assert.isObject(actual);
  assert.property(actual, 'CURRENT');
  assert.property(actual, 'BASE');
  assert.property(actual, 'INTERVAL');
  assert.property(actual, 'END_AT');
  assert.property(actual, 'INTERRUPT');
}

describe("Helper", () => {
    describe("checkVars", () => {
      it("vaild vars w/ moment", (done) => {
        const CURRENT = moment();
        const BASE = moment();
        const INTERVAL = 1;
        const END_AT = moment();
        const INTERRUPT = true;

        const actual = checkVars(CURRENT, BASE, INTERVAL, END_AT, INTERRUPT);

        assertReturnObject(actual);

        assert.isTrue(moment.isMoment(actual.CURRENT));
        assert.isTrue(moment.isMoment(actual.BASE));
        assert.isNumber(actual.INTERVAL);
        assert.isTrue(moment.isMoment(actual.END_AT));
        assert.isTrue(actual.INTERRUPT);

        assert.isTrue(CURRENT.isSame(actual.CURRENT));
        assert.isTrue(BASE.isSame(actual.BASE));
        assert.equal(actual.INTERVAL, INTERVAL);
        assert.isTrue(END_AT.isSame(actual.END_AT));
        done();

      });

      it("vaild vars w/ date", (done) => {
        const CURRENT = new Date();
        const BASE = new Date();
        const INTERVAL = 1;
        const END_AT = new Date();
        const INTERRUPT = true;

        const actual = checkVars(CURRENT, BASE, INTERVAL, END_AT, INTERRUPT);

        assert.isObject(actual);
        assert.property(actual, 'CURRENT');
        assert.property(actual, 'BASE');
        assert.property(actual, 'INTERVAL');
        assert.property(actual, 'END_AT');
        assert.property(actual, 'INTERRUPT');

        assert.isTrue(moment.isMoment(actual.CURRENT));
        assert.isTrue(moment.isMoment(actual.BASE));
        assert.isNumber(actual.INTERVAL);
        assert.isTrue(moment.isMoment(actual.END_AT));
        assert.isTrue(actual.INTERRUPT);

        assert.isTrue(actual.CURRENT.isSame(CURRENT));
        assert.isTrue(actual.BASE.isSame(BASE));
        assert.equal(actual.INTERVAL, INTERVAL);
        assert.isTrue(actual.END_AT.isSame(END_AT));
        done();

      });

      it("undefined CURRENT, END_AT, INTERRUPT", (done) => {
        const CURRENT = undefined;
        const BASE = moment();
        const INTERVAL = 1;
        const END_AT = undefined;
        const INTERRUPT = undefined;

        const actual = checkVars(CURRENT, BASE, INTERVAL, END_AT, INTERRUPT);

        assert.isObject(actual);
        assert.property(actual, 'CURRENT');
        assert.property(actual, 'BASE');
        assert.property(actual, 'INTERVAL');
        assert.property(actual, 'END_AT');
        assert.property(actual, 'INTERRUPT');

        assert.isTrue(moment.isMoment(actual.CURRENT));
        assert.isTrue(moment.isMoment(actual.BASE));
        assert.isNumber(actual.INTERVAL);
        assert.isUndefined(actual.END_AT);
        assert.isFalse(actual.INTERRUPT);

        assert.isTrue(BASE.isSame(actual.BASE));
        assert.equal(actual.INTERVAL, INTERVAL);
        done();

      });

      it("false INTERRUPT", (done) => {
        const CURRENT = moment();
        const BASE = moment();
        const INTERVAL = 1;
        const END_AT = moment();
        const INTERRUPT = false;

        const actual = checkVars(CURRENT, BASE, INTERVAL, END_AT, INTERRUPT);

        assert.isObject(actual);
        assert.property(actual, 'CURRENT');
        assert.property(actual, 'BASE');
        assert.property(actual, 'INTERVAL');
        assert.property(actual, 'END_AT');
        assert.property(actual, 'INTERRUPT');

        assert.isTrue(moment.isMoment(actual.CURRENT));
        assert.isTrue(moment.isMoment(actual.BASE));
        assert.isNumber(actual.INTERVAL);
        assert.isTrue(moment.isMoment(actual.END_AT));
        assert.isFalse(actual.INTERRUPT);

        assert.isTrue(CURRENT.isSame(actual.CURRENT));
        assert.isTrue(BASE.isSame(actual.BASE));
        assert.equal(actual.INTERVAL, INTERVAL);
        assert.isTrue(END_AT.isSame(actual.END_AT));
        done();

      });

      it("0 INTERVAL", (done) => {
        const CURRENT = moment();
        const BASE = moment();
        const INTERVAL = 0;
        const END_AT = moment();
        const INTERRUPT = true;

        const actual = checkVars(CURRENT, BASE, INTERVAL, END_AT, INTERRUPT);

        assertReturnObject(actual);

        assert.isTrue(moment.isMoment(actual.CURRENT));
        assert.isTrue(moment.isMoment(actual.BASE));
        assert.isNumber(actual.INTERVAL);
        assert.isTrue(moment.isMoment(actual.END_AT));
        assert.isTrue(actual.INTERRUPT);

        assert.isTrue(CURRENT.isSame(actual.CURRENT));
        assert.isTrue(BASE.isSame(actual.BASE));
        assert.equal(actual.INTERVAL, 1);
        assert.isTrue(END_AT.isSame(actual.END_AT));
        done();

      });
    });
});
