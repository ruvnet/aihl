# Testing Guide

## Unit Tests
- Framework: Vitest
- Run tests: `npm run test`
- Write tests in `__tests__` directories or with `.test.js` suffix

Example:
```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

## Integration Testing
- Test API integrations with OpenAI and Supabase
- Use mock data for consistent results
- Test real-time features and state management

## End-to-End Testing
- Framework: Cypress
- Run E2E tests: `npm run test:e2e`
- Write tests in `cypress/integration` directory

Example:
```javascript
describe('Challenge Page', () => {
  it('submits code and receives feedback', () => {
    cy.visit('/challenge/1');
    cy.get('#code-editor').type('console.log("Hello, World!")');
    cy.get('#submit-button').click();
    cy.get('#feedback').should('contain', 'Evaluation complete');
  });
});
```

## Automated Testing
- Set up GitHub Actions for CI/CD
- Run tests on pull requests and before deployments
- Configure test coverage reports