describe('app', () => {
  it('renders', () => {
    cy.visit('http://localhost:5173/')
  })
})

describe('Header component', () => {
  it('renders balance, bet, win values', () => {
    cy.visit('http://localhost:5173/');

    cy.get('header').should('exist');

    cy.contains('BALANCE:').should('exist');
    cy.contains('BET:').should('exist');
    cy.contains('WIN:').should('exist');
  });
});

describe('Game options', () => {
  it('renders game options', () => {
    cy.visit('http://localhost:5173/');
    cy.get('article').should('exist');
    cy.wait(500)
    cy.contains('ROCK').should('exist');
    cy.contains('PAPER').should('exist');
    cy.contains('SCISSORS').should('exist');
  });
});

