declare global {
  namespace Cypress {
    interface Chainable {
      getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getByDataCy", (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

// Exporte um objeto vazio para evitar problemas de compilação
export {};
