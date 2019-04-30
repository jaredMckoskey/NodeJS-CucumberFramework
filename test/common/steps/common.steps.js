/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Given, When, Then } from "cucumber";
import Constants from "../../../src/utility/constants";
import Driver from "../../../src/utility/driver";
import Utility from "../../../src/utility/utility";

// Pulling path of page specific locators for elements
let pagePath = Constants.getLocatorPath();

/**
 * Common Steps
 */
Given(/^I go to the "(.*?)" page$/, pageName => {
  global.pageContext = pageName;
  let url = require(pagePath + `${global.pageContext}.json`).url["URL"];
  Driver.loadUrl(Constants.getBaseUrl() + url);
});

Given(/^I login to the test environment$/, () => {
  Driver.isDemo();
  Driver.loginToOceanHospitality();
});

Given(/^I am on the "(.*?)" page$/, pageName => {
  global.pageContext = pageName;
  let url = require(pagePath + `${global.pageContext}.json`).url["URL"];
  Driver.waitFor(Driver.getURL(), Constants.getBaseUrl() + url);
  Driver.isDemo();
});

When(/^I switch to the "(.*?)" window$/, (window) => {
  Driver.isDemo();
  if (window === "new") {
    window = 1;
  }
  else {
    window = 0;
  }
  //var tabIds = browser.getTabIds();
  Driver.switchTab(window);
});

When(/^I accept the alert$/, () => {
  Driver.isDemo();
  Driver.acceptAlert();
});

When(/^I dismiss the alert$/, () => {
  Driver.isDemo();
  Driver.dismissAlert();
});

When(/^I close the new window$/, () => {
  Driver.isDemo();
  Driver.close();
});

When(/^I take a screenshot$/,() => {
  Driver.isDemo();
  Driver.wait(1);
  Driver.takeScreenshot();
});

When(/^I enter debug mode$/,() => {
  Driver.isDemo();
  Driver.debug();
});

When(/^I switch to "(.*?)" frame$/, (frameID) => {
  const iFrame = require(pagePath + `${global.pageContext}.json`).special[frameID];
  Driver.isDemo();
  Driver.switchToFrame(iFrame);

});

When(/^I switch back to page$/, () => {
  Driver.isDemo();
  Driver.switchToParentFrame();
});

When(/^I say hello to cal$/, () => {
  Driver.isDemo();
  Driver.log("Hello Cal!");
});
