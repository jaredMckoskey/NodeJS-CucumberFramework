/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Given, When, Then } from "cucumber";
import Constants from "../../../src/utility/constants";
import Driver from "../../../src/utility/driver";
import Utility from "../../../src/utility/utility";

// Pulling path of page specific locators for elements
let pagePath = Constants.getLocatorPath();

/**
 * Wait Steps
 */

When(/^I wait for the "(.*?)" popup to appear$/, 
  (element) => {
    Driver.isDemo();
    const popup = require(pagePath + `${global.pageContext}.json`).special[element];
    Driver.shouldSeeElement(popup);
  });

When(/^I wait for the new window to appear$/, () => {
  Driver.isDemo();
  Driver.waitForNewWindow();
});

When(/^I wait for "(.*?)" seconds$/,
  (value) => {
    Driver.isDemo();
    Driver.wait(value);
  });

When(/^I wait for the "(.*?)" element not to exist$/, (element) => {
  Driver.isDemo();
  const problem = require(pagePath + `${global.pageContext}.json`).special[element];
  Driver.waitForElementNotToExist(problem);
  Driver.wait(1);
});