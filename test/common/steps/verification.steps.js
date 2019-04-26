/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Given, When, Then } from "cucumber";
import Constants from "../../../src/utility/constants";
import Driver from "../../../src/utility/driver";

// Pulling path of page specific locators for elements
let pagePath = Constants.getLocatorPath();

/**
 * Verification Steps
 */

Then(/^I should see the "(.*?)" button on the page$/, (element) => {
  Driver.isDemo();
  const button = require(pagePath + `${global.pageContext}.json`).buttons[element];
  Driver.shouldSeeElement(button);
});
  
Then(/^I should see the "(.*?)" element on the page$/, (element) => {
  Driver.isDemo();
  const image = require(pagePath + `${global.pageContext}.json`).special[element];
  Driver.shouldSeeElement(image);
});
  
Then(/^I should see "(.*?)" with text "(.*?)"$/, (element, text) => {
  Driver.isDemo();
  const locator = require(pagePath + `${global.pageContext}.json`).special[element];
  Driver.shouldSeeElementWithTextContent(locator, text);
});