'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KeyRound, ShieldCheck, Fingerprint } from 'lucide-react';
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
  }
};

const AgentIdentity = () => {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Agent Identity Management</h1>
        <p className="text-muted-foreground">View and manage agent identities using DIDs and Verifiable Credentials.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockAgents.map((agent) => (
          <Card key={agent.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{agent.name}</CardTitle>
                <Badge variant={getStatusBadgeVariant(agent.status)}>{agent.status}</Badge>
              </div>
              <CardDescription>Agent ID: {agent.id}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-primary" />
                  Decentralized Identifier (DID)
                </h3>
                <p className="text-xs text-muted-foreground bg-secondary p-2 rounded-md break-all">{agent.did}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Verifiable Credentials
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.credentials.map((cred, index) => (
                    <Badge key={index} variant="outline">{cred}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2 mt-auto pt-4">
                 <h3 className="text-sm font-semibold flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-primary" />
                  Runtime Details
                </h3>
                <div className="text-sm text-muted-foreground">
                  Containment: <strong>{agent.runtime.containment}</strong> | Permissions: <strong>{agent.runtime.permissions}</strong>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentIdentity;
