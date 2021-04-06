import {SearchPage} from "../pages/SearchPage";

const searchPage = new SearchPage();

fixture `Search page tests`
    .page `https://www.autohero.com/de/search/`
    .beforeEach(async t => {
          await t.maximizeWindow()
    });


test('Verify sorting and outputs of search page', async t => {
      await t.click(searchPage.dropdown.firsRegistration)
      await searchPage.selectCarFromYear(2015)
      await t.click(searchPage.dropdown.sortByDropdown)
      await t.click(searchPage.dropdown.descendingPrice)
      await t.wait(5000);
      await t.expect(searchPage.icon.favoriteIcon.exists).ok("List of cars isn't displayed!")
      await searchPage.verifyDescendingPrice();
      await searchPage.verifyFromYearSorting(2015);
});