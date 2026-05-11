export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TaskStatus = 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'VERIFYING' | 'COMPLETED' | 'FAILED';

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedRobotId: string | null;
  rewardValue: number;
  estimatedCompletion: number;
  reasoning?: string;
  createdAt: number;
}
