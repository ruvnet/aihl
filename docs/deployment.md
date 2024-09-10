# Dev/Prod Deployment Guide

This guide covers the deployment process for both development and production environments of our Vite.js project with AI-powered features.

## Local Development Setup

To set up the project for local development:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ai-powered-vite-project.git
   cd ai-powered-vite-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the necessary values for OpenAI and Supabase credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

The application should now be running at `http://localhost:5173`.

## Production Build

To create a production-ready build:

1. Ensure all dependencies are up to date:
   ```bash
   npm update
   ```

2. Build the project:
   ```bash
   npm run build
   ```

This will create a `dist` folder with optimized production files.

## Deploying to Hosting Providers

### Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. For subsequent deployments, use:
   ```bash
   vercel --prod
   ```

### Netlify

1. Install Netlify CLI:
   ```bash
   npm install netlify-cli -g
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy the project:
   ```bash
   netlify deploy
   ```

4. For production deployment:
   ```bash
   netlify deploy --prod
   ```

## Environment Variables Management

### Development

For local development, use a `.env` file in the project root. Example:

```
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Production

For production, set environment variables through your hosting provider's dashboard or CLI:

- Vercel: Use the Vercel dashboard or CLI to set environment variables.
- Netlify: Use the Netlify dashboard or `netlify env:set` command.

Ensure that production environment variables are kept secure and separate from development variables.

## Optimization for Production

1. Code Splitting: Vite.js handles code-splitting automatically. Ensure dynamic imports are used for large components:

   ```javascript
   const LargeComponent = React.lazy(() => import('./LargeComponent'));
   ```

2. Tree Shaking: Vite.js performs tree-shaking by default. Ensure you're using ES modules syntax for better tree-shaking results.

3. Minification: Vite.js minifies your code automatically in production builds.

4. Compression: Enable Gzip or Brotli compression on your web server. For Netlify and Vercel, this is handled automatically.

5. Caching: Implement proper caching strategies for static assets and API responses.

6. Preloading: Use `<link rel="preload">` for critical resources.

7. Lazy Loading: Implement lazy loading for images and components that are not immediately visible.

By following these deployment and optimization guidelines, you can ensure that your Vite.js project with AI-powered features performs optimally in both development and production environments.