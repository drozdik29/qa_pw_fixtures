import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import {CreateArticlePage} from "../../src/ui/pages/article/CreateArticlePage";
import {ViewArticlePage} from "../../src/ui/pages/article/ViewArticlePage";
import {EditArticlePage} from "../../src/ui/pages/article/EditArticlePage";
import {generateNewArticleData} from "../../src/common/testData/generateNewArticleData";

export const test = base.extend<
  {
    user: ReturnType<typeof generateNewUserData>;
    createArticlePage: CreateArticlePage;
    viewArticlePage: ViewArticlePage;
    editArticlePage: EditArticlePage;
    articleWithoutTags: ReturnType<typeof generateNewArticleData>;
    articleWithOneTag: ReturnType<typeof generateNewArticleData>;
    articleWithTwoTags: ReturnType<typeof generateNewArticleData>;
  },
  {
    logger: Logger;
  }
>({
   createArticlePage: async ({ page }, use) => {
await use(new CreateArticlePage(page));
},

   viewArticlePage: async ({ page }, use) => {
     await use(new ViewArticlePage(page));
   },
   editArticlePage: async ({ page }, use) => {
     await use(new EditArticlePage(page));
   },
   articleWithoutTags: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 0));
      },
    articleWithOneTag: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 1));
},
    articleWithTwoTags: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 2));
}})