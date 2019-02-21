@demo
Feature: Google Test

Background:
  Given I go to the "googleHomePage" page

@googleTest
Scenario Outline: Google Demo Test
  Then I am on the <Google> page
  When I enter <Search> into the "SEARCH_INPUT"
  And I wait for "5" seconds

  Examples:
  | Google           | Search         |
  | "googleHomePage" | "Hello World!" |

@kyroTest
Scenario Outline: Kyro Demo Test
  Then I am on the <Google> page
  When I enter <Search> into the "SEARCH_INPUT"
  And I send enter to the "SEARCH_INPUT"
  And I click the "KYRO_INSTAGRAM_LINK" link on the page
  Then I am on the "kyroInstagram" page
  When I save the text from the "QUOTE_TEXT" element
  And I go to the <Google> page
  Then I am on the <Google> page
  When I enter the text from before into the "SEARCH_INPUT"
  And I send enter to the "SEARCH_INPUT"
  And I click the "IMAGES_BUTTON" button on the page
  And I click the "FIRST_IMAGE" button on the page
  And I wait for "5" seconds

  Examples:
  | Google           | Search           |
  | "googleHomePage" | "Elisabeth Kyro" |