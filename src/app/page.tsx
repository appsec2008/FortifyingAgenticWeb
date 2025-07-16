'use client';

import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';
import { Shield, GitCommit, UserCheck, KeyRound, LayoutDashboard } from 'lucide-react';
import TrustDashboard from '@/components/trust-dashboard';
import CausalChainAnalyzer from '@/components/causal-chain-analyzer';
import AgentTrustEvaluator from '@/components/agent-trust-evaluator';
import AgentIdentity from '@/components/agent-identity';
import { Button } from '@/components/ui/button';

export default function GuardianDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  
  const renderContent = () => {
    switch(activeView) {
      case 'dashboard': return <TrustDashboard />;
      case 'analyzer': return <CausalChainAnalyzer />;
      case 'evaluator': return <AgentTrustEvaluator />;
      case 'identity': return <AgentIdentity />;
      default: return <TrustDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar className="border-r" collapsible="icon">
          <SidebarHeader className="p-2">
            <Button variant="ghost" className="h-auto p-2 justify-start w-full">
              <Shield className="w-8 h-8 text-primary" />
              <div className="group-data-[collapsible=icon]:hidden ml-2 text-left">
                <p className="font-bold text-lg">TrustNet</p>
                <p className="text-xs text-muted-foreground">Guardian</p>
              </div>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('dashboard')} isActive={activeView === 'dashboard'} tooltip="Dashboard">
                  <LayoutDashboard />
                  <span className="group-data-[collapsible=icon]:hidden">Trust Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('analyzer')} isActive={activeView === 'analyzer'} tooltip="Causal Chain Analyzer">
                  <GitCommit />
                  <span className="group-data-[collapsible=icon]:hidden">Causal Chain Analyzer</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('evaluator')} isActive={activeView === 'evaluator'} tooltip="Trust Assessor">
                  <UserCheck />
                  <span className="group-data-[collapsible=icon]:hidden">Trust Assessor</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('identity')} isActive={activeView === 'identity'} tooltip="Agent Identities">
                  <KeyRound />
                  <span className="group-data-[collapsible=icon]:hidden">Agent Identities</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
