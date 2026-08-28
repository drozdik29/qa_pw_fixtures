import {EditArticlePage} from '../../pages/article/EditArticlePage';
import {ViewArticlePage} from '../../pages/article/ViewArticlePage';
import {test} from '@playwright/test';

export async function editArticle(page, article, options = {}) {
  const viewArticlePage = new ViewArticlePage(page);
  const tagsToAdd = Array.isArray(options.tagsToAdd) ? options.tagsToAdd : [];
  const tagsToRemove = Array.isArray(options.tagsToRemove) ? options.tagsToRemove : [];
  const {expectedError} = options;

  await test.step('Edit existing article', async () => {
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(article.title);
    await editArticlePage.fillDescriptionField(article.description);
    await editArticlePage.fillTextField(article.text);
    for (const tag of tagsToAdd) {
      await editArticlePage.fillTagField(tag);
    }
    for (const tag of tagsToRemove) {
      await editArticlePage.removeTag(tag);
    }
      await editArticlePage.clickPublishArticleButton(!expectedError);

    if (expectedError) {
      await editArticlePage.assertErrorMessageContainsText(expectedError);
    } else {
      await editArticlePage.openUpdatedArticle();
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
    }
  });
}


