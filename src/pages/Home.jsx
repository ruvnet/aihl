import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { FeatureSection } from '../components/FeatureSection';
import { UpcomingChallenges } from '../components/UpcomingChallenges';
import { CallToAction } from '../components/CallToAction';
import { SponsorSection } from '../components/SponsorSection';

const Home = () => {
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);

  useEffect(() => {
    setUpcomingChallenges([
      { 
        id: 1, 
        title: 'Rapid AI Chatbot Showdown', 
        date: '2024-03-15', 
        difficulty: 'Medium',
        timeLimit: '30 min',
        participants: 120,
        maxParticipants: 200,
        buyIn: 50,
        prize: '$7,500',
        xp: 1000,
        icon: 'Zap',
      },
      { 
        id: 2, 
        title: 'Neural Network Nemesis', 
        date: '2024-03-22', 
        difficulty: 'Hard',
        timeLimit: '45 min',
        participants: 80,
        maxParticipants: 150,
        buyIn: 100,
        prize: '$15,000',
        xp: 2000,
        icon: 'Brain',
      },
      { 
        id: 3, 
        title: 'AI for Good: Climate Hack', 
        date: '2024-03-29', 
        difficulty: 'Easy',
        timeLimit: '20 min',
        participants: 250,
        maxParticipants: 500,
        buyIn: 25,
        prize: '$5,000 + $7,000 to charity',
        xp: 800,
        icon: 'Flame',
      },
    ]);
  }, []);

  return (
    <div className="space-y-16">
      <HeroSection />
      <FeatureSection />
      <UpcomingChallenges challenges={upcomingChallenges} />
      <CallToAction />
      <SponsorSection />
    </div>
  );
};

export default Home;