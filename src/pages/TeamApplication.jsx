import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const TeamApplication = () => {
  const { teamId } = useParams();
  const [application, setApplication] = useState({
    name: '',
    email: '',
    experience: '',
    motivation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement application submission logic
    console.log('Submitting application:', application);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Apply to Join Team</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                id="name"
                name="name"
                value={application.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={application.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Relevant Experience</label>
              <Textarea
                id="experience"
                name="experience"
                value={application.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">Motivation to Join</label>
              <Textarea
                id="motivation"
                name="motivation"
                value={application.motivation}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit">Submit Application</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamApplication;