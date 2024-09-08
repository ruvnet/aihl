import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Wallet } from 'lucide-react';
import WalletSection from '../components/WalletSection';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    githubConnected: true,
    balance: 1500,
  });

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Blood', description: 'Completed your first challenge', icon: <Trophy className="h-6 w-6 text-yellow-500" /> },
    { id: 2, title: 'Code Ninja', description: 'Achieved a perfect score in a challenge', icon: <Star className="h-6 w-6 text-purple-500" /> },
    { id: 3, title: 'Team Player', description: 'Participated in 5 team challenges', icon: <Award className="h-6 w-6 text-blue-500" /> },
  ]);

  const [badges, setBadges] = useState([
    { id: 1, name: 'AI Master', color: 'bg-red-500' },
    { id: 2, name: 'Data Wizard', color: 'bg-blue-500' },
    { id: 3, name: 'ML Pioneer', color: 'bg-green-500' },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>GitHub Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: {user.githubConnected ? 'Connected' : 'Not connected'}</p>
              <Button className="mt-2">
                {user.githubConnected ? 'Disconnect GitHub' : 'Connect GitHub'}
              </Button>
            </CardContent>
          </Card>

          <Button className="w-full mt-6">Edit Profile</Button>
        </TabsContent>
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-4">
                    {achievement.icon}
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge key={badge.id} className={`${badge.color} text-white`}>
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="wallet">
          <WalletSection balance={user.balance} />
        </TabsContent>
      </Tabs>

      {/* Admin Dashboard Link */}
      <Card className="mt-6">
        <CardContent>
          <Button asChild className="w-full">
            <Link to="/admin">Access Admin Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;