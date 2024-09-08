import React from 'react';

const Customization = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Customization Documentation</h2>
    
    <section>
      <h3 className="text-lg font-semibold mb-2">Theming</h3>
      <p>The platform uses Tailwind CSS for styling, allowing easy customization:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Modify tailwind.config.js to change color schemes and other design tokens</li>
        <li>Use the provided CSS variables for consistent theming across components</li>
        <li>Extend or override existing Tailwind classes in the global CSS file</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Adding New Features</h3>
      <p>To extend the platform's functionality:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Create new React components in the src/components directory</li>
        <li>Add new API endpoints in the backend services</li>
        <li>Extend the Supabase schema for additional data requirements</li>
        <li>Update the admin panel to include management for new features</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Integrating External Services</h3>
      <p>The platform can be extended with additional services:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Use the src/integrations directory to add new service integrations</li>
        <li>Implement OAuth for additional authentication providers</li>
        <li>Integrate with external APIs for expanded functionality (e.g., AI services)</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Localization</h3>
      <p>To support multiple languages:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Use a localization library like react-i18next</li>
        <li>Create language files for each supported language</li>
        <li>Implement a language switcher in the user interface</li>
        <li>Update the admin panel to manage translations</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Custom Challenge Types</h3>
      <p>To add new types of AI challenges:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Extend the challenge creation interface in the admin panel</li>
        <li>Implement new evaluation algorithms for the AI judging system</li>
        <li>Create specialized UI components for new challenge types</li>
        <li>Update the scoring and leaderboard systems accordingly</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Extending the AI Judging System</h3>
      <p>Customize the AI judging system for specific needs:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Integrate additional AI models or APIs for specialized evaluations</li>
        <li>Develop custom rubrics and scoring algorithms</li>
        <li>Implement domain-specific code analysis tools</li>
        <li>Create plugins for popular IDEs to support offline judging</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">User Experience Customization</h3>
      <p>Enhance the user experience with customizable features:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Implement user-configurable dashboards</li>
        <li>Create customizable notification preferences</li>
        <li>Develop a theme builder for users to personalize their interface</li>
        <li>Add support for user-created widgets and plugins</li>
      </ul>
    </section>
  </div>
);

export default Customization;