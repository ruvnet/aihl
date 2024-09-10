# Environment Setup Documentation

## Local Environment Setup
1. Install Node.js (v14+ recommended)
2. Install npm (comes with Node.js)
3. Clone the project repository
4. Run `npm install` in the project root

## Environment Variable Management
1. Create a `.env` file in the project root
2. Add necessary variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_API_KEY=your_supabase_api_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```
3. Use `import.meta.env.VITE_VARIABLE_NAME` to access variables in code

## Development vs Production Environments
- Use `.env.development` for development-specific variables
- Use `.env.production` for production-specific variables
- Ensure sensitive data is not committed to version control

## Secure Variable Storage
- Use 1Password or similar tool for team-wide secret management
- Integrate with CI/CD pipelines for secure deployment