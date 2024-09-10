# Development Guidelines

## Project Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see Environment Setup Documentation)
4. Start the development server: `npm run dev`

## Coding Standards
- Use ESLint for linting (configuration in `.eslintrc.js`)
- Use Prettier for code formatting
- Follow React best practices and hooks guidelines

## Module Structure
- Use feature-based folder structure
- Keep components small and focused
- Use lazy loading for larger components

## OpenAI Integration
- Store API key in `.env` file
- Use the `useOpenAI` hook for API calls
- Manage prompts in a separate file for easy updates

## Best Practices
- Write unit tests for critical functions
- Use React Query for efficient data fetching
- Optimize renders using React.memo and useMemo
- Implement error boundaries for robust error handling