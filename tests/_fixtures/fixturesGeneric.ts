import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<
  {
    user: ReturnType<typeof generateNewUserData>;
    infoTestLog: string;
  },
  {
    logger: Logger;
  }
>({
  user: async ({}, use) => {
    const user = generateNewUserData();

    await use(user);
  },
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file.split(/[\\/]tests[\\/]/).pop();

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
});
