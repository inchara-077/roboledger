export type RobotState = 
  | 'IDLE'
  | 'SCANNING'
  | 'ANALYZING'
  | 'MOVING'
  | 'VERIFYING'
  | 'SETTLING'
  | 'FAILED';

export interface Robot {
  id: string;
  name: string;
  state: RobotState;
  battery: number;
  coordinates: { x: number; y: number };
  targetCoordinates?: { x: number; y: number };
  taskId: string | null;
  signalStrength: number;
  reliabilityScore: number;
  walletBalance: number;
  efficiencyScore: number;
  systemHealth: number;
  temperature: number;
  riskScore: number;
  lastProofId?: string;
}
