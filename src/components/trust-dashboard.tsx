'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, ShieldAlert, TrendingUp } from 'lucide-react';
import { mockAgents } from '@/lib/mock-data';
import type { Agent } from '@/lib/types';

const getStatusBadgeVariant = (status: Agent['status']) => {
  switch (status) {
    case 'Online':
      return 'default';
    case 'Offline':
      return 'secondary';
    case 'Compromised':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getTrustScoreColor = (score: number) => {
  if (score > 0.8) return 'bg-green-500';
  if (score > 0.5) return 'bg-yellow-500';
  return 'bg-red-500';
};

const TrustDashboard = () => {
  const totalAgents = mockAgents.length;
  const highRiskAgents = mockAgents.filter(agent => agent.trustScore < 0.5).length;
  const averageTrust = (mockAgents.reduce((acc, agent) => acc + agent.trustScore, 0) / totalAgents * 100).toFixed(0);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Trust Dashboard</h1>
        <p className="text-muted-foreground">Real-time monitoring of agent trust and security posture.</p>
      </header>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAgents}</div>
            <p className="text-xs text-muted-foreground">All registered agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Agents</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highRiskAgents}</div>
            <p className="text-xs text-muted-foreground">Agents with trust score &lt; 0.5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Trust</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageTrust}%</div>
            <p className="text-xs text-muted-foreground">System-wide average trust score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Agent Overview</CardTitle>
            <CardDescription>Detailed list of all agents and their current trust metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Runtime Containment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-xs text-muted-foreground truncate" style={{maxWidth: '200px'}}>{agent.did}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={agent.trustScore * 100} className="w-24 h-2" indicatorClassName={getTrustScoreColor(agent.trustScore)} />
                        <span className="font-medium">{(agent.trustScore * 100).toFixed(0)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(agent.status)}>{agent.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{agent.runtime.containment}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Behavioral History</CardTitle>
            <CardDescription>Trust score trend for Agent-003 (SocialBot-v1.3)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAgents.find(a => a.id === 'agent-003')?.behavioralHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} fontSize={12} />
                  <YAxis domain={[0, 1]} fontSize={12} />
                  <Tooltip
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrustDashboard;
