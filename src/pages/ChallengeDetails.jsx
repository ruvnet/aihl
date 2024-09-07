import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Award, Zap, Target, Brain, Code, GitBranch, Trophy, DollarSign } from 'lucide-react';
import EnrollmentModal from '../components/EnrollmentModal';

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

  useEffect(() => {
    // Simulated API call
    setChallenge({
      id,
      title: 'Quantum AI Hackathon',
      description: 'Harness the power of quantum computing to create a groundbreaking AI model in just 60 minutes. Push the boundaries of what\'s possible in the realm of artificial intelligence!',
      difficulty: 'Legendary',
      participants: 150,
      maxParticipants: 200,
      buyIn: 250,
      prize: {
        amount: 50000,
        currency: 'USD',
        sponsor: 'QuantumTech Industries'
      },
      duration: '60 minutes',
      startDate: '2024-05-15T18:00:00Z',
      skills: ['Quantum Computing', 'Machine Learning', 'Algorithm Design'],
      enrollmentDeadline: '2024-05-14T23:59:59Z',
      teamSize: '1-3 hackers',
      previousWinner: {
        name: 'Quantum Quorum',
        score: 98
      },
      requirements: [
        'Proficiency in quantum circuit design',
        'Experience with quantum machine learning libraries',
        'Strong understanding of AI principles'
      ],
      rewards: [
        '🏆 Quantum Champion title',
        '💼 Internship opportunity at QuantumTech',
        '🎟️ VIP pass to Global AI Summit'
      ]
    });
  }, [id]);

  const handleEnroll = () => {
    setIsEnrollmentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEnrollmentModalOpen(false);
  };

  if (!challenge) {
    return <div className="flex justify-center items-center h-screen">
      <Zap className="animate-spin h-16 w-16 text-blue-500" />
    </div>;
  }

  const timeRemaining = new Date(challenge.startDate) - new Date();
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="flex items-center mb-4">
        <Button asChild variant="ghost" className="mr-2 text-white hover:text-gray-300">
          <Link to="/challenges"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Challenges</Link>
        </Button>
      </div>

      <Card className="border-2 border-purple-500 bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-extrabold">{challenge.title}</CardTitle>
            <Badge className="text-xl px-3 py-1 bg-yellow-400 text-black font-bold">
              {challenge.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{challenge.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-300" />
              <span>{challenge.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-green-300" />
              <span>{challenge.teamSize}</span>
            </div>
            <div className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-yellow-300" />
              <span>{challenge.prize.amount} {challenge.prize.currency}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-green-300" />
              <span>${challenge.buyIn} Buy-in</span>
            </div>
            <div className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-red-300" />
              <span>{challenge.participants}/{challenge.maxParticipants} Enrolled</span>
            </div>
          </div>
          <Progress value={(challenge.participants / challenge.maxParticipants) * 100} className="mb-2" />
          <p className="text-sm text-center mb-4">Enrollment Progress</p>
          <div className="text-center mb-4">
            <p className="text-2xl font-bold">{days}d {hours}h</p>
            <p className="text-sm">Until Challenge Starts</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 text-purple-500" /> Required Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {challenge.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm bg-purple-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2 text-green-500" /> Challenge Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {challenge.requirements.map((req, index) => (
                <li key={index} className="text-sm mb-1">{req}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitBranch className="mr-2 text-blue-500" /> Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-none space-y-2">
            {challenge.rewards.map((reward, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2 text-xl">{reward.split(' ')[0]}</span>
                <span>{reward.split(' ').slice(1).join(' ')}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2" /> Previous Champion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold">{challenge.previousWinner.name}</p>
          <p>Score: {challenge.previousWinner.score}</p>
        </CardContent>
      </Card>

      <Button 
        className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg" 
        onClick={handleEnroll}
      >
        Enroll in Challenge (${challenge.buyIn} Buy-in)
      </Button>

      <EnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onClose={handleCloseModal}
        challenge={challenge}
      />
    </div>
  );
};

export default ChallengeDetails;