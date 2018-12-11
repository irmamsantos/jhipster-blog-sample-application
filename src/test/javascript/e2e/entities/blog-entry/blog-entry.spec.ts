/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BlogEntryComponentsPage from './blog-entry.page-object';
import { BlogEntryDeleteDialog } from './blog-entry.page-object';
import BlogEntryUpdatePage from './blog-entry-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('BlogEntry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let blogEntryUpdatePage: BlogEntryUpdatePage;
  let blogEntryComponentsPage: BlogEntryComponentsPage;
  let blogEntryDeleteDialog: BlogEntryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();

    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load BlogEntries', async () => {
    await navBarPage.getEntityPage('blog-entry');
    blogEntryComponentsPage = new BlogEntryComponentsPage();
    expect(await blogEntryComponentsPage.getTitle().getText()).to.match(/Blog Entries/);
  });

  it('should load create BlogEntry page', async () => {
    await blogEntryComponentsPage.clickOnCreateButton();
    blogEntryUpdatePage = new BlogEntryUpdatePage();
    expect(await blogEntryUpdatePage.getPageTitle().getAttribute('id')).to.match(/blogApp.blogEntry.home.createOrEditLabel/);
  });

  it('should create and save BlogEntries', async () => {
    const nbButtonsBeforeCreate = await blogEntryComponentsPage.countDeleteButtons();

    await blogEntryUpdatePage.setTitleInput('title');
    expect(await blogEntryUpdatePage.getTitleInput()).to.match(/title/);
    await blogEntryUpdatePage.setContentInput('content');
    expect(await blogEntryUpdatePage.getContentInput()).to.match(/content/);
    await blogEntryUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await blogEntryUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
    await blogEntryUpdatePage.blogSelectLastOption();
    // blogEntryUpdatePage.tagSelectLastOption();
    await waitUntilDisplayed(blogEntryUpdatePage.getSaveButton());
    await blogEntryUpdatePage.save();
    await waitUntilHidden(blogEntryUpdatePage.getSaveButton());
    expect(await blogEntryUpdatePage.getSaveButton().isPresent()).to.be.false;

    await blogEntryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await blogEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last BlogEntry', async () => {
    await blogEntryComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await blogEntryComponentsPage.countDeleteButtons();
    await blogEntryComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    blogEntryDeleteDialog = new BlogEntryDeleteDialog();
    expect(await blogEntryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/blogApp.blogEntry.delete.question/);
    await blogEntryDeleteDialog.clickOnConfirmButton();

    await blogEntryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await blogEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
