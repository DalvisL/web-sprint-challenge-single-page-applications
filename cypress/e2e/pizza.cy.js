describe('Pizza test, sprint challenge', () => {
    // top level describe block
    const nameInput = () => cy.get('#name-input');
    const sizeInput = () => cy.get('#size-dropdown');
    const toppingCheckboxes = () => cy.get('input[type="checkbox"]');
    const specialInput = () => cy.get('#special-text');
    const orderButton = () => cy.get('#order-button');
    const pizzaButton = () => cy.get('a').contains('Order Pizza');
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });
    it(`is able to navigate to '/pizza' page`, () => {
        pizzaButton().click();
        cy.url().should('include', '/pizza');
    });
    describe ('Pizza form testing', () => {
        beforeEach(() => {
            pizzaButton().click();
        });

        it(`is able to type in name input`, () => {
            nameInput().type('John Doe').should('have.value', 'John Doe');
        });
        it(`is able to select a size`, () => {
            sizeInput().select('Large (18")').should('have.value', 'large');
        });
        it(`is able to select two toppings`, () => {
            toppingCheckboxes().eq(0).check().should('be.checked');
            toppingCheckboxes().eq(1).check().should('be.checked');
        });
        it(`is able to type in special instructions`, () => {
            specialInput().type('Extra cheese please').should('have.value', 'Extra cheese please');
        });
        it(`is able to submit the form`, () => {
            nameInput().type('John Doe');
            sizeInput().select('Large (18")');
            toppingCheckboxes().eq(0).check();
            toppingCheckboxes().eq(1).check();
            specialInput().type('Extra cheese please');
            orderButton().click();
            cy.url().should('include', '/pizza');
        });
    });
})