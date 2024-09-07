import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Trophy, Users, Clock, Brain, Zap, Award } from 'lucide-react';

const Home = () => {
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);

  useEffect(() => {
    // TODO: Fetch upcoming challenges from API
    setUpcomingChallenges([
      { id: 1, title: 'AI Image Recognition', date: '2024-03-15', difficulty: 'Medium' },
      { id: 2, title: 'Natural Language Processing', date: '2024-03-22', difficulty: 'Hard' },
      { id: 3, title: 'Reinforcement Learning', date: '2024-03-29', difficulty: 'Easy' },
    ]);
  }, []);

  const leagueFeatures = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Competitive Challenges",
      description: "Engage in high-stakes AI competitions across various domains and difficulty levels."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Team Collaboration",
      description: "Form powerful teams or compete solo to solve complex AI problems."
    },
    {
      icon: <Clock className="h-8 w-8 text-green-500" />,
      title: "Time-Constrained Sprints",
      description: "Test your skills in 15, 30, or 60-minute coding sprints for maximum intensity."
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "Cutting-Edge AI Tools",
      description: "Access the latest AI technologies and APIs to build innovative solutions."
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "Real-Time Evaluation",
      description: "Get instant feedback on your submissions with our AI-powered judging system."
    },
    {
      icon: <Award className="h-8 w-8 text-red-500" />,
      title: "Prizes and Recognition",
      description: "Win exciting rewards and gain industry recognition for your AI expertise."
    }
  ];

  const sponsors = [
    "OpenAI", "DeepMind", "Google AI", "Microsoft Research", "IBM Watson", "NVIDIA AI"
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-lg shadow-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6">
            Unleash Your AI Potential
          </h1>
          <p className="text-xl mb-8 leading-relaxed max-w-3xl">
            Join the AI Hacking League and compete with the world's top AI developers. 
            Solve cutting-edge challenges, win prizes, and push the boundaries of artificial intelligence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-700">
              <Link to="/challenges">Explore Challenges</Link>
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
          <h2 className="text-4xl font-bold text-center mb-12">Experience the Future of AI Competitions</h2>
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
          <h2 className="text-4xl font-bold text-center mb-12">Upcoming Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingChallenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-2">Date: {challenge.date}</p>
                  <p className="text-lg">Difficulty: {challenge.difficulty}</p>
                  <Button asChild className="mt-4 w-full">
                    <Link to={`/challenges/${challenge.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 rounded-lg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Hack the Future?</h2>
          <p className="text-xl mb-8">
            Join thousands of AI enthusiasts and professionals in the ultimate coding battleground. 
            Start your journey to becoming an AI champion today!
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-700">
            <Link to="/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Backed by Industry Leaders</h2>
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