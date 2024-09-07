import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Trophy, Users, Clock, Brain, Zap, Flame, Target, CalendarDays, DollarSign } from 'lucide-react';

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-green-500';
    case 'medium': return 'bg-yellow-500';
    case 'hard': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const ChallengeIcon = ({ icon }) => {
  const IconComponent = { Zap, Brain, Flame }[icon];
  return <IconComponent className="h-8 w-8 text-yellow-400" />;
};

export const UpcomingChallenges = ({ challenges }) => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-12">Upcoming High-Stakes Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <ChallengeIcon icon={challenge.icon} />
                <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white px-2 py-1`}>
                  {challenge.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-2xl mb-1">{challenge.title}</CardTitle>
              <div className="flex items-center text-sm text-gray-300 mb-2">
                <Clock className="w-4 h-4 mr-1" />
                <span>{challenge.timeLimit}</span>
                <span className="mx-2">|</span>
                <CalendarDays className="w-4 h-4 mr-1" />
                <span>{challenge.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Participants
                  </span>
                  <span>{challenge.participants}/{challenge.maxParticipants}</span>
                </div>
                <Progress value={(challenge.participants / challenge.maxParticipants) * 100} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-yellow-400">
                    <Trophy className="w-5 h-5 mr-1" />
                    {challenge.prize}
                  </span>
                  <span className="flex items-center text-green-400">
                    <DollarSign className="w-5 h-5 mr-1" />
                    ${challenge.buyIn} Buy-in
                  </span>
                </div>
                <Button asChild className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  <Link to={`/challenges/${challenge.id}`}>
                    <Target className="w-4 h-4 mr-2" /> Enter Arena
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);