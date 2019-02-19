Feature: Google Test

Background:
  Given I go to the "googleHomePage" page

@demo
Scenario Outline: Google Demo Test
  Then I am on the <Google> page
  When I enter "Hello World!" into the "SEARCH_INPUT"
  And I wait for "5" seconds

  Examples:
  | Google           |
  | "googleHomePage" |
