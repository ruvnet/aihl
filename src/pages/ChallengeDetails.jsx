import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import EnrollmentModal from '../components/EnrollmentModal';

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch challenge details from API
    setChallenge({
      id,
      title: 'AI Image Recognition Challenge',
      description: 'Develop an AI model to accurately recognize and classify images across various categories.',
      difficulty: 'Medium',
      participants: 120,
      prize: '$10,000',
      enrollmentDeadline: '2024-04-01',
      teamMembers: [
        { id: 1, name: 'John Doe', role: 'Team Lead' },
        { id: 2, name: 'Jane Smith', role: 'ML Engineer' },
        { id: 3, name: 'Bob Johnson', role: 'Data Scientist' },
      ],
    });
  }, [id]);

  const handleEnroll = () => {
    setIsEnrollmentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEnrollmentModalOpen(false);
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button asChild variant="ghost" className="mr-2">
          <Link to="/challenges"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Challenges</Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold">{challenge.title}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Challenge Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">{challenge.description}</p>
          <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
          <p><strong>Participants:</strong> {challenge.participants}</p>
          <p><strong>Prize:</strong> {challenge.prize}</p>
          <p><strong>Enrollment Deadline:</strong> {challenge.enrollmentDeadline}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {challenge.teamMembers.map((member) => (
              <li key={member.id} className="flex justify-between items-center">
                <span>{member.name}</span>
                <span className="text-sm text-gray-500">{member.role}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-4">View Team Page</Button>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={handleEnroll}>Enroll in Challenge</Button>

      <EnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onClose={handleCloseModal}
        challenge={challenge}
      />
    </div>
  );
};

export default ChallengeDetails;