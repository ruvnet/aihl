import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold mb-6">About AI Hacking League</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The AI Hacking League is a cutting-edge competitive platform where elite developers and AI enthusiasts clash in high-stakes, time-constrained challenges to build innovative AI applications. Our mission is to push the boundaries of AI development at ludicrous speed, fostering innovation and collaboration in the field of artificial intelligence.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Participants compete solo or in small teams of up to three members.</li>
            <li>Challenges are time-constrained: 15-minute Sprints, 30-minute Dashes, or 60-minute Marathons.</li>
            <li>Competitors use approved AI tools, APIs, and libraries to create functional solutions.</li>
            <li>All code must be original and created during the challenge timeframe.</li>
            <li>Submissions are evaluated by an AI-based judging system, considering functionality, innovation, code quality, and user experience.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Governance and Fair Play</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The league is primarily governed by an AI-based management system, with human oversight for complex disputes. We employ strict anti-cheating measures, including AI-powered plagiarism detection and real-time monitoring of challenges.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prizes and Recognition</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Top performers in each challenge are eligible for exciting prizes and recognition. The league operates in seasons, culminating in championship events where season champions are determined by cumulative points and championship performance.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Join the Revolution</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Whether you're a seasoned AI developer or an enthusiastic beginner, the AI Hacking League offers a unique opportunity to showcase your skills, learn from peers, and contribute to the advancement of AI technology. Join us in coding the future, one challenge at a time!</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;