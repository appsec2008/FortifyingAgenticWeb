import type { Agent } from './types';

export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'DocuTranslate-v2',
    did: 'did:key:z6Mkk7yB2AnfP3se4tA1g4g1p2qj5k9c8d7e6f4a3b2c1d0e',
    trustScore: 0.92,
    status: 'Online',
    behavioralHistory: [
      { date: '2025-07-01', score: 0.95 },
      { date: '2025-07-02', score: 0.94 },
      { date: '2025-07-03', score: 0.93 },
      { date: '2025-07-04', score: 0.94 },
      { date: '2025-07-05', score: 0.92 },
    ],
    runtime: {
      containment: 'Low',
      permissions: 120,
    },
    credentials: ['data_processing_certified', 'hipaa_compliant', 'acme_corp_authorized'],
  },
  {
    id: 'agent-002',
    name: 'MarketAnalyzer-alpha',
    did: 'did:key:z6Mkt...fgh',
    trustScore: 0.65,
    status: 'Online',
    behavioralHistory: [
      { date: '2025-07-01', score: 0.70 },
      { date: '2025-07-02', score: 0.68 },
      { date: '2025-07-03', score: 0.65 },
      { date: '2025-07-04', score: 0.66 },
      { date: '2025-07-05', score: 0.65 },
    ],
    runtime: {
      containment: 'Medium',
      permissions: 45,
    },
    credentials: ['read_market_data', 'experimental_agent'],
  },
  {
    id: 'agent-003',
    name: 'SocialBot-v1.3',
    did: 'did:key:z6Mku...ijk',
    trustScore: 0.21,
    status: 'Compromised',
    behavioralHistory: [
      { date: '2025-07-01', score: 0.80 },
      { date: '2025-07-02', score: 0.75 },
      { date: '2025-07-03', score: 0.50 },
      { date: '2025-07-04', score: 0.35 },
      { date: '2025-07-05', score: 0.21 },
    ],
    runtime: {
      containment: 'High',
      permissions: 5,
    },
    credentials: ['post_to_social_media'],
  },
  {
    id: 'agent-004',
    name: 'CodeRepoScanner',
    did: 'did:key:z6Mkv...lmn',
    trustScore: 0.88,
    status: 'Online',
    behavioralHistory: [
      { date: '2025-07-01', score: 0.85 },
      { date: '2025-07-02', score: 0.86 },
      { date: '2025-07-03', score: 0.88 },
      { date: '2025-07-04', score: 0.87 },
      { date: '2025-07-05', score: 0.88 },
    ],
    runtime: {
      containment: 'Low',
      permissions: 75,
    },
    credentials: ['read_code_repository', 'security_scanner_certified'],
  },
  {
    id: 'agent-005',
    name: 'Legacy-Gateway',
    did: 'did:key:z6Mkw...opq',
    trustScore: 0.45,
    status: 'Offline',
    behavioralHistory: [
      { date: '2025-07-01', score: 0.50 },
      { date: '2025-07-02', score: 0.48 },
      { date: '2025-07-03', score: 0.47 },
      { date: '2025-07-04', score: 0.46 },
      { date: '2025-07-05', score: 0.45 },
    ],
    runtime: {
      containment: 'High',
      permissions: 20,
    },
    credentials: ['legacy_system_access'],
  },
];
