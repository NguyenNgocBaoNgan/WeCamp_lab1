
import formPage from './pages/functionPages'
Cypress.on('uncaught:exception',(err,runnable)=>{
  return false;
}
);
// example test
//cy:cypress
    //visit link
    
    // cy.get('#userName-wrapper').type('Ngan')
    // cy.wait(1000)
    //kiem dua tren text
    // cy.contains('Date of Birth')
    //assertion
    // cy.contains('Date of Birth').should('be.visible')
    // cy.get('#lastName').type('Nguyen')
    // formPage.typeName();


//test suite scenario
describe('template spec', () => {
  //su dung trc cac test case
  beforeEach(()=>{
    cy.visit('https://demoqa.com/automation-practice-form')
  })
  //test case 1
  it('TC01', () => {
    cy.contains('Name').should('be.visible')
    cy.contains('Email').should('be.visible')
    cy.contains('Gender').should('be.visible')
    cy.contains('Mobile(10 Digits)').should('be.visible')
    cy.contains('Date of Birth').should('be.visible')
    cy.contains('Subjects').should('be.visible')
    cy.contains('Picture').should('be.visible')
    cy.contains('Current Address').should('be.visible')
    cy.contains('State and City').should('be.visible')

  })

  it('TC02', () =>{
    cy.get('input[id="firstName"]').invoke('attr', 'placeholder').should('contain', 'First Name')
    cy.get('input[id="lastName"]').invoke('attr', 'placeholder').should('contain', 'Last Name')
    cy.get('input[id="userEmail"]').invoke('attr', 'placeholder').should('contain', 'name@example.com')
    cy.get('input[id="userNumber"]').invoke('attr', 'placeholder').should('contain', 'Mobile Number')
    cy.get('input[id="subjectsInput"]').should('have.attr', 'placeholder');
    cy.get('textarea[id="currentAddress"]').invoke('attr', 'placeholder').should('contain', 'Current Address')


  })
  it('TC03-check focus event', () =>{
    cy.get('input[id="firstName"]').focus().should("have.css", "border-color","rgb(128, 189, 255)")
    cy.get('input[id="lastName"]').focus().should("have.css", "border-color","rgb(128, 189, 255)")
    cy.get('input[id="userEmail"]').focus().should("have.css", "border-color","rgb(128, 189, 255)")
    cy.get('input[id="userNumber"]').focus().should("have.css", "border-color","rgb(128, 189, 255)")
    cy.get('input[id="subjectsInput"]').focus().should("have.css", "border-color","rgb(51, 51, 51)")
    cy.get('input[id="currentAddress"]').focus().should("have.css", "border-color","rgb(128, 189, 255)")
    cy.get('input[id="dateOfBirthInput"]').focus().should("have.css", "border-color","rgb(128, 189, 255)")

  })
  //failed
  it('TC04 - check on blur event',()=>{
    cy.get('input[id="firstName"]').focus().blur().should("have.css", "border-color","rgb(220, 53, 69)").and(($input) => {
      const val = $input.val()
      expect(val).to.be.empty
    })
  })
  //failed
  it('TC05-Test Submit event',()=>{
    cy.get('#userForm').submit()
     cy.get('input[id="firstName"]').should("have.css", "border-color","rgb(220, 53, 69)").and(($input) => {
      const val = $input.val()
      expect(val).to.be.empty
    })
  })
  it('TC06-Test First Name and Last Name input value',()=>{
    formPage.typeName();
    cy.get('#userForm').submit()
    cy.get('input[id="firstName"]').should("have.css", "border-color","rgb(220, 53, 69)")
  })
  it.only('TC07-Test Mobile Number Validation',()=>{
    formPage.typeName();
    cy.get('#userForm').submit()
    cy.get('input[id="userNumber"]').should("have.css", "border-color","rgb(220, 53, 69)").and(($input) => {
      const val = $input.val()
      expect(val.length).to.be.greaterThan(10)
    })
  
  })

})
//Homework: Create test case for demo qa form
//Create Cypress automation script for the test cases
//deadline for test case: Friday
//for test automation script: Sunday 12pm
