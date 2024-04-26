describe('Bet', () => {
  it('places bet on ROCK', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('ROCK').click()
    cy.contains('ROCK').click()
    cy.contains('ROCK').click()

    cy.contains('BET: 1500').should('exist');
  });

  it('places bet on PAPER', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('PAPER').click()
    cy.contains('PAPER').click()
    cy.contains('PAPER').click()

    cy.contains('BET: 1500').should('exist');
  });

  it('places bet on SCISSORS', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('SCISSORS').click()
    cy.contains('SCISSORS').click()
    cy.contains('SCISSORS').click()

    cy.contains('BET: 1500').should('exist');
  });
})

describe('Game result', () => {
  it('places bet and shows game result', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('ROCK').click()
    cy.contains('ROCK').click()
    cy.contains('ROCK').click()

    cy.contains('Play').click();

    cy.get('[data-testid="game-info"]').should('exist');
  });
});