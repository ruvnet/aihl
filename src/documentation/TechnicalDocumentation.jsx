import React from 'react';

const TechnicalDocumentation = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Technical Documentation</h2>
    
    <section>
      <h3 className="text-lg font-semibold mb-2">Architecture Overview</h3>
      <p>The AI Hacking League platform is built on a modern, scalable architecture:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Frontend: React with Vite for fast development and optimized builds</li>
        <li>Backend: Node.js with Express, leveraging Supabase for database and authentication</li>
        <li>Real-time Features: Powered by Supabase Realtime for live updates</li>
        <li>AI Judging: Custom algorithms integrated with OpenAI's GPT models</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Key Technologies</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>React Query: For efficient data fetching and caching</li>
        <li>Tailwind CSS: For responsive and customizable UI design</li>
        <li>Supabase: Provides database, authentication, and real-time capabilities</li>
        <li>Recharts: For data visualization in analytics</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">API Documentation</h3>
      <p>The platform exposes RESTful APIs for various operations. Key endpoints include:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>/api/challenges: CRUD operations for challenges</li>
        <li>/api/users: User management endpoints</li>
        <li>/api/teams: Team-related operations</li>
        <li>/api/submissions: Handle challenge submissions and evaluations</li>
      </ul>
      <p>For detailed API documentation, refer to the Swagger UI available at /api-docs when running the development server.</p>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Database Schema</h3>
      <p>The database schema includes the following main tables:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>users: Stores user information and authentication details</li>
        <li>challenges: Contains challenge metadata and configuration</li>
        <li>submissions: Tracks user submissions for challenges</li>
        <li>teams: Manages team information and memberships</li>
        <li>leaderboards: Stores current rankings and historical data</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">AI Judging System Architecture</h3>
      <p>The AI Judging System consists of several components:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Code Analyzer: Parses and analyzes submitted code for syntax and structure</li>
        <li>Execution Environment: Sandboxed environment for running and testing submissions</li>
        <li>GPT Integration: Utilizes GPT models for code quality and innovation assessment</li>
        <li>Scoring Engine: Applies customizable rubrics to generate final scores</li>
        <li>Feedback Generator: Produces detailed feedback for participants</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Security Measures</h3>
      <p>Key security features implemented in the platform:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>JWT-based authentication with short-lived tokens</li>
        <li>Role-based access control (RBAC) for granular permissions</li>
        <li>Input validation and sanitization to prevent injection attacks</li>
        <li>Rate limiting on API endpoints to mitigate DDoS attacks</li>
        <li>Encryption of sensitive data at rest and in transit</li>
      </ul>
    </section>
  </div>
);

export default TechnicalDocumentation;