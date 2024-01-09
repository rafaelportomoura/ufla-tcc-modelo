/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import Sinon from 'sinon';
import { Logger } from '../src/adapters/logger';
import { LoggerLevel } from '../src/types/Logger';
import { MockLogger } from './mocks/logger';

describe('Test Suit - Logger', () => {
  beforeEach(() => {
    Sinon.restore();
    Sinon.stub(console, 'log').resolves();
  });

  for (const [level, { should_log, should_not_log }] of Object.entries(MockLogger.createTestSchema()))
    describe(`When level log is ${level}`, () => {
      const logger = new Logger('id', level as LoggerLevel);

      for (const log of should_log)
        it(`Should log with ${log} level`, () => {
          const flush_spy = Sinon.spy(Logger.prototype, <any>'flush');

          logger[log]('a');

          expect(flush_spy.calledOnce).equal(true);
        });
      for (const log of should_not_log)
        it(`Should not log with ${log} level`, () => {
          const flush_spy = Sinon.spy(Logger.prototype, <any>'flush');

          logger[log]('a');

          expect(flush_spy.calledOnce).equal(false);
        });
    });
});
