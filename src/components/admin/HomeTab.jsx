import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, BarChart2, Shield } from 'lucide-react';

const HomeTab = () => {
  const sections = [
    { id: 'community', label: 'Community Management', icon: Users, description: 'Manage users, challenges, and content moderation.' },
    { id: 'system', label: 'System Configuration', icon: Settings, description: 'Configure platform settings, AI judging, and notifications.' },
    { id: 'analytics', label: 'Analytics & Reporting', icon: BarChart2, description: 'Access detailed platform analytics and generate reports.' },
    { id: 'security', label: 'Security & Compliance', icon: Shield, description: 'Manage security settings, backups, and compliance tools.' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
      <p className="text-gray-600 mb-6">
        This dashboard provides comprehensive tools for managing the AI Hacking League platform. 
        Select a section to get started:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <section.icon className="mr-2 h-5 w-5" />
                {section.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{section.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomeTab;