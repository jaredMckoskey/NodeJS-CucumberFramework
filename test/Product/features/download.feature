  @demo @download
Feature: Download NodeJS

Background:
  Given I go to the "nodeJS" page

  @googleTest
Scenario: Download NodeJS Test
  Then I am on the "nodeJS" page
  When I click the "LTS_BUTTON" button on the page
  And I wait for "10" seconds