import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Deployment = () => (
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

      <h3 className="text-lg font-semibold mt-4 mb-2">CI/CD Pipeline</h3>
      <p>Implement a robust CI/CD pipeline for automated deployments:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Use GitHub Actions or GitLab CI for automated builds and tests</li>
        <li>Implement staging environments for pre-production testing</li>
        <li>Set up automated deployment to production upon successful tests</li>
        <li>Configure rollback mechanisms for quick recovery from issues</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Environment-Specific Configurations</h3>
      <p>Manage different configurations for various environments:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Development: Local setup with hot-reloading and debug tools</li>
        <li>Staging: Mirror of production for final testing</li>
        <li>Production: Optimized for performance and security</li>
      </ul>
    </CardContent>
  </Card>
);

export default Deployment;