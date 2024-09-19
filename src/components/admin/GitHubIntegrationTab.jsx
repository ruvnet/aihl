import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const GitHubIntegrationTab = () => {
  const [accessToken, setAccessToken] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commits, setCommits] = useState([]);
  const [branches, setBranches] = useState([]);
  const [pullRequests, setPullRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch repositories, commits, branches, pull requests, and users
    // This is a placeholder for actual API calls
    setRepositories([
      { id: 1, name: 'repo1', description: 'Description 1', lastCommit: '2024-03-15' },
      { id: 2, name: 'repo2', description: 'Description 2', lastCommit: '2024-03-14' },
    ]);
    setCommits([
      { id: 1, message: 'Initial commit', author: 'user1', date: '2024-03-15' },
      { id: 2, message: 'Update README', author: 'user2', date: '2024-03-14' },
    ]);
    setBranches([
      { id: 1, name: 'main' },
      { id: 2, name: 'develop' },
    ]);
    setPullRequests([
      { id: 1, title: 'Feature: Add new component', author: 'user1', status: 'Open' },
      { id: 2, title: 'Fix: Resolve bug in API', author: 'user2', status: 'Merged' },
    ]);
    setUsers([
      { id: 1, username: 'user1', role: 'Admin' },
      { id: 2, username: 'user2', role: 'Contributor' },
    ]);
  }, []);

  const handleSaveToken = () => {
    // TODO: Implement saving GitHub access token
    toast.success('GitHub access token saved successfully');
  };

  const handleCreateRepo = () => {
    // TODO: Implement creating a new GitHub repository
    toast.success('New repository created successfully');
  };

  const handleDeleteRepo = (repoId) => {
    // TODO: Implement deleting a GitHub repository
    setRepositories(repositories.filter(repo => repo.id !== repoId));
    toast.success(`Repository ${repoId} deleted successfully`);
  };

  const handleCreateBranch = () => {
    // TODO: Implement creating a new branch
    toast.success('New branch created successfully');
  };

  const handleCreatePullRequest = () => {
    // TODO: Implement creating a new pull request
    toast.success('New pull request created successfully');
  };

  const handleUpdateUserPermissions = () => {
    // TODO: Implement updating user permissions
    toast.success('User permissions updated successfully');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>GitHub Access Token</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="Enter GitHub access token"
            />
            <Button onClick={handleSaveToken}>Save Token</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Repository Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleCreateRepo} className="mb-4">Create New Repository</Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Last Commit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repositories.map((repo) => (
                <TableRow key={repo.id}>
                  <TableCell>{repo.name}</TableCell>
                  <TableCell>{repo.description}</TableCell>
                  <TableCell>{repo.lastCommit}</TableCell>
                  <TableCell>
                    <Button onClick={() => setSelectedRepo(repo)} className="mr-2">View</Button>
                    <Button onClick={() => handleDeleteRepo(repo.id)} variant="destructive">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedRepo && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedRepo.name} Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="commits">
              <TabsList>
                <TabsTrigger value="commits">Commits</TabsTrigger>
                <TabsTrigger value="branches">Branches</TabsTrigger>
                <TabsTrigger value="pullRequests">Pull Requests</TabsTrigger>
                <TabsTrigger value="users">User Permissions</TabsTrigger>
              </TabsList>
              <TabsContent value="commits">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Message</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commits.map((commit) => (
                      <TableRow key={commit.id}>
                        <TableCell>{commit.message}</TableCell>
                        <TableCell>{commit.author}</TableCell>
                        <TableCell>{commit.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="branches">
                <Button onClick={handleCreateBranch} className="mb-4">Create New Branch</Button>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {branches.map((branch) => (
                      <TableRow key={branch.id}>
                        <TableCell>{branch.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="pullRequests">
                <Button onClick={handleCreatePullRequest} className="mb-4">Create New Pull Request</Button>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pullRequests.map((pr) => (
                      <TableRow key={pr.id}>
                        <TableCell>{pr.title}</TableCell>
                        <TableCell>{pr.author}</TableCell>
                        <TableCell>{pr.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="users">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>
                          <Select defaultValue={user.role}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Contributor">Contributor</SelectItem>
                              <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button onClick={handleUpdateUserPermissions}>Update</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>GitHub Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Access GitHub integration documentation and usage guidelines here.</p>
          <Button className="mt-2">View Documentation</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubIntegrationTab;
