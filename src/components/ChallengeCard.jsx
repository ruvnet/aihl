import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const ChallengeCard = ({ challenge }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{challenge.title}</span>
          <span className="text-2xl">{challenge.icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{challenge.description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Difficulty: {challenge.difficulty}</span>
          <span>Participants: {challenge.participants}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-green-600 font-bold">Reward: {challenge.reward}</span>
          <span className="text-gray-600">Sponsor: {challenge.sponsor}</span>
        </div>
        <Button asChild className="w-full">
          <Link to={`/challenges/${challenge.id}`}>View Challenge</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;