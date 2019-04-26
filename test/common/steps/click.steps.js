/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Given, When, Then } from "cucumber";
import Constants from "../../../src/utility/constants";
import Driver from "../../../src/utility/driver";

// Pulling path of page specific locators for elements
let pagePath = Constants.getLocatorPath();

/**
 * Click Steps
 */

When(/^I click the "(.*?)" button on the page$/, (element) => {
  Driver.isDemo();
  const button = require(pagePath + `${global.pageContext}.json`).buttons[element];
  Driver.shouldSeeElement(button);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(button, "click");
  } else {
    Driver.clickWhenVisible(button);
  }
  //Driver.waitForAngularToLoad();
});
  
When(/^I click the "(.*?)" radio button on the page$/, (element) => {
  Driver.isDemo();
  const button = require(pagePath + `${global.pageContext}.json`).radio_buttons[element];
  Driver.shouldSeeElement(button);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(button, "click");
  } else {
    Driver.clickWhenVisible(button);
  }
  //Driver.waitForAngularToLoad();
});
  
When(/^I click the "(.*?)" checkbox on the page$/, (element) => {
  Driver.isDemo();
  const button = require(pagePath + `${global.pageContext}.json`).checkboxes[element];
  Driver.shouldSeeElement(button);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(button, "click");
  } else {
    Driver.clickWhenVisible(button);
  }
  //Driver.waitForAngularToLoad();
});
  
When(/^I click the "(.*?)" button on the "(.*?)"$/, (element, location) => {
  Driver.isDemo();
  const button = require(pagePath + `${location}.json`).buttons[element];
  Driver.shouldSeeElement(button);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(button, "click");
  } else {
    Driver.clickWhenVisible(button);
  }
  //Driver.waitForAngularToLoad();
});
  
When(/^I click the "(.*?)" link on the page$/, (element) => {
  Driver.isDemo();
  const link = require(pagePath + `${global.pageContext}.json`).hrefs[element];
  Driver.shouldSeeElement(link);
  Driver.clickWhenVisible(link);
});

// Selects the last option that contains in the value or visible text
When(/^I select the "(.*?)" option from the "(.*?)" dropdown on the page$/, (text,element) => {
  Driver.isDemo();
  const dropdown = require(pagePath + `${global.pageContext}.json`).dropdowns[element];
  Driver.shouldSeeElement(dropdown);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(dropdown, "click");
  } else {
    Driver.clickWhenVisible(dropdown);
    Driver.clickWhenVisible(`${dropdown}//option[contains(text(),'${text}')]`);
  }
  //Driver.waitForAngularToLoad();
});

When(/^I click the "(.*?)" button on the page if it exists$/,
  (element) => {
    Driver.isDemo();
    const button = require(pagePath + `${global.pageContext}.json`).buttons[element];
    Driver.isClickable(button);
    if (Driver.isAndroid()) {
      Driver.triggerJQueryEvent(button, "click");
    } else {
      Driver.clickWhenVisible(button);
    }
  //Driver.waitForAngularToLoad();
  });