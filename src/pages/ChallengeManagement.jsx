import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, GitBranch, GitCommit, GitPullRequest, Play, Pause, RotateCcw } from 'lucide-react';

const ChallengeManagement = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    // Fetch challenge details
    // This is a mock implementation. Replace with actual API call.
    setChallenge({
      id,
      title: 'Rapid AI Chatbot Development',
      description: 'Build a functional AI chatbot using GPT-3.5 in just 30 minutes.',
      timeLimit: 1800, // 30 minutes in seconds
      difficulty: 'Hard',
      participants: 120,
      repoUrl: 'https://github.com/user/ai-chatbot-challenge',
    });

    // Fetch mock contributions
    setContributions([
      { type: 'commit', message: 'Initial project setup', timestamp: '2024-03-15T10:05:00Z' },
      { type: 'branch', name: 'feature/chatbot-core', timestamp: '2024-03-15T10:10:00Z' },
      { type: 'commit', message: 'Implement basic chatbot functionality', timestamp: '2024-03-15T10:20:00Z' },
      { type: 'pull-request', title: 'Add GPT-3.5 integration', timestamp: '2024-03-15T10:25:00Z' },
    ]);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{challenge.title}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Challenge Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{challenge.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <Badge variant="outline">{challenge.difficulty}</Badge>
            <span>{challenge.participants} participants</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-center mb-4">{formatTime(timeRemaining)}</div>
          <Progress value={(timeRemaining / challenge.timeLimit) * 100} className="mb-4" />
          <div className="flex justify-center space-x-4">
            {!isRunning ? (
              <Button onClick={handleStart} disabled={timeRemaining === 0}>
                <Play className="mr-2 h-4 w-4" /> Start
              </Button>
            ) : (
              <Button onClick={handlePause}>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </Button>
            )}
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GitHub Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Repository URL: <a href={challenge.repoUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{challenge.repoUrl}</a></p>
          <Button asChild>
            <a href={challenge.repoUrl} target="_blank" rel="noopener noreferrer">Open in GitHub</a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contributions.map((contribution, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {contribution.type === 'commit' && <GitCommit className="inline mr-2" />}
                    {contribution.type === 'branch' && <GitBranch className="inline mr-2" />}
                    {contribution.type === 'pull-request' && <GitPullRequest className="inline mr-2" />}
                    {contribution.type}
                  </TableCell>
                  <TableCell>{contribution.message || contribution.name || contribution.title}</TableCell>
                  <TableCell>{new Date(contribution.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeManagement;