import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Clock, Brain, Zap, Award } from 'lucide-react';

const leagueFeatures = [
  {
    icon: <Trophy className="h-8 w-8 text-yellow-500" />,
    title: "High-Stakes Challenges",
    description: "Compete in AI development sprints with varying buy-ins and exciting prize pools."
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
    title: "Substantial Rewards",
    description: "Win cash prizes, gain industry recognition, and advance your AI career."
  }
];

export const FeatureSection = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-12">Experience High-Stakes AI Development</h2>
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
);