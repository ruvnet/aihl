import React, { useState, useEffect } from 'react';
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
  const [activeSubSection, setActiveSubSection] = useState({
    community: '',
    system: '',
    analytics: '',
    security: '',
  });

  useEffect(() => {
    const savedSection = localStorage.getItem('adminActiveSection');
    const savedSubSections = JSON.parse(localStorage.getItem('adminActiveSubSections'));
    if (savedSection) {
      setActiveSection(savedSection);
    }
    if (savedSubSections) {
      setActiveSubSection(savedSubSections);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('adminActiveSection', activeSection);
    localStorage.setItem('adminActiveSubSections', JSON.stringify(activeSubSection));
  }, [activeSection, activeSubSection]);

  const sections = [
    { id: 'community', label: 'Community', icon: Users, component: CommunityManagement },
    { id: 'system', label: 'System', icon: Settings, component: SystemConfiguration },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, component: AnalyticsReporting },
    { id: 'security', label: 'Security', icon: Shield, component: SecurityCompliance },
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    // If there's no active subsection for this section, it will default to the first tab
    if (!activeSubSection[sectionId]) {
      const newSubSection = { ...activeSubSection };
      newSubSection[sectionId] = '';
      setActiveSubSection(newSubSection);
    }
  };

  const handleSubSectionChange = (sectionId, subSectionId) => {
    setActiveSubSection({ ...activeSubSection, [sectionId]: subSectionId });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          onClick={() => handleSectionChange('home')}
          variant={activeSection === 'home' ? 'default' : 'outline'}
          className="w-full sm:w-auto"
        >
          Home
        </Button>
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => handleSectionChange(section.id)}
            variant={activeSection === section.id ? 'default' : 'outline'}
            className="w-full sm:w-auto"
          >
            <section.icon className="h-5 w-5 mr-2" />
            {section.label}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          {activeSection === 'home' ? (
            <HomeTab onSectionChange={handleSectionChange} />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{sections.find(s => s.id === activeSection).label}</h2>
                <Button variant="ghost" onClick={() => handleSectionChange('home')}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {React.createElement(sections.find(s => s.id === activeSection).component, {
                activeSubSection: activeSubSection[activeSection],
                onSubSectionChange: (subSectionId) => handleSubSectionChange(activeSection, subSectionId),
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;