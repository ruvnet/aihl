import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Home = () => {
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);

  useEffect(() => {
    // TODO: Fetch upcoming challenges from API
    setUpcomingChallenges([
      { id: 1, title: 'AI Image Recognition', date: '2024-03-15' },
      { id: 2, title: 'Natural Language Processing', date: '2024-03-22' },
      { id: 3, title: 'Reinforcement Learning', date: '2024-03-29' },
    ]);
  }, []);

  const leagueOverview = [
    {
      title: "Join Challenges",
      description: "Browse and enroll in AI challenges across various domains and difficulty levels."
    },
    {
      title: "Form Teams",
      description: "Collaborate with other participants or go solo to tackle complex AI problems."
    },
    {
      title: "Develop Solutions",
      description: "Use cutting-edge AI technologies to create innovative solutions within the challenge timeframe."
    },
    {
      title: "Submit & Evaluate",
      description: "Submit your solutions and have them evaluated against rigorous criteria and benchmarks."
    },
    {
      title: "Earn Points",
      description: "Gain points based on your performance and climb the global leaderboard."
    },
    {
      title: "Win Prizes",
      description: "Top performers in each challenge are eligible for exciting prizes and recognition."
    }
  ];

  const sponsors = [
    "OpenAI", "DeepMind", "Google AI", "Microsoft Research", "IBM Watson", "NVIDIA AI"
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
              Welcome to AI Hacking League
            </h1>
            <p className="text-xl mb-6">
              Join the ultimate AI challenge platform and showcase your skills!
            </p>
            <Button asChild className="bg-white text-blue-600 hover:bg-blue-100">
              <Link to="/challenges">Explore Challenges</Link>
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/placeholder.svg"
              alt="AI Hacking League"
              className="w-full max-w-md rounded-lg shadow-md mx-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* League Overview Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">How AI Hacking League Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leagueOverview.map((step, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Challenges Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {upcomingChallenges.map((challenge) => (
              <li key={challenge.id} className="flex justify-between items-center">
                <span>{challenge.title}</span>
                <span className="text-sm text-gray-500">{challenge.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Sponsors Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Sponsored By</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="text-xl font-semibold text-gray-700">
              {sponsor}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;