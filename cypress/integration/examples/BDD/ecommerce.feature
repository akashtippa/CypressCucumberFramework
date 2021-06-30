Feature: End to End Ecommerce validation

    Feature Description


    application Regression

    Scenario: Ecommerce product delivery
    Given I open Ecommerce page 
    When I add items to Cart
    And Validate the total price
    Then select the country submit and verify Thank you
