/// <reference types="cypress"/>

describe('tasks with a fixed input value', () => {
    const TaskName = 'Estudar Javascript para QAs';
    context('register', ()=> {
    it('Create a new task', () => {


        cy.createTask(TaskName)
        
        cy.reload(true);
        
        cy.contains(TaskName, { timeout: 10000 })
            .should('exist');
      
    })
  

    it('Should not allow tasks to share names', () => {
        cy.createTask(TaskName)

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })

    it('Required field validation', () => {
        cy.createTask()

        cy.get('#newTask')
            .invoke('prop', 'validationMessage')
            .should((text)=> {
                expect('This is a required field')
                .to.eq(text)
            })
    })
    })

    context('status update', ()=> {
    it('set task as completed', ()=> {
        
        cy.visit('/')

        cy.contains('p', TaskName)
            .parent()
            .find('button[class*=ItemToggle]')
            .click()
            .reload(true)

        cy.contains('p', TaskName)
            .should('have.css', 'text-decoration-line', 'line-through')
    })
    })

    context('delete task', ()=> {
    it('delete unused tasks', ()=> {
            
            cy.visit('/')
    
            cy.contains('p', TaskName)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()
    
            cy.contains('p', TaskName)
                .should('not.exist')
    })
    })
})


