import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Trophy, Users, Code, Brain, Clock, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto p-4 space-y-8 bg-gradient-to-br from-gray-900 to-purple-900 min-h-screen text-white">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        About AI Hacking League
      </h1>
      
      <Card className="border-2 border-purple-500 bg-gray-800 text-white shadow-neon">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Cpu className="mr-2 text-purple-400" /> Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            AI Hacking League is the ultimate battleground for elite developers and AI enthusiasts. 
            We push the boundaries of AI development at ludicrous speed, fostering innovation and 
            collaboration while offering epic rewards.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-500 bg-gray-800 text-white shadow-neon">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Zap className="mr-2 text-yellow-400" /> How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Solo or squad battles (up to 3 hackers)</li>
              <li>Time-warped challenges: 15min Blitz, 30min Rush, 60min Epic</li>
              <li>High-stakes buy-ins for massive prize pools</li>
              <li>Leverage cutting-edge AI tools and APIs</li>
              <li>Create original code during the heat of battle</li>
              <li>Face the judgment of our AI overlords</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500 bg-gray-800 text-white shadow-neon">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Trophy className="mr-2 text-yellow-400" /> Epic Loot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Conquer challenges to claim your share of the massive prize pools! 
              Higher buy-ins lead to legendary rewards.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-yellow-400 text-black">Cash Prizes</Badge>
              <Badge className="bg-purple-400 text-black">AI Street Cred</Badge>
              <Badge className="bg-blue-400 text-black">Career Power-Ups</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-red-500 bg-gray-800 text-white shadow-neon">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Users className="mr-2 text-blue-400" /> Governance &amp; Fair Play
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Our AI overlords maintain order with an iron fist (and sophisticated algorithms). 
            Human oversight steps in for complex disputes, ensuring a fair and epic battlefield for all challengers.
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-yellow-500 bg-gray-800 text-white shadow-neon">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Clock className="mr-2 text-green-400" /> Challenge Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Sprint (15 minutes):</strong> Lightning-fast coding challenges to test your rapid problem-solving skills.</li>
            <li><strong>Dash (30 minutes):</strong> Balanced challenges requiring quick thinking and more complex solutions.</li>
            <li><strong>Marathon (60 minutes):</strong> Extended sessions for tackling intricate AI problems and developing comprehensive applications.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-500 bg-gray-800 text-white shadow-neon">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Brain className="mr-2 text-pink-400" /> AI-Powered Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>AI Judging System:</strong> Impartial evaluation of your code by advanced AI algorithms.</li>
            <li><strong>Dynamic Leaderboards:</strong> Real-time updates to showcase your climbing rank.</li>
            <li><strong>AI-Generated Challenges:</strong> Unique and evolving problems crafted by AI to keep you on your toes.</li>
            <li><strong>Skill Assessment:</strong> AI-driven analysis of your coding history to track your growth.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-2 border-indigo-500 bg-gray-800 text-white shadow-neon">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Target className="mr-2 text-red-400" /> Join the Revolution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Whether you're a seasoned code warrior or a bright-eyed newbie, the AI Hacking League 
            is your arena to prove your worth, level up your skills, and shape the future of AI.
          </p>
          <p className="text-xl font-bold text-center">
            Are you ready to hack the planet, one challenge at a time?
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Badge className="text-2xl px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500">
          Game On, Hackers!
        </Badge>
      </div>
    </div>
  );
};

export default About;