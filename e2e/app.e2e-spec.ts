import { SearchInformPage } from './app.po';

describe('search-inform App', () => {
  let page: SearchInformPage;

  beforeEach(() => {
    page = new SearchInformPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
