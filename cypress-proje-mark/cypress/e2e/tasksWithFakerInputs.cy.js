import { faker } from '@faker-js/faker';
/// <reference types="cypress"/>

describe('tasks with random data input', () => {
    it('Create a new task', () => {
        cy.visit('/')
        var randomText = faker.lorem.text();

        cy.get('#newTask')
            .type(randomText)
        
        cy.contains('button', 'Create')
            .click()

        cy.get('main div p')
            .should('be.visible')
            .should('contain.text', randomText)
    });
});