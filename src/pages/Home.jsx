import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';
import { Trophy, Users, Clock, Brain, Zap, Award, Flame, Target, Star } from 'lucide-react';

const Home = () => {
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);

  useEffect(() => {
    // TODO: Fetch upcoming challenges from API
    setUpcomingChallenges([
      { 
        id: 1, 
        title: 'Rapid AI Chatbot Showdown', 
        date: '2024-03-15', 
        difficulty: 'Medium',
        timeLimit: '30 min',
        participants: 120,
        maxParticipants: 200,
        prize: '$5,000',
        xp: 1000,
        icon: <Zap className="h-8 w-8 text-yellow-400" />,
      },
      { 
        id: 2, 
        title: 'Neural Network Nemesis', 
        date: '2024-03-22', 
        difficulty: 'Hard',
        timeLimit: '45 min',
        participants: 80,
        maxParticipants: 150,
        prize: '$10,000',
        xp: 2000,
        icon: <Brain className="h-8 w-8 text-purple-500" />,
      },
      { 
        id: 3, 
        title: 'AI for Good: Climate Hack', 
        date: '2024-03-29', 
        difficulty: 'Easy',
        timeLimit: '20 min',
        participants: 250,
        maxParticipants: 500,
        prize: '$3,000 + $7,000 to charity',
        xp: 800,
        icon: <Flame className="h-8 w-8 text-green-400" />,
      },
    ]);
  }, []);

  const leagueFeatures = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Speed Challenges",
      description: "Compete in high-intensity AI development sprints lasting 15, 30, or 60 minutes."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Team Collaboration",
      description: "Form agile teams or compete solo to rapidly prototype AI solutions."
    },
    {
      icon: <Clock className="h-8 w-8 text-green-500" />,
      title: "Real-Time Development",
      description: "Build functional AI applications in record time using cutting-edge tools and APIs."
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "AI-Powered Tools",
      description: "Leverage the latest AI technologies to accelerate your development process."
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "Instant Evaluation",
      description: "Get real-time feedback on your AI solutions with our automated judging system."
    },
    {
      icon: <Award className="h-8 w-8 text-red-500" />,
      title: "Industry Recognition",
      description: "Showcase your rapid AI development skills and gain visibility in the tech world."
    }
  ];

  const sponsors = [
    "OpenAI", "Google Cloud", "Microsoft Azure", "AWS", "NVIDIA", "IBM Watson"
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-lg shadow-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6">
            AI Hacker League: Speed Development Challenge
          </h1>
          <p className="text-xl mb-8 leading-relaxed max-w-3xl">
            Join the ultimate AI speed coding competition. Build functional AI applications in minutes, 
            showcase your rapid development skills, and compete with the world's top AI developers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-700">
              <Link to="/challenges">View Challenges</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/register">Join Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* League Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Experience Lightning-Fast AI Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leagueFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <span className="mr-4">{feature.icon}</span>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Challenges Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Upcoming Speed Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingChallenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    {challenge.icon}
                    <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white px-2 py-1`}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-1">{challenge.title}</CardTitle>
                  <div className="flex items-center text-sm text-gray-300 mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{challenge.timeLimit}</span>
                    <span className="mx-2">|</span>
                    <Calendar className="w-4 h-4 mr-1" />
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
                      <span className="flex items-center text-purple-400">
                        <Star className="w-5 h-5 mr-1" />
                        {challenge.xp} XP
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

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 rounded-lg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Code at Warp Speed?</h2>
          <p className="text-xl mb-8">
            Join thousands of AI developers in the ultimate speed coding challenge. 
            Prove your ability to build functional AI applications in record time!
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-100 hover:text-purple-700">
            <Link to="/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Powered by Industry Leaders</h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                {sponsor}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;