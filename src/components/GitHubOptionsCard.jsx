import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react';

const GitHubOptionsCard = ({ repoUrl }) => {
  const [newBranch, setNewBranch] = useState('');
  const [prTitle, setPrTitle] = useState('');

  const handleCreateBranch = () => {
    // TODO: Implement branch creation logic
    console.log(`Creating branch: ${newBranch}`);
    setNewBranch('');
  };

  const handleCreatePR = () => {
    // TODO: Implement pull request creation logic
    console.log(`Creating PR: ${prTitle}`);
    setPrTitle('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <GitBranch className="mr-2" /> GitHub Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Repository URL: <a href={repoUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{repoUrl}</a></p>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Create Branch</h3>
            <div className="flex space-x-2">
              <Input
                value={newBranch}
                onChange={(e) => setNewBranch(e.target.value)}
                placeholder="New branch name"
              />
              <Button onClick={handleCreateBranch}>Create</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Create Pull Request</h3>
            <div className="flex space-x-2">
              <Input
                value={prTitle}
                onChange={(e) => setPrTitle(e.target.value)}
                placeholder="Pull request title"
              />
              <Button onClick={handleCreatePR}>Create PR</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Recent Commits</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Message</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Initial commit</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>2024-03-15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Update README</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>2024-03-16</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubOptionsCard;