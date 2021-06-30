class Homepage 
{

geteditBox()
{

    return cy.get(':nth-child(1) > .form-control')
}
gettwowaydatabinding(){
    return cy.get(':nth-child(4) > .ng-untouched')

}
getGender(){

   return cy.get('select')
}
getenterpreneaur(){

   return cy.get('#inlineRadio3')
}
getshoptab(){

   return cy.get(':nth-child(2) > .nav-link')
}


}
export default Homepage;