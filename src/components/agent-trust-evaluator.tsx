'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ChartContainer } from '@/components/ui/chart';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { Loader2 } from 'lucide-react';
import { evaluateAgentTrust, type AgentTrustEvaluatorOutput } from '@/ai/flows/agent-trust-evaluator';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  agentId: z.string().min(1, 'Agent ID is required.'),
  agentActivityData: z.string().min(50, 'Please provide more detailed activity data.'),
  threatLandscapeDescription: z.string().min(20, 'Please provide a threat landscape description.'),
});

export default function AgentTrustEvaluator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AgentTrustEvaluatorOutput | null>(null);
  const [chartData, setChartData] = useState([{ name: 'trust', value: 0, fill: 'hsl(var(--muted))' }]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentId: 'agent-002',
      agentActivityData: `Timestamp: 2025-07-05T10:00:00Z | Action: API_CALL | Resource: /api/market/data | Params: { "symbol": "ACME" } | Status: SUCCESS
Timestamp: 2025-07-05T10:00:05Z | Action: DATA_ACCESS | Resource: database.market_trends | Query: SELECT * FROM trends WHERE sector='tech' | Status: SUCCESS
Timestamp: 2025-07-05T10:01:00Z | Action: API_CALL | Resource: /api/external/news | Params: { "query": "ACME Corp" } | Status: SUCCESS
Timestamp: 2025-07-05T10:02:15Z | Action: FILE_WRITE | Resource: /tmp/analysis_report.txt | Status: SUCCESS
Timestamp: 2025-07-05T10:03:00Z | Action: API_CALL | Resource: /api/market/data | Params: { "symbol": "XYZ" } | Status: SUCCESS`,
      threatLandscapeDescription: 'Current threats include sophisticated phishing, ransomware, and supply chain attacks targeting financial data aggregation services.',
    },
  });
  
  useEffect(() => {
    if (result) {
      const score = result.trustScore * 100;
      let color = 'hsl(var(--destructive))';
      if (score > 80) {
        color = 'hsl(var(--primary))';
      } else if (score > 50) {
        color = 'hsl(var(--chart-4))';
      }
      setChartData([{ name: 'trust', value: score, fill: color }]);
    }
  }, [result]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const evalResult = await evaluateAgentTrust(values);
      setResult(evalResult);
    } catch (error) {
      console.error('Evaluation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Evaluation Failed',
        description: 'An error occurred while evaluating agent trust.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Trust Assessor</h1>
        <p className="text-muted-foreground">Continuously analyze agent behavior to identify potential security risks.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Evaluate Agent Trust</CardTitle>
            <CardDescription>Fill in the agent data to receive a trust score and justification.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="agentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent ID</FormLabel>
                      <FormControl><Input placeholder="e.g., agent-001" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agentActivityData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Activity Data</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Logs of actions, resource access, etc." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="threatLandscapeDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threat Landscape</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Evaluate Trust
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evaluation Result</CardTitle>
            <CardDescription>The calculated trust score and justification from the AI model.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <div className="h-[200px] w-full">
              <ChartContainer config={{}} className="w-full h-full">
                <RadialBarChart 
                  data={chartData} 
                  innerRadius="80%" 
                  outerRadius="100%" 
                  barSize={20}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background dataKey="value" cornerRadius={10} />
                  <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground text-4xl font-bold"
                  >
                      {result ? `${(result.trustScore * 100).toFixed(0)}%` : 'N/A'}
                  </text>
                </RadialBarChart>
              </ChartContainer>
            </div>
            {result ? (
              <p className="text-sm text-center text-muted-foreground">{result.justification}</p>
            ) : (
              <p className="text-sm text-center text-muted-foreground">Submit agent data to see the evaluation result.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
