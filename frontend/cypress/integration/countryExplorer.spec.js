// cypress/integration/countryExplorer.spec.js

describe('Country Explorer App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
    });
  
    // Home component tests
    it('loads the Home component', () => {
      cy.contains('Country Explorer'); 
      cy.get('input[placeholder="For example, \'Japan\'"]').should('be.visible'); 
      cy.get('button').contains('Search').should('be.visible'); 
    });
  
    it('shows error when no country name is inputted', () => {
      cy.get('button').contains('Search').click();
      cy.contains('Country name cannot be empty').should('be.visible'); 
    });
  
    it('shows error when invalid country name is inputted', () => {
      cy.get('input').type('123'); 
      cy.get('button').contains('Search').click();
      cy.contains('Country name can only contain English letters and spaces').should('be.visible'); 
    });
  
    it('shows network error when there is a backend issue', () => {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api/endpoint/*', // Replace this with your API endpoint
        status: 500,
        response: {},
      });
      cy.get('input').type('Japan'); 
      cy.get('button').contains('Search').click();
      cy.contains('Network error or unexpected issue occurred!').should('be.visible');
    });
  
    // CountryInfo component tests
    it('loads CountryInfo component on valid input', () => {
      cy.get('input').type('Japan');
      cy.get('button').contains('Search').click();
      cy.contains('Official Information').should('be.visible');
    });
  
    it('displays the country banner with flags and coat of arms', () => {
      cy.get('.banner .flag').should('be.visible');
      cy.get('.banner .coat-of-arms').should('be.visible');
    });
  
    it('displays the geographical information', () => {
      cy.contains('Geographical Information').should('be.visible');
      cy.get('.geographical-info').within(() => {
        cy.get('.title').contains('Capital').next().should('not.be.empty');
        // ... more assertions for other fields
      });
    });
  
    it('can expand additional details', () => {
      cy.get('button.showMoreLess').click();
      cy.contains('Languages:').should('be.visible');
      // ... more assertions for other fields in the AdditionalDetails component
    });
  
    // This test showcases how you could test an external component behavior. 
    it('can view the country in Google Maps', () => {
      cy.get('a[target="_blank"]').should('have.attr', 'href').and('include', 'google.com/maps');
    });
  
    // And many more... You'd typically write individual tests for different components and interactions
    
    // After all tests
    after(() => {
      // Useful to check screenshots or videos in case of failures
      // Located by default in cypress/screenshots and cypress/videos
    });
  });
  