import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle } from 'lucide-react';
import AdminPanel from '@/documentation/AdminPanel';
import TechnicalDocumentation from '@/documentation/TechnicalDocumentation';
import Deployment from '@/documentation/Deployment';
import Customization from '@/documentation/Customization';
import CodeLibrariesOverview from '@/documentation/CodeLibrariesOverview';

const Documentation = ({ activeSubSection, onSubSectionChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showChat, setShowChat] = useState(false);

  const sections = [
    { id: 'admin', label: 'Admin Panel', component: AdminPanel },
    { id: 'technical', label: 'Technical Documentation', component: TechnicalDocumentation },
    { id: 'deployment', label: 'Deployment', component: Deployment },
    { id: 'customization', label: 'Customization', component: Customization },
    { id: 'codeOverview', label: 'Code and Libraries Overview', component: CodeLibrariesOverview },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <form onSubmit={handleSearch} className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search documentation"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </form>
        <Button onClick={toggleChat} variant="outline">
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat
        </Button>
      </div>

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

      <Card>
        <CardContent className="p-6">
          {sections.find(s => s.id === activeSubSection)?.component()}
        </CardContent>
      </Card>

      {showChat && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Documentation Chat</h3>
            <p>Chat functionality to be implemented here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Documentation;