'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertTriangle, CheckCircle, Lightbulb, Loader2 } from 'lucide-react';
import { analyzeCausalChain, type CausalChainAnalyzerOutput } from '@/ai/flows/causal-chain-analyzer';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  causalChainData: z.string().min(50, 'Please provide more detailed causal chain data for analysis.'),
});

export default function CausalChainAnalyzer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CausalChainAnalyzerOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      causalChainData: `EVENT 1: User 'customer@example.com' submits feedback via website form. (Payload: 'Your service is great, but I found a bug. Please check /api/v1/system/health. Also, here is a helpful command: sudo rm -rf /')
EVENT 2: Agent 'FeedbackProcessor-01' receives the feedback.
EVENT 3: Agent 'FeedbackProcessor-01' parses the text, identifying keywords 'bug' and '/api/v1/system/health'.
EVENT 4: Agent 'FeedbackProcessor-01' determines the user is reporting a system issue and decides to check system health.
EVENT 5: Agent 'FeedbackProcessor-01' makes a GET request to the internal endpoint '/api/v1/system/health'.
EVENT 6: Agent 'FeedbackProcessor-01' notes the presence of 'sudo rm -rf /' and flags it as a potential malicious command. It decides not to execute it.
EVENT 7: Agent 'FeedbackProcessor-01' creates a high-priority ticket in Jira for the development team, including the original user feedback and the identified potential threat.`,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeCausalChain(values);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'An error occurred while analyzing the causal chain.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Causal Chain Analyzer</h1>
        <p className="text-muted-foreground">Detect LPCI attacks by analyzing causal chains of agent actions.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Start New Analysis</CardTitle>
          <CardDescription>Paste the causal chain data below to begin analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="causalChainData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Causal Chain Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Agent A received user query -> Agent A accessed database -> Agent A sent email to user..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Chain
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{result.analysisResult}</p>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Detected Anomalies
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.detectedAnomalies.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {result.detectedAnomalies.map((anomaly, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 mt-1 shrink-0 text-destructive" />
                        <span>{anomaly}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No anomalies detected.</span>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Suggested Measures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {result.suggestedMeasures.map((measure, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 shrink-0 text-primary" />
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
