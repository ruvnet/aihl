import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Award } from 'lucide-react';
import EnrollmentModal from '../components/EnrollmentModal';

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch challenge details from API
    setChallenge({
      id,
      title: 'Rapid AI Chatbot Development',
      description: 'Build a functional AI chatbot in just 30 minutes using cutting-edge NLP models. Showcase your ability to quickly integrate APIs, implement natural language understanding, and create a responsive user interface.',
      difficulty: 'Medium',
      participants: 150,
      prize: '$7,500',
      sponsor: 'OpenAI',
      duration: '30 minutes',
      skills: ['NLP', 'API Integration', 'UI/UX Design'],
      enrollmentDeadline: '2024-04-01',
      teamSize: '1-3 members',
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
        <CardContent className="space-y-4">
          <p>{challenge.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Duration: {challenge.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>Team Size: {challenge.teamSize}</span>
            </div>
            <div className="flex items-center">
              <Award className="mr-2 h-4 w-4" />
              <span>Prize: {challenge.prize}</span>
            </div>
          </div>
          <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
          <p><strong>Participants:</strong> {challenge.participants}</p>
          <p><strong>Sponsor:</strong> {challenge.sponsor}</p>
          <p><strong>Enrollment Deadline:</strong> {challenge.enrollmentDeadline}</p>
          <div>
            <strong>Required Skills:</strong>
            <ul className="list-disc list-inside">
              {challenge.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
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