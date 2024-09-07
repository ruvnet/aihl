import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TeamApplicants = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    // TODO: Fetch applicants from API
    setApplicants([
      { id: 1, name: 'John Doe', email: 'john@example.com', githubProfile: 'johndoe', challengeResults: { 'AI Image Recognition': 95, 'NLP Challenge': 88 } },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', githubProfile: 'janesmith', challengeResults: { 'AI Image Recognition': 92, 'NLP Challenge': 90 } },
    ]);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Team Applicants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>GitHub Profile</TableHead>
                <TableHead>Challenge Results</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>
                    <a href={`https://github.com/${applicant.githubProfile}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {applicant.githubProfile}
                    </a>
                  </TableCell>
                  <TableCell>
                    {Object.entries(applicant.challengeResults).map(([challenge, score]) => (
                      <div key={challenge}>{challenge}: {score}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button asChild size="sm">
                      <Link to={`/applicant/${applicant.id}`}>View Profile</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamApplicants;