import { Given,When,Then, And } from "cypress-cucumber-preprocessor/steps";
import Homepage from '../../../../support/pageobject/Homepage'
import Product from '../../../../support/pageobject/Product'


//run specific spec file node_modules\.bin\cypress run --spec cypress\integration\examples\BDD\ecommerce.feature --headed --browser chrome
const homepage=new Homepage()
const product = new Product()

Given('I open Ecommerce page',()=>
{
    cy.visit(Cypress.env('url')+"/angularpractice/")
})

//When I add items to Cart
When('I add items to Cart',function()
{

    homepage.getshoptab().click()
    // cy.selectProduct('Blackberry')
     // cy.selectProduct('Nokia Edge')
        this.data.productName.forEach(function(element) {
            cy.selectProduct(element)
        })
        product.getcheckout().click()
})

//And Validate the total price
And('Validate the total price',()=>{

    var sum =0
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list)=>{

        const amount=$el.text()
        var res=amount.split(" ")
        res=res[1].trim()
        sum= Number(sum)+Number(res)
        
        }).then(function(){
            cy.log(sum)
        })
        cy.get('h3 > strong').then(function(ele){
            const amount=ele.text()
            var res= amount.split(" ")
            var total = res[1].trim()
            expect(Number(total)).to.equal(sum)
            cy.get(':nth-child(6) > :nth-child(5) > .btn').click()
         })
})

//Then select the country submit and verify Thank you
Then('select the country submit and verify Thank you',()=>{

    cy.get('#country').type('India')
         
         cy.get('.suggestions > ul > li > a').click()
         cy.get('#checkbox2').click({force: true})
         cy.get('.ng-untouched > .btn').click()
         //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
         //when you have spaces in the line resolve like this below
         cy.get('.alert').then(function(element){
           
            const actualText=element.text()
            expect(actualText.includes("Success")).to.be.true
            cy.screenshot()
        })
})