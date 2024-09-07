import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <h1 className="text-3xl font-bold">Welcome to AI Hacking League</h1>
      
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