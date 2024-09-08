import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AnalyticsTab = () => {
  // Placeholder data
  const userGrowthData = [
    { month: 'Jan', users: 1000 },
    { month: 'Feb', users: 1500 },
    { month: 'Mar', users: 2000 },
    { month: 'Apr', users: 2500 },
    { month: 'May', users: 3000 },
  ];

  const challengeCompletionData = [
    { difficulty: 'Easy', completed: 500 },
    { difficulty: 'Medium', completed: 300 },
    { difficulty: 'Hard', completed: 150 },
    { difficulty: 'Expert', completed: 50 },
  ];

  const userActivityData = [
    { day: 'Mon', active: 2000 },
    { day: 'Tue', active: 2200 },
    { day: 'Wed', active: 2100 },
    { day: 'Thu', active: 2300 },
    { day: 'Fri', active: 2400 },
    { day: 'Sat', active: 2000 },
    { day: 'Sun', active: 1800 },
  ];

  const skillDistributionData = [
    { name: 'AI', value: 400 },
    { name: 'ML', value: 300 },
    { name: 'Data Science', value: 200 },
    { name: 'NLP', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderResponsiveChart = (ChartComponent, data, dataKey, width = '100%', height = 300) => (
    <ResponsiveContainer width={width} height={height}>
      <ChartComponent data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      </ChartComponent>
    </ResponsiveContainer>
  );

  return (
    <Tabs defaultValue="user-growth">
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="user-growth">User Growth</TabsTrigger>
        <TabsTrigger value="challenge-completion">Challenge Completion</TabsTrigger>
        <TabsTrigger value="user-activity">User Activity</TabsTrigger>
        <TabsTrigger value="skill-distribution">Skill Distribution</TabsTrigger>
      </TabsList>
      <TabsContent value="user-growth">
        <Card>
          <CardHeader>
            <CardTitle>User Growth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            {renderResponsiveChart(LineChart, userGrowthData, "users")}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="challenge-completion">
        <Card>
          <CardHeader>
            <CardTitle>Challenge Completion by Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={challengeCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="difficulty" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="user-activity">
        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="skill-distribution">
        <Card>
          <CardHeader>
            <CardTitle>User Skill Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {skillDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTab;