/// <reference types="Cypress" />
describe('My First Test Suite', function(){
    it('my firsttest case', function() {
      
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.product:visible').should('have.length',4)
        //parent child chaining
        cy.get('.products').as('productlocator')
        cy.get('@productlocator').find('.product').should('have.length',4)
        cy.get('@productlocator').find('.product').eq(2).contains('ADD TO CART').click().then(function(){
            console.log('sf')
        })
        
      
        cy.get('@productlocator').find('.product').each(($el,index, $list) => {


            const testVeg=$el.find('h4.product-name').text()
            if(testVeg.includes('Carrot'))
            {
                $el.find('button').click()
            }

        })
        cy.get('.brand').should('have.text','GREENKART')
        cy.get('.brand').then(function(logotext)
        {
            cy.log(logotext.text())
        })
        // cy.log(logo.text())
    })
    })