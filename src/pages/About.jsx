import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Trophy, Users, Code, Brain, Clock, Target, Rocket } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto p-4 space-y-8 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-8">
        About AI Hacking League
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Cpu className="mr-2 text-primary" /> Our Mission
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
        <Card>
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

        <Card>
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
              <Badge variant="secondary">Cash Prizes</Badge>
              <Badge variant="secondary">AI Street Cred</Badge>
              <Badge variant="secondary">Career Power-Ups</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Users className="mr-2 text-primary" /> Governance &amp; Fair Play
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Our AI overlords maintain order with an iron fist (and sophisticated algorithms). 
            Human oversight steps in for complex disputes, ensuring a fair and epic battlefield for all challengers.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Code className="mr-2 text-primary" /> Join the Revolution
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

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Clock className="mr-2 text-primary" /> Challenge Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Sprint (15 minutes):</strong> Lightning-fast coding sprints to test your rapid problem-solving skills.</li>
            <li><strong>Dash (30 minutes):</strong> Balanced challenges that require quick thinking and more complex solutions.</li>
            <li><strong>Marathon (60 minutes):</strong> Extended sessions for tackling intricate AI problems and developing comprehensive solutions.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Brain className="mr-2 text-primary" /> AI-Powered Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>AI Judging System:</strong> Impartial evaluation of your code based on functionality, innovation, and efficiency.</li>
            <li><strong>Real-time Collaboration:</strong> Work seamlessly with your team using AI-enhanced coding environments.</li>
            <li><strong>Dynamic Leaderboards:</strong> Watch your rank update in real-time as you conquer challenges.</li>
            <li><strong>Skill Assessment:</strong> AI-driven analysis of your coding style and strengths to help you improve.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Target className="mr-2 text-primary" /> Why Join AI Hacking League?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Accelerate Your AI Skills:</strong> Gain hands-on experience with cutting-edge AI technologies.</li>
            <li><strong>Network with Elite Developers:</strong> Connect with top AI talent from around the globe.</li>
            <li><strong>Showcase Your Talents:</strong> Build a portfolio of impressive AI projects and achievements.</li>
            <li><strong>Win Big:</strong> Compete for substantial cash prizes and recognition in the AI community.</li>
            <li><strong>Shape the Future:</strong> Contribute to groundbreaking AI innovations through intense, time-constrained challenges.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Rocket className="mr-2 text-primary" /> Get Started Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Embark on your journey to AI mastery with these simple steps:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Create your AI Hacker profile</li>
            <li>Join a team or form your own elite squad</li>
            <li>Enroll in your first challenge</li>
            <li>Code, compete, and conquer</li>
            <li>Climb the ranks and claim your rewards</li>
          </ol>
          <p className="mt-4 text-xl font-bold text-center">
            The future of AI awaits your expertise. Are you up for the challenge?
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Badge variant="outline" className="text-2xl px-4 py-2">
          Game On, Hackers!
        </Badge>
      </div>
    </div>
  );
};

export default About;