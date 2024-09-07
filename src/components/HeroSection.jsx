import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const HeroSection = () => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-lg shadow-xl">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6">
        Hacker League: Rapid Development Challenge
      </h1>
      <p className="text-xl mb-8 leading-relaxed max-w-3xl">
        Join the ultimate AI speed coding competition with real rewards. Build functional AI applications in minutes, 
        showcase your rapid development skills, and compete for substantial cash prizes.
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
);