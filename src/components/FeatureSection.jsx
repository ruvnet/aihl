import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Clock, Brain, Zap, Award } from 'lucide-react';

const features = [
  { icon: <Trophy className="h-8 w-8 text-yellow-500" />, title: "Epic Battles", description: "Compete in high-stakes AI challenges with massive prize pools" },
  { icon: <Users className="h-8 w-8 text-blue-500" />, title: "Squad Up", description: "Form elite teams or go solo in intense coding showdowns" },
  { icon: <Clock className="h-8 w-8 text-green-500" />, title: "Speed Coding", description: "Build AI solutions at breakneck speeds in timed matches" },
  { icon: <Brain className="h-8 w-8 text-purple-500" />, title: "Neural Arsenal", description: "Leverage cutting-edge AI tools to dominate the competition" },
  { icon: <Zap className="h-8 w-8 text-orange-500" />, title: "Instant Feedback", description: "Get real-time performance analysis from our AI judges" },
  { icon: <Award className="h-8 w-8 text-red-500" />, title: "Glory & Riches", description: "Win cash, fame, and level up your AI career" },
];

export const FeatureSection = () => (
  <section className="py-16 bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">Experience High-Stakes AI Development</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-neon transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-white">
                <span className="mr-4">{feature.icon}</span>
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);