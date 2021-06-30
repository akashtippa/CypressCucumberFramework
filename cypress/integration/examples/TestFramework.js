import Homepage from '../../support/pageobject/Homepage'
import Product from '../../support/pageobject/Product'


//if you want run specific testcases through command line-> node_modules\.bin\cypress run --spec cypress/integration/example/"spec name"
//run spec with mochawesom reporter use this->node_modules\.bin\cypress run --reporter mochawesome --spec "spec path"
describe('My First Cypress Framework', function() 
{
    before(() => {
        // runs once before all tests in the block

        cy.fixture('example').then(function(data){
            this.data=data

        })
    })
    it('My first test',function(){
        const homepage=new Homepage()
        const product = new Product()
        

        cy.visit(Cypress.env('url')+"/angularpractice/")
        homepage.geteditBox().type(this.data.name)
        homepage.geteditBox().screenshot()
        homepage.getGender().select(this.data.gender)
        homepage.gettwowaydatabinding().should('have.value',this.data.name)
        homepage.geteditBox().should('have.attr','minlength','2')
        homepage.getenterpreneaur().should('be.disabled')
        

        //cy.pause()
        homepage.getshoptab().click()
        // cy.selectProduct('Blackberry')
        // cy.selectProduct('Nokia Edge')

        this.data.productName.forEach(function(element) {

            cy.selectProduct(element)
        })
         product.getcheckout().click()
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
         })
         
         cy.get(':nth-child(6) > :nth-child(5) > .btn').click()
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


})


