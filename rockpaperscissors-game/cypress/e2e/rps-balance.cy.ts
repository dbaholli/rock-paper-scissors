describe('Adds funds to the balance', () => {
  it('renders AddFundsModal when balance is 0', () => {
    cy.visit('http://localhost:5173/');
    for (let i = 0; i < 10; i++) {
      cy.contains('ROCK').click();
    }

    cy.get('[data-testid=AddFundsModal]').should('be.visible');
  });

  it('adds funds to the balance', () => {
    cy.visit('http://localhost:5173/');
    for (let i = 0; i < 10; i++) {
      cy.contains('ROCK').click();
    }

    cy.get('[data-testid=AddFundsModal]').should('be.visible');
    cy.contains('Add 1000').click();

    cy.get('[data-testid=AddFundsModal]').should('not.exist');
    cy.contains('BALANCE: 1000').should('exist');
  });
});