import { create } from 'zustand';
import { NetworkStatus, ProtocolLog } from '../domains/protocol/types';

interface ProtocolStore {
  networkStatus: NetworkStatus;
  logs: ProtocolLog[];
  updateNetworkStatus: (updates: Partial<NetworkStatus>) => void;
  addLog: (log: Omit<ProtocolLog, 'id' | 'timestamp'>) => void;
}

export const useProtocolStore = create<ProtocolStore>((set) => ({
  networkStatus: {
    status: 'ONLINE',
    activeAgents: 0,
    uptime: 0,
    autonomousMode: true,
    simulatedLatency: 12,
    tps: 450,
    totalSettlementVolume: 10452.50
  },
  logs: [],
  updateNetworkStatus: (updates) => set((state) => ({
    networkStatus: { ...state.networkStatus, ...updates }
  })),
  addLog: (log) => set((state) => {
    const newLog: ProtocolLog = {
      ...log,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now()
    };
    return {
      logs: [newLog, ...state.logs].slice(0, 100) // Keep last 100 logs
    };
  })
}));
