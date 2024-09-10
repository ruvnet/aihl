# Modules and Dependencies

## Dependency Management
- Install: `npm install package-name`
- Update: `npm update package-name`
- Remove: `npm uninstall package-name`

## Key Project Dependencies
- React: UI library
- Vite: Build tool and development server
- Supabase: Backend and real-time database
- OpenAI: AI integration for code evaluation and assistance
- React Query: Data fetching and state management
- Tailwind CSS: Utility-first CSS framework

## Optimizing Imports
- Use ES6 import syntax for tree-shaking
- Implement dynamic imports for code-splitting
- Avoid importing entire libraries when only specific functions are needed

## Module-Specific Guidelines
### OpenAI
- Use the provided `useOpenAI` hook for API calls
- Keep API key secure in environment variables

### Supabase
- Use React Query hooks for data fetching
- Implement real-time subscriptions for live updates