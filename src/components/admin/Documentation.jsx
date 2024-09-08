import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Documentation = ({ activeSubSection, onSubSectionChange }) => {
  const sections = [
    { id: 'admin', label: 'Admin Panel' },
    { id: 'technical', label: 'Technical Documentation' },
    { id: 'deployment', label: 'Deployment' },
    { id: 'customization', label: 'Customization' },
    { id: 'codeOverview', label: 'Code and Libraries Overview' },
  ];

  const renderContent = () => {
    switch (activeSubSection) {
      case 'admin':
        return <AdminPanelDocs />;
      case 'technical':
        return <TechnicalDocs />;
      case 'deployment':
        return <DeploymentDocs />;
      case 'customization':
        return <CustomizationDocs />;
      case 'codeOverview':
        return <CodeOverviewDocs />;
      default:
        return <AdminPanelDocs />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => onSubSectionChange(section.id)}
            variant={activeSubSection === section.id ? 'default' : 'outline'}
          >
            {section.label}
          </Button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

const AdminPanelDocs = () => (
  <Card>
    <CardHeader>
      <CardTitle>Admin Panel Documentation</CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="text-lg font-semibold mb-2">Overview</h3>
      <p>The Admin Panel provides a centralized interface for managing the AI Hacking League platform. Key features include:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>User and team management</li>
        <li>Challenge creation and moderation</li>
        <li>System configuration and settings</li>
        <li>Analytics and reporting tools</li>
        <li>Security and compliance controls</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Navigation</h3>
      <p>The panel is divided into several main sections, accessible via the primary navigation:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Community Management: Handle users, teams, and content moderation</li>
        <li>System Configuration: Adjust platform settings and AI judging parameters</li>
        <li>Analytics & Reporting: Access detailed platform metrics and generate reports</li>
        <li>Security & Compliance: Manage security settings, backups, and compliance tools</li>
        <li>Documentation: Access this comprehensive guide</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Best Practices</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Regularly review and update system settings to maintain optimal performance</li>
        <li>Monitor the analytics dashboard for insights on platform usage and trends</li>
        <li>Keep security measures up-to-date and perform regular audits</li>
        <li>Use the documentation section for quick reference on various platform features</li>
      </ul>
    </CardContent>
  </Card>
);

const TechnicalDocs = () => (
  <Card>
    <CardHeader>
      <CardTitle>Technical Documentation</CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="text-lg font-semibold mb-2">Architecture Overview</h3>
      <p>The AI Hacking League platform is built on a modern, scalable architecture:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Frontend: React with Vite for fast development and optimized builds</li>
        <li>Backend: Node.js with Express, leveraging Supabase for database and authentication</li>
        <li>Real-time Features: Powered by Supabase Realtime for live updates</li>
        <li>AI Judging: Custom algorithms integrated with OpenAI's GPT models</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Key Technologies</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>React Query: For efficient data fetching and caching</li>
        <li>Tailwind CSS: For responsive and customizable UI design</li>
        <li>Supabase: Provides database, authentication, and real-time capabilities</li>
        <li>Recharts: For data visualization in analytics</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">API Documentation</h3>
      <p>The platform exposes RESTful APIs for various operations. Key endpoints include:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>/api/challenges: CRUD operations for challenges</li>
        <li>/api/users: User management endpoints</li>
        <li>/api/teams: Team-related operations</li>
        <li>/api/submissions: Handle challenge submissions and evaluations</li>
      </ul>
      <p>For detailed API documentation, refer to the Swagger UI available at /api-docs when running the development server.</p>
    </CardContent>
  </Card>
);

const DeploymentDocs = () => (
  <Card>
    <CardHeader>
      <CardTitle>Deployment Documentation</CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="text-lg font-semibold mb-2">Deployment Options</h3>
      <p>The AI Hacking League platform can be deployed using various methods:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Docker: Containerized deployment for easy scaling and management</li>
        <li>Cloud Platforms: Compatible with AWS, Google Cloud, and Azure</li>
        <li>Serverless: Can be adapted for serverless architectures using functions</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Deployment Steps</h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Set up environment variables (refer to .env.example)</li>
        <li>Build the frontend: npm run build</li>
        <li>Set up the database using Supabase (run migrations)</li>
        <li>Deploy backend services (Node.js server or serverless functions)</li>
        <li>Configure Supabase for authentication and real-time features</li>
        <li>Set up a reverse proxy (e.g., Nginx) for routing</li>
        <li>Configure SSL certificates for secure connections</li>
      </ol>

      <h3 className="text-lg font-semibold mt-4 mb-2">Scaling Considerations</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Implement load balancing for high-traffic scenarios</li>
        <li>Use caching strategies (e.g., Redis) for improved performance</li>
        <li>Consider serverless options for auto-scaling during peak times</li>
        <li>Optimize database queries and implement proper indexing</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Monitoring and Maintenance</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Set up logging and monitoring tools (e.g., ELK stack, Prometheus)</li>
        <li>Implement automated backups for the database</li>
        <li>Regularly update dependencies and apply security patches</li>
        <li>Perform periodic performance audits and optimizations</li>
      </ul>
    </CardContent>
  </Card>
);

const CustomizationDocs = () => (
  <Card>
    <CardHeader>
      <CardTitle>Customization Documentation</CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="text-lg font-semibold mb-2">Theming</h3>
      <p>The platform uses Tailwind CSS for styling, allowing easy customization:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Modify tailwind.config.js to change color schemes and other design tokens</li>
        <li>Use the provided CSS variables for consistent theming across components</li>
        <li>Extend or override existing Tailwind classes in the global CSS file</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Adding New Features</h3>
      <p>To extend the platform's functionality:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Create new React components in the src/components directory</li>
        <li>Add new API endpoints in the backend services</li>
        <li>Extend the Supabase schema for additional data requirements</li>
        <li>Update the admin panel to include management for new features</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Integrating External Services</h3>
      <p>The platform can be extended with additional services:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Use the src/integrations directory to add new service integrations</li>
        <li>Implement OAuth for additional authentication providers</li>
        <li>Integrate with external APIs for expanded functionality (e.g., AI services)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Localization</h3>
      <p>To support multiple languages:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Use a localization library like react-i18next</li>
        <li>Create language files for each supported language</li>
        <li>Implement a language switcher in the user interface</li>
        <li>Update the admin panel to manage translations</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Custom Challenge Types</h3>
      <p>To add new types of AI challenges:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Extend the challenge creation interface in the admin panel</li>
        <li>Implement new evaluation algorithms for the AI judging system</li>
        <li>Create specialized UI components for new challenge types</li>
        <li>Update the scoring and leaderboard systems accordingly</li>
      </ul>
    </CardContent>
  </Card>
);

const CodeOverviewDocs = () => (
  <Card>
    <CardHeader>
      <CardTitle>Code and Libraries Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="text-lg font-semibold mb-2">Frontend Structure</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>src/components: Reusable UI components</li>
        <li>src/pages: Main page components for routing</li>
        <li>src/hooks: Custom React hooks for shared logic</li>
        <li>src/utils: Utility functions and helpers</li>
        <li>src/styles: Global styles and Tailwind configurations</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Key Libraries</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>React: Core library for building the user interface</li>
        <li>React Router: For client-side routing</li>
        <li>React Query: Data fetching and state management</li>
        <li>Tailwind CSS: Utility-first CSS framework</li>
        <li>Recharts: For creating interactive charts</li>
        <li>Lucide React: Icon library</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Backend Structure</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>src/api: API route handlers</li>
        <li>src/services: Business logic and data access layers</li>
        <li>src/models: Data models and schema definitions</li>
        <li>src/middleware: Custom middleware functions</li>
        <li>src/utils: Utility functions and helpers</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Database and ORM</h3>
      <p>The platform uses Supabase as the primary database and ORM solution:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>PostgreSQL: Underlying database engine</li>
        <li>Supabase Client: For database operations and real-time subscriptions</li>
        <li>Migrations: Managed through Supabase CLI</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Testing</h3>
      <p>The project includes a comprehensive testing suite:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Jest: For unit and integration testing</li>
        <li>React Testing Library: For component testing</li>
        <li>Cypress: For end-to-end testing</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Build and Development Tools</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Vite: Fast build tool and development server</li>
        <li>ESLint: For code linting</li>
        <li>Prettier: For code formatting</li>
        <li>Husky: For pre-commit hooks</li>
      </ul>
    </CardContent>
  </Card>
);

export default Documentation;