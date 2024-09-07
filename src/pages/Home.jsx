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

  return (
    <div className="space-y-6">
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

      <h2 className="text-3xl font-bold">Welcome to AI Hacking League</h2>
      
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

      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Current/Recent Challenge placeholder</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>News Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Latest news and updates placeholder</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>AI-powered recommendations placeholder</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;