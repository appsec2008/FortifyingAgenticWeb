export type Agent = {
  id: string;
  name: string;
  did: string;
  trustScore: number;
  status: 'Online' | 'Offline' | 'Compromised';
  behavioralHistory: {
    date: string;
    score: number;
  }[];
  runtime: {
    containment: 'Low' | 'Medium' | 'High';
    permissions: number;
  };
  credentials: string[];
};
