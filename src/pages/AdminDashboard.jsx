import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings, BarChart2, Shield, X } from 'lucide-react';
import CommunityManagement from '../components/admin/CommunityManagement';
import SystemConfiguration from '../components/admin/SystemConfiguration';
import AnalyticsReporting from '../components/admin/AnalyticsReporting';
import SecurityCompliance from '../components/admin/SecurityCompliance';
import HomeTab from '../components/admin/HomeTab';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'community', label: 'Community', icon: Users, component: CommunityManagement },
    { id: 'system', label: 'System', icon: Settings, component: SystemConfiguration },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, component: AnalyticsReporting },
    { id: 'security', label: 'Security', icon: Shield, component: SecurityCompliance },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          onClick={() => setActiveSection('home')}
          variant={activeSection === 'home' ? 'default' : 'outline'}
        >
          Home
        </Button>
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            variant={activeSection === section.id ? 'default' : 'outline'}
          >
            <section.icon className="h-5 w-5 mr-2" />
            {section.label}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          {activeSection === 'home' ? (
            <HomeTab />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{sections.find(s => s.id === activeSection).label}</h2>
                <Button variant="ghost" onClick={() => setActiveSection('home')}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {sections.find(s => s.id === activeSection).component()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;