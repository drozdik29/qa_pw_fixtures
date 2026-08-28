import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
      this.publishArticleButton = page.getByRole('button', {
        name: /(?:Publish|Update) Article/,
      });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagField(tag) {
    await test.step(`Fill the 'Tag' field`, async () => {
      await this.tagField.fill(tag);
      await this.tagField.press('Enter');
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.page.getByText(tag, { exact: true }).locator('..').locator('i').click();
    });
  }

  async clickPublishArticleButton(waitForUpdate = true) {
    await test.step(`Click the 'Publish Article' button`, async () => {
      const updateResponse = waitForUpdate
        ? this.page.waitForResponse(
            (response) =>
              response.request().method() === 'PUT' &&
              response.url().includes('/api/articles/'),
          )
        : null;
        await this.publishArticleButton.click();
      this.updatedArticleResponse = updateResponse
        ? await updateResponse
        : undefined;
    });
  }

  async openUpdatedArticle() {
    const responseBody = await this.updatedArticleResponse.json();
    const slug = responseBody.article.slug;

    await this.page.goto(`/article/${slug}`);
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
