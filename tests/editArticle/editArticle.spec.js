import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import {
  BODY_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TITLE_CANNOT_BE_EMPTY,

} from '../../src/ui/constants/articleErrorMessages';
import { test} from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

async function createAndEdit(page, initialArticle, editedArticle, options = {}) {
  await test.step('Create article and edit it', async () => {
    await createNewArticle(page, initialArticle);
    await editArticle(page, editedArticle, options);

  });
}

test('Edit the article title', async ({ page, articleWithoutTags }) => {
  const article = articleWithoutTags;
  await createAndEdit(page, article, {...article, title: `${article.title} updated`});
});

test('Edit the article description', async ({ page, articleWithoutTags }) => {
  const article = articleWithoutTags;
  await createAndEdit(page, article, {...article, description: `${article.description} updated`});
});

test('Edit the article text', async ({ page, articleWithoutTags }) => {
  const article = articleWithoutTags;
  await createAndEdit(page, article, {...article, text: `${article.text} updated`});
});

test('Add a tag to an article without tags', async ({ page, articleWithoutTags, articleWithOneTag }) => {
  const article = articleWithoutTags;
  const tag = articleWithOneTag.tags[0];
  await createAndEdit(page, article, article, {tagsToAdd: [tag]});
});

test('Add a tag to an article with tags', async ({
  page,
  articleWithOneTag,
  articleWithTwoTags,
}) => {
  const article = articleWithOneTag;
  const tag = articleWithTwoTags.tags[0];
  await createAndEdit(page, article, article, { tagsToAdd: [tag] });
});


test('Add multiple tags to an article', async ({ page, articleWithoutTags, articleWithTwoTags }) => {
  const article = articleWithoutTags;
  await createAndEdit(page, article, article, {tagsToAdd: articleWithTwoTags.tags });
});

test('Remove a tag from an article', async ({ page, articleWithOneTag }) => {
  const article = articleWithOneTag;
  await createAndEdit(page, article, article, {tagsToRemove: article.tags});
});

test('Remove the article title', async ({ page, articleWithoutTags }) => {
  const article = articleWithoutTags;
  await createAndEdit(page, article, {...article, title: ''}, {
    expectedError: TITLE_CANNOT_BE_EMPTY,
  });
});

test('Remove the article description', async ({ page, articleWithoutTags }) => {
  const article = articleWithoutTags;
  await createAndEdit(page, article, {...article, description: ''}, {
    expectedError: DESCRIPTION_CANNOT_BE_EMPTY,
  });
});

test('Remove the article text', async ({ page, articleWithoutTags }) => {
  const article = articleWithoutTags;
  await createAndEdit(page, article, {...article, text: ''}, {
    expectedError: BODY_CANNOT_BE_EMPTY,
  });
});
