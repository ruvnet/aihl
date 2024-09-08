import React from 'react';

const CodeLibrariesOverview = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Code and Libraries Overview</h2>
    
    <section>
      <h3 className="text-lg font-semibold mb-2">Frontend Structure</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>src/components: Reusable UI components</li>
        <li>src/pages: Main page components for routing</li>
        <li>src/hooks: Custom React hooks for shared logic</li>
        <li>src/utils: Utility functions and helpers</li>
        <li>src/styles: Global styles and Tailwind configurations</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Key Libraries</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>React: Core library for building the user interface</li>
        <li>React Router: For client-side routing</li>
        <li>React Query: Data fetching and state management</li>
        <li>Tailwind CSS: Utility-first CSS framework</li>
        <li>Recharts: For creating interactive charts</li>
        <li>Lucide React: Icon library</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Backend Structure</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>src/api: API route handlers</li>
        <li>src/services: Business logic and data access layers</li>
        <li>src/models: Data models and schema definitions</li>
        <li>src/middleware: Custom middleware functions</li>
        <li>src/utils: Utility functions and helpers</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Database and ORM</h3>
      <p>The platform uses Supabase as the primary database and ORM solution:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>PostgreSQL: Underlying database engine</li>
        <li>Supabase Client: For database operations and real-time subscriptions</li>
        <li>Migrations: Managed through Supabase CLI</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Testing</h3>
      <p>The project includes a comprehensive testing suite:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Jest: For unit and integration testing</li>
        <li>React Testing Library: For component testing</li>
        <li>Cypress: For end-to-end testing</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Build and Development Tools</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Vite: Fast build tool and development server</li>
        <li>ESLint: For code linting</li>
        <li>Prettier: For code formatting</li>
        <li>Husky: For pre-commit hooks</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">AI and Machine Learning Libraries</h3>
      <p>For AI-related functionalities, the platform utilizes:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>TensorFlow.js: For in-browser machine learning</li>
        <li>OpenAI API: For advanced language processing tasks</li>
        <li>Scikit-learn (Python): For backend machine learning tasks</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Security Libraries</h3>
      <p>To ensure platform security, we use:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Helmet: For securing HTTP headers</li>
        <li>bcrypt: For password hashing</li>
        <li>jsonwebtoken: For JWT generation and verification</li>
        <li>cors: For configuring Cross-Origin Resource Sharing</li>
      </ul>
    </section>
  </div>
);

export default CodeLibrariesOverview;