/* eslint-disable no-console */
import Constants from "../utility/constants";
/**
 * The Driver is a wrapper around the WebDriverIO 'browser' object.
 * It can be used for both mobile and web.
 * But, it could easily be divided into two drivers: mobile & web.
 *
 * Ex: Driver.clickOnElementWithText(Pages.Login.Element, 'textvalue');
 * eslint-disable no-undef
 */
/* eslint-disable no-undef */
class Driver {

  /**
   * Checks if tests are running in mobile capability.
   * @returns True if capability is mobile.
   */
  isMobile() {
    return process.env.CAPABILITY.includes("android") ||
      process.env.CAPABILITY.includes("iphone") ||
      process.env.CAPABILITY.includes("Mobile");
  }

  /**
  * Checks if tests are running in android capability.
  * @returns True if capability is android.
  */
  isAndroid() {
    return process.env.CAPABILITY.includes("android");
  }

  /**
   * Waits for Angular on page to load.
   */
  waitForAngularToLoad() {
    browser.pause(1500);
  }

  /**
   * Executes a JQuery event on the given element.
   * @param {*} element Element to trigger event on.
   * @param {*} event Event to be triggered.
   */
  triggerJQueryEvent(element, event) {
    browser.waitForVisible(element);
    browser.waitForEnabled(element);
    browser.execute("$('" + element + "').trigger('" + event + "')");
  }

  /**
   * Loops through elements with given locator and clicks the one
   * that contains text passed in
   * @param {*} locator Locator of elements to loop through
   * @param {*} text Text to find in element to click
   */
  clickElementWithText(locator, text) {
    let elements = browser.elements(locator);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value.contains(text)) {
        elements[i].click();
      }
    }
  }

  /**
   * Clicks on all visible elements by selector. Catches any errors thrown to click other elements.
   * @param {*} selector Selector to find elements to click on.
   */
  clickElementLoop(selector) {
    let els = browser.elements(selector);
    els.value.forEach(el => {
      try {
        if (el.isVisible()) {
          el.click();
        }
      } catch (error) {
        //Leaving block empty
      }
    });
  }


  /**
   * Accepts alert with given wait time.
   * @param {*} waitTime Wait time in seconds.
   */
  acceptAlert(waitTime) {
    this.wait(waitTime ? waitTime : 1);
    browser.alertAccept();
  }

  // clickElementWithText(selector, text) {
  //   let elements = browser.elements(selector);
  //   for (var i=0; i < elements.length; i++) {
  //     if (elements[i].value.contains(text)) {
  //       elements.value[i].click()
  //     }
  //   }
  // for (element in elements) {
  //   if (element.value.contains(text)) {
  //     element.click()
  //   }
  // }
  // }

  /**
   * Clicks on given element.
   * @param {*} element Element to be clicked on.
   */
  clickOnElement(element) {
    this.clickWhenVisible(element);
  }

  /**
   * Sends 'Enter' key to given element.
   * @param {*} element Element to send 'Enter' key to.
   */
  sendEnterToElement(element) {
    browser.waitForVisible(element);
    browser.keys("\uE007");
  }

  /**
   * Clicks on given element only if given element exists.
   * @param {*} element Element to be clicked on.
   */
  clickOnElementIfExists(element) {
    browser.pause(3000);
    if (browser.isExisting(element)) this.clickWhenVisible(element);
  }

  /**
   * Dismisses alert with given wait time.
   * @param {*} waitTime Wait time in seconds.
   */
  dismissAlert(waitTime) {
    this.wait(waitTime ? waitTime : 1);
    browser.alertDismiss();
  }

  /**
   * Checks if the given element exists.
   * @param {*} element Element to check.
   * @returns True if element exists.
   */
  elementExists(element) {
    return browser.isExisting(element);
  }

  /**
   * Sends text to given element.
   * @param {*} element Element to send text to.
   * @param {*} text Text to be pass into element.
   */
  fillElementWithText(element, text) {
    browser.waitForVisible(element);
    browser.waitForEnabled(element);
    browser.addValue(element, text);
  }

  /**
   * Gets the text from given element.
   * @param {*} element Element to pull text from.
   * @returns Text from element.
   */
  getElementTextContent(element) {
    browser.waitForText(element);
    return browser.getText(element);
  }

  /**
   * Gets the value from given element.
   * @param {*} element Element to pull value from.
   * @returns Value from element.
   */
  getElementValueContent(element) {
    browser.waitForVisible(element);
    browser.waitForEnabled(element);
    return browser.getValue(element);
  }

  /**
   * Clears text from given element.
   * @param {*} element Element to clear text from.
   */
  deleteElementText(element) {
    browser.waitForVisible(element);
    browser.waitForEnabled(element);
    browser.clearElement(element);
  }

  /**
   * Browser goes to specified URL.
   * @param {*} url URL to go to.
   */
  loadUrl(url) {
    browser.url(url);
    if (!this.isMobile()) {
      browser.windowHandleMaximize();
    }
  }

  /**
   * Moves browser view to given element.
   * @param {*} element Element to move into view.
   * @param {*} xOffset Horizontal offset from element.
   * @param {*} yOffset Vertical offset from element.
   */
  moveToElement(element, xOffset = 0, yOffset = 0) {
    browser.moveToObject(element, xOffset, yOffset);
  }

  /**
   * Browser goes to specified URL in new browser window.
   * @param {*} url URL to go to in new window.
   */
  openTab(url) {
    browser.newWindow(url);
  }

  /**
   * Assert: Gets and compares page title with expected title.
   * @param {*} title Expected page title.
   */
  shouldHaveTitle(title) {
    assert.equal(this.waitAndReturnTitle(), title);
  }

  /**
  * Loops until timeout(3 seconds) or page titile is not blank
  * @returns Current page Title.
  */
  waitAndReturnTitle(){
    let pageTitle = "";
    browser.waitUntil(function(){
      pageTitle = browser.getTitle();
      return pageTitle !== ""; }, 30000, "Waited for title timeout", 500);
    return pageTitle;
  }


  /**
   * Assert: checks if given element exists.
   * @param {*} element Element to exist.
   */
  shouldSeeElement(element) {
    browser.waitForExist(element).should.exist;
    browser.waitForVisible(element);
  }

  /**
   * Assert: checks if given element has specified text.
   * @param {*} element Element to compare text on.
   * @param {*} text Expected text from element.
   */
  shouldSeeElementWithTextContent(element, text) {
    this.waitForAndReturnText(element, Constants.getMediumWait()).should.contain(text);
  }

  /**
    * Loops through elements found with the selector and gets the last text value that isn't blank.
    *@param {*} selector Selector to find elements to pull text from.
    *@param {*} timeout Timeout in milliseconds.
    * @returns Text found in an element.
    */
  waitForAndReturnText(selector, timeout) {
    let elText = "";
    browser.waitUntil(function () {
      let els = browser.elements(selector);
      els.value.forEach(el => {
        try {
          if (el.getText() !== "") {
            elText = el.getText();
          }
        } catch (error) {
          //Leaving empty block
        }
      });
      return elText !== "";
    }, timeout, "Waited for text timeout", 2000);
    return elText;
  }

  /**
   * Assert: checks if given element has specified value.
   * @param {*} element Element to compare value on.
   * @param {*} value Expected value from element.
   */
  shouldSeeElementWithValue(element, value) {
    browser.waitForExist(element).should.exist;
    browser.getAttribute(element, "value").should.have.contain(value);
  }

  /**
   * Switch to specified tab number, 0 being main page.
   * @param {*} tab Tab to switch to.
   */
  switchTab(tab) {
    let tabIds = browser.getTabIds();
    browser.switchTab(tabIds[tab]);
  }

  /**
   * Generic wait function in seconds.
   * @param {*} seconds Wait time in seconds.
   */
  wait(seconds) {
    browser.pause(seconds * 1000);
  }

  waitForNewWindow() {
    browser.waitUntil(function (){
      let numTabs = browser.getTabIds().length;
      return numTabs > 1;}, Constants.getLongWait(), `The new window failed to appear after waiting ${Constants.getLongWait()} millisesonds`);
  }
  /**
   * Waits for the given element to no longer exist on page. Must have existed first before calling function.
   * @param {*} element Element to wait for.
   */
  waitForElementNotToExist(element) {
    browser.waitForExist(element); // Wait for element to exist
    browser.waitForExist(element, 120000, false); // Now wait for it to NOT exist (2 mins)
  }

  /**
   * Gets first availible element on page with given element selector.
   * @param {*} element Element selector.
   * @returns First element.
   */
  getFirstAvailableElementOnPage(element) {
    const allElementsOfSelector = browser.elements(element).value;

    for (let elem of allElementsOfSelector) {
      if (this.isClickable(elem.selector)) {
        return elem.selector;
      }
    }
  }

  /**
   * Checks if element is clickable by confirming it both exists and is visible on page.
   * @param {*} element Element to check.
   * @returns True if element is visible and exists.
   */
  isClickable(element) {
    if ((browser.isExisting(element) && browser.isVisible(element)) === true) {
      return true;
    }
    return false;
  }

  /**
   * Clicks element when visible.
   * @param {*} element Element to be clicked on.
   */
  clickWhenVisible(element) {
    browser.waitForExist(element);
    browser.waitForVisible(element);
    let clicked = false;
    do {
      try {
        browser.click(element);
      } catch (error) {
        browser.pause(1500);
      } finally {
        clicked = true;
      }
    } while (!clicked);
  }

  close(tab) {
    let tabIds = browser.getTabIds();
    browser.close(tabIds[tab]);
  }

  /**
   * Assert: Compares an actual value with an expected value.
   * @param {*} actual Actual value.
   * @param {*} expected Expected value.
   */
  shouldBeEqual(actual, expected) {
    expected.should.be.equal(actual, `The expected value of ${expected} did not match the actual vaule of ${actual}`);
  }
  
  /**
   * Assert: Tests whether the expected value is contained in the actual value.
   * @param {*} actual Actual value.
   * @param {*} expected Expected value.
   */
  shouldContain(actual, expected) {
    actual.should.contain(expected, `The actual value of ${actual} did not contain the vaule of ${expected}`);
  }

  isDemo() {
    if (process.env.DEMOENV.toLowerCase() === "yes") {
      browser.pause(2000);
    }
  }

  /**
   * Log into IPS Test Environment with test credentials, if none are defined. Test Credentials currently do not have full access to IPS.
   */
  login() {
    let pagePath = Constants.getLocatorPath();
    let userInput = require(pagePath + ".json").inputs["USER_NAME_INPUT"];
    let passInput = require(pagePath + ".json").inputs["PASSWORD_INPUT"];

    browser.url(require(Constants.getLocatorPath() + ".json").url["URL"]);
    browser.windowHandleMaximize();
    browser.waitForExist(userInput);
    
    if (process.env.TESTENV === "QA") {
      browser.clearElement(userInput);
      browser.clearElement(passInput);
      browser.addValue(userInput, process.env.LOCALUSER);
      browser.addValue(passInput, process.env.LOCALPASS);
    } else if (process.env.TESTENV === "GRID" || process.env.TESTENV === "") {
      browser.clearElement(userInput);
      browser.clearElement(passInput);
      browser.addValue(userInput, process.env.GRIDUSER);
      browser.addValue(passInput, process.env.GRIDPASS);
    }
    browser.click(require(Constants.getLocatorPath() + ".json").buttons["LOGIN_BUTTON"]);
  }

  unlockPolicy() {
    let pagePath = Constants.getLocatorPath();
    let unlock = require(pagePath + ".json").buttons["UNLOCK_BUTTON"];

    if ((browser.isExisting(unlock) && browser.isEnabled(unlock)) === true) {
      browser.click(require(pagePath + ".json").buttons["UNLOCK_BUTTON"]);
      browser.alertAccept();
      browser.waitForExist(unlock, 25000, true);
    } else {
      return true;
    }
  }

  getStateCodes(policy) {
    policy.split();
    let state = require(Constants.getStateCode()).codes[policy[1]+policy[2]];
    return state;
  }

  getDatabase(code) {
    if (code === "FL" || code === "PA" || code === "SC") {
      let database = "unix_test_1_db";
      return database;
    } else {
      let database = "unix_test_2_db";
      return database;
    }
  }

  takeScreenshot() {
    const path = require("path");
    const fs = require("fs");
    let shotPath = "./results/screenshots/";
    let fileName = `Screenshot_${process.env.CAPABILITY}${Date.now()}.png`;
    const resolvedPath = path.resolve(shotPath, fileName);
    const dir = path.dirname(resolvedPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir); }
    browser.saveScreenshot(resolvedPath);
  }

  loop(receipt) {
    let pagePath = Constants.getLocatorPath();
    let i;
    let dateCell = require(pagePath + "transactionsPage.json").special["ENTRY_DATE"];
    let receiptCell = require(pagePath + "transactionsPage.json").special["RECEIPT"];
    let table = require(pagePath + "transactionsPage.json").special["TABLE"];
    let date = "07/31/2018";
    //let date = Constants.todaysDate();
    let match = receipt;
    //console.log(date);
    //console.log(receipt);
    for (i = 1; browser.isExisting(`${table}${i}]`); i++) {
      //console.log(i);
      if (browser.isExisting(`${dateCell}${i}']`) && browser.isExisting(`${receiptCell}${i}']`)) {
        let dateValue = browser.getText(`${dateCell}${i}']`);
        let receiptValue = browser.getText(`${receiptCell}${i}']`);
        if (dateValue === date && receiptValue === receipt) {
          match = true;
          console.log(`${date} and ${receipt} match at index ${i}`);
          break;
        }
      }
    } expect(match, "Did not find payment on the page").to.be.true;
  }

  paymentsToday(receipt) {
    let pagePath = Constants.getLocatorPath();
    let i;
    let dateCell = require(pagePath + "transactionsPage.json").special["ENTRY_DATE"];
    let receiptCell = require(pagePath + "transactionsPage.json").special["RECEIPT"];
    let table = require(pagePath + "transactionsPage.json").special["TABLE"];
    let date = Constants.todaysDate();
    //console.log(date);
    //console.log(receipt);
    for (i = 1; browser.isExisting(`${table}${i}]`); i++) {
      //console.log(i);
      if (browser.isExisting(`${dateCell}${i}']`) && browser.isExisting(`${receiptCell}${i}']`)) {
        let dateValue = browser.getText(`${dateCell}${i}']`);
        let receiptValue = browser.getText(`${receiptCell}${i}']`);
        if (dateValue === date && receiptValue === receipt) {
          console.log(`${date} and ${receipt} match at index ${i}`);
          return false;
        }
      }
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
  }

  createPayment() {
    let date = new Date();
    let time = date.getTime()*.01.toFixed(2).toString().split();
    delete time[0-9];
    console.log(date);
    console.log(time);
    //console.log(payment);
  }

  debug() {
    browser.debug();
  }
  
  /**
 * Switches to frame on page.
 * @param {*} frameID frame to switch to.
 */
  switchToFrame(frameID) {
    browser.waitForExist(frameID);
    var my_frameID = $(frameID).value;
    browser.frame(my_frameID);
    //switches to the frame
  }
  
  /**
     * Switches to out of frame on page.
     */
  switchToParentFrame() {
    browser.frameParent();
  }
}



export default new Driver();
