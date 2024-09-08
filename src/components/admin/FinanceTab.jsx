import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const FinanceTab = () => {
  // Placeholder data
  const revenueData = [
    { month: 'Jan', revenue: 10000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 20000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 30000 },
  ];

  const payoutData = [
    { month: 'Jan', payout: 5000 },
    { month: 'Feb', payout: 7500 },
    { month: 'Mar', payout: 10000 },
    { month: 'Apr', payout: 12500 },
    { month: 'May', payout: 15000 },
  ];

  const prizePoolData = [
    { challenge: 'AI Chatbot Sprint', pool: 5000 },
    { challenge: 'ML Model Deployment', pool: 7500 },
    { challenge: 'NLP Innovation', pool: 10000 },
    { challenge: 'Computer Vision Challenge', pool: 12500 },
    { challenge: 'Quantum AI Hackathon', pool: 15000 },
  ];

  const topEarningsData = [
    { name: 'Neural Nexus Team', earnings: 25000 },
    { name: 'AIWizard42', earnings: 20000 },
    { name: 'Quantum Quorum Team', earnings: 18000 },
    { name: 'DataDruid', earnings: 15000 },
    { name: 'ML Pioneers Team', earnings: 12000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
    <Tabs defaultValue="revenue">
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="payouts">Payouts</TabsTrigger>
        <TabsTrigger value="prize-pools">Prize Pools</TabsTrigger>
        <TabsTrigger value="top-earnings">Top Earnings</TabsTrigger>
      </TabsList>
      <TabsContent value="revenue">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {renderResponsiveChart(LineChart, revenueData, "revenue")}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="payouts">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            {renderResponsiveChart(LineChart, payoutData, "payout")}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="prize-pools">
        <Card>
          <CardHeader>
            <CardTitle>Current Prize Pools</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prizePoolData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="challenge" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pool" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="top-earnings">
        <Card>
          <CardHeader>
            <CardTitle>Top Earnings (Solo & Team)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topEarningsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="earnings"
                >
                  {topEarningsData.map((entry, index) => (
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

export default FinanceTab;