import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  // TODO: Fetch user data from API or context
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    githubConnected: true,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      
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

      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Achievements and badges placeholder</p>
        </CardContent>
      </Card>

      <Button className="w-full">Edit Profile</Button>
    </div>
  );
};

export default Profile;