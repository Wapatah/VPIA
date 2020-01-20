/* --------------------------------------------------------------------------------------------------------------------------------------------
  E2E test for Landing. We would later check if the non-logged in users can conduct search/artwork viewing, etc.
  We use template literals to make it easier to switch URLs if needed.
  Use backticks for everything in the tests, ` ` except for imports.
*/
let global = require("./global_test_vars");

fixture `Landing Page`
  .page `${global.baseUrl}/#/`;

test(`Navigate to Login`, async t => {
  await t
    .click(`#login-nav-button`)
    .navigateTo(`${global.baseUrl}/#/login`);
});

test(`Navigate to Sign Up`, async t => {
  await t
    .click(`#signup-nav-button`)
    .navigateTo(`${global.baseUrl}/#/user_signup`);
});

test(`Navigate to About`, async t => {
  await t
    .click(`#about-nav-button`)
    .navigateTo(`${global.baseUrl}/#/about`);
});

test("Navigate to List of Artworks", async t => {
  await t
    .click(`#artwork-nav-button`)
    .navigateTo(`${global.baseUrl}/#/results`);
});

// We cannot check if this returns 0 results because it constantly returns to Landing
test("Search from Landing", async t => {
  await t
    .typeText(`#search-input`, `pipe`)
    .click(`#search-submit`)
    .navigateTo(`${global.baseUrl}/?#/search?query=pipe`)
});
