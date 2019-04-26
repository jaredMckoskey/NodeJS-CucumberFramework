/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Given, When, Then } from "cucumber";
import Constants from "../../../src/utility/constants";
import Driver from "../../../src/utility/driver";

// Pulling path of page specific locators for elements
let pagePath = Constants.getLocatorPath();
let quote;

/**
 * Input Steps
 */

When(/^I enter "(.*?)" into the "(.*?)"$/, (value, element) => {
  Driver.isDemo();
  const input = require(pagePath + `${global.pageContext}.json`).inputs[element];
  if (value === "LOCALUSER") {
    value = process.env.LOCALUSER;
  } else if (value === "LOCALPASS") {
    value = process.env.LOCALPASS;
  }
  Driver.fillElementWithText(input, value);
});
  
When(/^I enter "(.*?)" date into the "(.*?)"$/, (value, element) => {
  const input = require(pagePath + `${global.pageContext}.json`).inputs[element];
  const date = value;
  Driver.isDemo();
  Driver.getElementValueContent(input);
  //console.log(date);
  Driver.deleteElementText(input);
  Driver.clickWhenVisible(input);
  Driver.addValueToElement(input, `\uE011${date}`); // "\uE011" is HOME key
});
  
When(/^I enter todays date into the "(.*?)"$/, (element) => {
  const input = require(pagePath + `${global.pageContext}.json`).inputs[element];
  const date = Constants.todaysDate();
  Driver.isDemo();
  Driver.getElementValueContent(input);
  //console.log(date);
  Driver.deleteElementText(input);
  Driver.clickWhenVisible(input);
  Driver.addValueToElement(input, `\uE011${date}`); // "\uE011" is HOME key
});
  
When(/^I delete text from the "(.*?)"$/,
  (element) => {
    Driver.isDemo();
    const input = require(pagePath + `${global.pageContext}.json`).inputs[element];
    Driver.deleteElementText(input);
  });

When(/^I save the text from the "(.*?)" element$/, (element) => {
  Driver.isDemo();
  const locator = require(pagePath + `${global.pageContext}.json`).special[element];
  global.quote = Driver.getElementTextContent(locator).toString();
  global.quote.replace(global.quote = global.quote.replace(/(\r\n|\n|\r)/gm," "));
  console.log(global.quote);
  //console.log(typeof global.quote);
});
      
When(/^I enter the text from before into the "(.*?)"$/, (element) => {
  Driver.isDemo();
  const input = require(pagePath + `${global.pageContext}.json`).inputs[element];
  Driver.fillElementWithText(input, (global.quote).toString());
});

When(/^I send enter to the "(.*?)"$/, (element) => {
  const locator = require(pagePath + `${global.pageContext}.json`).inputs[element];
  Driver.isDemo();
  Driver.fillElementWithText(locator, "\uE007");
});