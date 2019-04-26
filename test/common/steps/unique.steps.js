/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Given, When, Then } from "cucumber";
import Utility from "../../../src/utility/utility";
import Constants from "../../../src/utility/constants";
import Driver from "../../../src/utility/driver";
import Connect from "../../../src/database/connect";
import Queries from "../../../src/database/queries";

// Pulling path of page specific locators for elements
let pagePath = Constants.getLocatorPath();
let randomPayment;

/**
 * Specific Step to navigate the Edit, Delete, and Replace buttons for any driver on the driverListPage.json
 */
When(/^I click the "(.*?)" button on driver number "(.*?)" on the driver list$/, (button, index) => {
  const location = require(pagePath + `${global.pageContext}.json`).buttons["BASE_DRIVER_BUTTON"];
  if (button === "edit") {
    button = "11";
  }
  else if (button === "delete") {
    button = "12";
    // Will create TWO alerts
    // Does this driver live in the household or have regular access to the vehicles? If yes, press OK, if no, press Cancel.
    // Are you sure that you want to delete this driver (TREAZ ESKANDER)?
  } 
  if (Driver.isAndroid()) {
    Driver.triggerJQueryEvent(`${location}${index}]/td[${button}]/input`, "click");
  } else {
    Driver.clickElementLoop(`${location}${index}]/td[${button}]/input`);
  }
});

When(/^I get the down payment from "(.*?)" element$/, (element) => {
  const locator = require(pagePath + `${global.pageContext}.json`).special[element];
  global.quotedDownPayment = parseFloat(Driver.getElementTextContent(locator));
  //console.log(global.quotedDownPayment);
});
  
When(/^I check that the quoted down payment is the same at "(.*?)"$/, (element) => {
  const locator = require(pagePath + `${global.pageContext}.json`).inputs[element];
  let downPaymentInput = Driver.getElementValueContent(locator);
  if (downPaymentInput.includes(global.quotedDownPayment)) {
    //console.log(downPaymentInput);
  } else if (downPaymentInput === "") {
    Driver.deleteElementText(locator);
    Driver.fillElementWithText(locator, global.quotedDownPayment);
    //console.log(`Value was empty, changed value to ${Driver.getElementValueContent(locator)}`);
  } else {
    Driver.deleteElementText(locator);
    Driver.fillElementWithText(locator, global.quotedDownPayment);
    //console.log(`Value was ${downPaymentInput}, changed value to ${Driver.getElementValueContent(locator)}`);
  }
});

// Values: Expired, Released, Pre-Release.
Then(/^I verify that the status of policy "(.*?)" is "(.*?)" in the db$/, (policyNumber, text) => {
  Driver.wait(1);
  let code = Driver.getStateCodes(policyNumber);
  let database = Driver.getDatabase(code);
  return new Promise((resolve, reject) => {
    Connect.runQuery(database, Queries.policyStatusVerification(policyNumber, code))
      .then((result) => {
        resolve(Driver.shouldBeEqual(result[0].trim(), text));
      }).catch(err => reject(err));
  });
});
  
When(/^I get the state code of the "(.*?)" policy$/, (policy) => {
  Driver.getStateCodes(policy);
});

When(/I should see "(.*?)" has been submitted today on the page$/, (receipt) => {
  Driver.loop(receipt);
});
  
When(/^I create a random payment that has not been used today$/,() => {
  let payment;
  do {
    payment = Driver.getRandomInt(10, 100).toFixed(2);
    console.log(payment);
  }
  while (Driver.paymentsToday(payment) === false);
});
  
When(/^I create a random payment$/,() => {
  randomPayment = Driver.createPayment();
  console.log(randomPayment);
});

Then(/^I search the page for my created event with "(.*?)" title$/, (value) => {
  Driver.isDemo();
  const event = require(pagePath + `${global.pageContext}.json`).special["TABLE_TITLE"];
  Driver.shouldSeeElement(`${event}${value}')]`);
});