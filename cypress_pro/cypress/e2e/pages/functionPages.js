class formPage {
    element ={
        firstName :'#firstName',
        lastName: '#lastName',
        email:'input[id="userEmail"]',
        mobile:'input[id="userNumber"]',
        subject:'input[id="subjectsInput"]'
    }
    typeName(){
        cy.get(this.element.firstName).type('2232');
        cy.get(this.element.lastName).type('2223');
        cy.get(this.element.mobile).type('323232323232322');
    }
    getElement(){
        cy.get(this.element.firstName);
        cy.get(this.element.lastName);
        cy.get(this.element.email);
        cy.get(this.element.mobile);
        cy.get(this.element.subject);

    }
    
}
module.exports = new formPage();