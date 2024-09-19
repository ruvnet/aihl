import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Play, Pause, RotateCcw, Trophy, Target, Zap, Cpu, Users, MessageSquare, Video } from 'lucide-react';
import GitHubOptionsCard from '../components/GitHubOptionsCard';

const ChallengeManagement = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [contributions, setContributions] = useState([]);
  const [team, setTeam] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulated data fetching
    setChallenge({
      id,
      title: 'Rapid AI Chatbot Development',
      description: 'Build a functional AI chatbot using GPT-3.5 in just 30 minutes.',
      timeLimit: 1800,
      difficulty: 'Hard',
      participants: 120,
      repoUrl: 'https://github.com/user/ai-chatbot-challenge',
    });

    setContributions([
      { type: 'commit', message: 'Initial project setup', timestamp: '2024-03-15T10:05:00Z', author: 'Alice' },
      { type: 'branch', name: 'feature/chatbot-core', timestamp: '2024-03-15T10:10:00Z', author: 'Bob' },
      { type: 'commit', message: 'Implement basic chatbot functionality', timestamp: '2024-03-15T10:20:00Z', author: 'Charlie' },
      { type: 'pull-request', title: 'Add GPT-3.5 integration', timestamp: '2024-03-15T10:25:00Z', author: 'Alice' },
    ]);

    setTeam([
      { name: 'Alice', role: 'AI Specialist', avatar: '/avatars/alice.jpg' },
      { name: 'Bob', role: 'Frontend Developer', avatar: '/avatars/bob.jpg' },
      { name: 'Charlie', role: 'Backend Developer', avatar: '/avatars/charlie.jpg' },
    ]);

    setProgress(35); // Simulated progress
  }, [id]);

  useEffect(() => {
    let interval;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setTimeRemaining(challenge.timeLimit);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeRemaining(challenge.timeLimit);
    setIsRunning(false);
  };

  if (!challenge) {
    return <div className="flex justify-center items-center h-screen">
      <Zap className="animate-spin h-16 w-4 text-purple-500" />
    </div>;
  }

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">{challenge.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChallengeDetailsCard challenge={challenge} />
        <ChallengeTimerCard
          timeRemaining={timeRemaining}
          isRunning={isRunning}
          handleStart={handleStart}
          handlePause={handlePause}
          handleReset={handleReset}
          formatTime={formatTime}
          challenge={challenge}
        />
      </div>

      <TeamMembersCard team={team} />
      <GitHubOptionsCard repoUrl={challenge.repoUrl} />
      <ContributionsCard contributions={contributions} />
      <ChallengeProgressCard progress={progress} />
      <CollaborationToolsCard />
    </div>
  );
};

const ChallengeDetailsCard = ({ challenge }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl flex items-center">
        <Target className="mr-2" /> Challenge Details
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{challenge.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Trophy className="text-yellow-500 mr-2" />
          <span className="text-yellow-600 font-bold">{challenge.difficulty}</span>
        </div>
        <div className="flex items-center">
          <Users className="text-blue-500 mr-2" />
          <span>{challenge.participants} participants</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ChallengeTimerCard = ({ timeRemaining, isRunning, handleStart, handlePause, handleReset, formatTime, challenge }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl flex items-center">
        <Clock className="mr-2" /> Challenge Timer
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-6xl font-bold text-center mb-4">{formatTime(timeRemaining)}</div>
      <Progress value={(timeRemaining / challenge.timeLimit) * 100} className="mb-4" />
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <Button onClick={handleStart} disabled={timeRemaining === 0} className="bg-green-500 hover:bg-green-600 text-white">
            <Play className="mr-2 h-4 w-4" /> Start
          </Button>
        ) : (
          <Button onClick={handlePause} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Pause className="mr-2 h-4 w-4" /> Pause
          </Button>
        )}
        <Button onClick={handleReset} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </CardContent>
  </Card>
);

const TeamMembersCard = ({ team }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl flex items-center">
        <Users className="mr-2" /> Team Members
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-4">
        {team.map((member, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ContributionsCard = ({ contributions }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl flex items-center">
        <Cpu className="mr-2" /> Contributions
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributions.map((contribution, index) => (
            <TableRow key={index}>
              <TableCell>
                {contribution.type === 'commit' && <GitCommit className="inline mr-2 text-green-500" />}
                {contribution.type === 'branch' && <GitBranch className="inline mr-2 text-blue-500" />}
                {contribution.type === 'pull-request' && <GitPullRequest className="inline mr-2 text-purple-500" />}
                <span>{contribution.type}</span>
              </TableCell>
              <TableCell>{contribution.message || contribution.name || contribution.title}</TableCell>
              <TableCell>{contribution.author}</TableCell>
              <TableCell>{new Date(contribution.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const ChallengeProgressCard = ({ progress }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl flex items-center">
        <Target className="mr-2" /> Challenge Progress
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Progress value={progress} className="mb-2" />
      <p className="text-center">{progress}% Complete</p>
    </CardContent>
  </Card>
);

const CollaborationToolsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl flex items-center">
        <MessageSquare className="mr-2" /> Collaboration Tools
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex justify-center space-x-4">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <MessageSquare className="mr-2 h-4 w-4" /> Chat
        </Button>
        <Button className="bg-red-500 hover:bg-red-600 text-white">
          <Video className="mr-2 h-4 w-4" /> Video Call
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ChallengeManagement;
