export interface ProtocolLog {
  id: string;
  timestamp: number;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS' | 'SETTLEMENT';
  message: string;
  source: string;
}

export interface NetworkStatus {
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  activeAgents: number;
  uptime: number;
  autonomousMode: boolean;
  simulatedLatency: number;
  tps: number;
  totalSettlementVolume: number;
}
