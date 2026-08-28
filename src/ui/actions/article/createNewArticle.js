import {CreateArticlePage} from '../../pages/article/CreateArticlePage';
import {ViewArticlePage} from '../../pages/article/ViewArticlePage';
import {HomePage} from '../../pages/HomePage';
import {test} from '@playwright/test';

export async function createNewArticle(page, article) {
  const tags = Array.isArray(article.tags) ? article.tags : [];

  await test.step(
    `Create article ${tags.length ? 'with tags' : 'without tags'}`,
    async () => {
    const createNewArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);
    const homePage = new HomePage(page);

    await homePage.clickNewArticleLink();
    await createNewArticlePage.fillTitleField(article.title);
    await createNewArticlePage.fillDescriptionField(article.description);
    await createNewArticlePage.fillTextField(article.text);
    for (const tag of tags) {
      await createNewArticlePage.fillTagField(tag);
    }
    await createNewArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
    },
  );
}
