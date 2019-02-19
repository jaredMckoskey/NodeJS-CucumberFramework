/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Given, When, Then } from "cucumber";
import Constants from "../../../src/utility/constants";
import Driver from "../../../src/utility/driver";

// Pulling path of page specific locators for elements
let pagePath = Constants.getLocatorPath();
let quote;

/**
 * Common Steps
 */
Given(/^I go to the "(.*?)" page$/, pageName => {
  global.pageContext = pageName;
  const url = require(pagePath + `${global.pageContext}.json`).url["URL"];
  Driver.loadUrl(Constants.getBaseUrl() + url);
});

Given(/^I am on the "(.*?)" page$/, pageName => {
  global.pageContext = pageName;
});

When(/^I switch to the "(.*?)" window$/, (window) => {
  if (window === "new") {
    window = 1;
  }
  else {
    window = 0;
  }
  //var tabIds = browser.getTabIds();
  Driver.switchTab(window);
});

When(/^I click the "(.*?)" button on the page$/, (element) => {
  const button = require(pagePath + `${global.pageContext}.json`).buttons[element];
  Driver.shouldSeeElement(button);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(button, "click");
  } else {
    Driver.clickElementLoop(button);
  }
  //Driver.waitForAngularToLoad();
});

When(/^I click the "(.*?)" radio button on the page$/, (element) => {
  const button = require(pagePath + `${global.pageContext}.json`).radio_buttons[element];
  Driver.shouldSeeElement(button);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(button, "click");
  } else {
    Driver.clickElementLoop(button);
  }
  //Driver.waitForAngularToLoad();
});

When(/^I click the "(.*?)" checkbox on the page$/, (element) => {
  const button = require(pagePath + `${global.pageContext}.json`).checkboxes[element];
  Driver.shouldSeeElement(button);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(button, "click");
  } else {
    Driver.clickElementLoop(button);
  }
  //Driver.waitForAngularToLoad();
});

When(/^I click the "(.*?)" button on the "(.*?)"$/, (element, location) => {
  const button = require(pagePath + `${location}.json`).buttons[element];
  Driver.shouldSeeElement(button);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(button, "click");
  } else {
    Driver.clickElementLoop(button);
  }
  //Driver.waitForAngularToLoad();
});

When(/^I click the "(.*?)" link on the page$/, (element) => {
  const link = require(pagePath + `${global.pageContext}.json`).hrefs[element];
  Driver.shouldSeeElement(link);
  Driver.clickElementLoop(link);
});

// Selects the last option that contains in the value or visible text
When(/^I select the "(.*?)" option from the "(.*?)" dropdown on the page$/, (text,element) => {
  const dropdown = require(pagePath + `${global.pageContext}.json`).dropdowns[element];
  Driver.shouldSeeElement(dropdown);
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(dropdown, "click");
  } else {
    Driver.clickElementLoop(dropdown);
    Driver.clickElementLoop(`${dropdown}//option[contains(text(),'${text}')]`);
  }
  //Driver.waitForAngularToLoad();
});

Then(/^I should see the "(.*?)" button on the page$/, (element) => {
  const button = require(pagePath + `${global.pageContext}.json`).buttons[element];
  Driver.shouldSeeElement(button);
});

Then(/^I should see "(.*?)" with text "(.*?)"$/, (element, text) => {
  const locator = require(pagePath + `${global.pageContext}.json`).special[element];
  Driver.shouldSeeElementWithTextContent(locator, text);
});

When(/^I enter "(.*?)" into the "(.*?)"$/, (value, element) => {
  const input = require(pagePath + `${global.pageContext}.json`).inputs[element];
  Driver.fillElementWithText(input, value);
});

When(/^I delete text from the "(.*?)"$/,
  (element) => {
    const input = require(pagePath + `${global.pageContext}.json`).inputs[element];
    Driver.deleteElementText(input);
  });

When(/^I wait for the "(.*?)" popup to appear$/, 
  (element) => {
    const popup = require(pagePath + `${global.pageContext}.json`).special[element];
    Driver.shouldSeeElement(popup);
  });

When(/^I wait for the new window to appear$/, () => {
  Driver.waitForNewWindow();
});

When(/^I accept the alert$/, () => {
  Driver.acceptAlert();
});

When(/^I dismiss the alert$/, () => {
  Driver.dismissAlert();
});
  
When(/^I wait for "(.*?)" seconds$/,
  (value) => {
    Driver.wait(value);
  });

When(/^I close the new window$/, () => {
  Driver.close();
});

When(/^I click the "(.*?)" button on the page if it exists$/,
  (element) => {
    const button = require(pagePath + `${global.pageContext}.json`).buttons[element];
    Driver.isClickable(button);
    if (Driver.isAndroid()) {
      Driver.triggerJQueryEvent(button, "click");
    } else {
      Driver.clickElementLoop(button);
    }
  //Driver.waitForAngularToLoad();
  });

When(/^I save the text from the "(.*?)" element$/, (element) => {
  const locator = require(pagePath + `${global.pageContext}.json`).special[element];
  global.quote = Driver.getElementTextContent(locator).toString();
  global.quote.replace(global.quote = global.quote.replace(/(\r\n|\n|\r)/gm," "));
  console.log(global.quote);
  //console.log(typeof global.quote);
});

When(/^I enter the text from before into the "(.*?)"$/, (element) => {
  const input = require(pagePath + `${global.pageContext}.json`).inputs[element];
  Driver.fillElementWithText(input, (global.quote).toString());
});

When(/^I send enter to the "(.*?)"$/, (element) => {
  const locator = require(pagePath + `${global.pageContext}.json`).inputs[element];
  Driver.fillElementWithText(locator, "\uE007");
});