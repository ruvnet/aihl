import React from 'react';

const AdminPanel = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Admin Panel Documentation</h2>
    
    <section>
      <h3 className="text-lg font-semibold mb-2">Overview</h3>
      <p>The Admin Panel provides a centralized interface for managing the AI Hacking League platform. Key features include:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>User and team management</li>
        <li>Challenge creation and moderation</li>
        <li>System configuration and settings</li>
        <li>Analytics and reporting tools</li>
        <li>Security and compliance controls</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Navigation</h3>
      <p>The panel is divided into several main sections, accessible via the primary navigation:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Community Management: Handle users, teams, and content moderation</li>
        <li>System Configuration: Adjust platform settings and AI judging parameters</li>
        <li>Analytics & Reporting: Access detailed platform metrics and generate reports</li>
        <li>Security & Compliance: Manage security settings, backups, and compliance tools</li>
        <li>Documentation: Access this comprehensive guide</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">AI Judging System</h3>
      <p>The AI Judging System is a core component of the platform, ensuring fair and consistent evaluation of challenge submissions:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Automated code analysis for functionality, efficiency, and innovation</li>
        <li>Customizable scoring criteria for different challenge types</li>
        <li>Real-time feedback generation for participants</li>
        <li>Integration with popular AI models and code evaluation tools</li>
        <li>Manual override options for admin review in exceptional cases</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Financial Controls</h3>
      <p>Robust financial management tools are available to admins:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Prize pool management and distribution</li>
        <li>Transaction monitoring and reporting</li>
        <li>Integration with payment gateways for secure fund handling</li>
        <li>Automated payout systems for challenge winners</li>
        <li>Financial analytics and forecasting tools</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Leaderboards</h3>
      <p>The leaderboard system is designed to encourage competition and showcase top performers:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Real-time updating of global and challenge-specific leaderboards</li>
        <li>Customizable ranking algorithms</li>
        <li>Seasonal and all-time leaderboards</li>
        <li>Integration with user profiles and achievement systems</li>
        <li>Admin tools for managing and resetting leaderboards</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Notification System</h3>
      <p>A comprehensive notification system keeps users engaged and informed:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Customizable notification templates for various events</li>
        <li>Multi-channel delivery (email, in-app, push notifications)</li>
        <li>Scheduled and triggered notifications</li>
        <li>User preference management for notification opt-ins</li>
        <li>Analytics on notification engagement and effectiveness</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Additional Admin Tools</h3>
      <p>Other important admin tools include:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Content moderation queue for user-generated content</li>
        <li>User support ticket management system</li>
        <li>Platform health monitoring and error logging</li>
        <li>Data export and backup tools</li>
        <li>A/B testing framework for platform features</li>
      </ul>
    </section>
  </div>
);

export default AdminPanel;