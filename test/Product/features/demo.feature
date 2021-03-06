  @demo
Feature: Google Test

Background:
  Given I go to the "googleHomePage" page

  @googleTest
Scenario Outline: Google Demo Test
  Then I am on the "googleHomePage" page
  When I enter <Search> into the "SEARCH_INPUT"
  And I wait for "3" seconds

Examples:
  | Google           | Search         |
  | "googleHomePage" | "Hello World!" |

  @tapQA
Scenario Outline: tap|QA Demo Test
  Then I am on the "googleHomePage" page
  When I enter <Search> into the "SEARCH_INPUT"
  And I click the "SEARCH_BUTTON" button on the page
  And I take a screenshot
  And I click the "TAP_QA_LINK" link on the page
  Then I am on the "tapQAHomePage" page
  When I say hello to cal
  And I click the "ABOUT_BUTTON" button on the page
  Then I am on the "aboutUsPage" page
  And I wait for "3" seconds

Examples:
  | Search  |
  | "tapqa" |
