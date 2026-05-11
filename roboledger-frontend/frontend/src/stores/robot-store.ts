import { create } from 'zustand';
import { Robot, RobotState } from '../domains/robots/types';

interface RobotStore {
  robots: Record<string, Robot>;
  addRobot: (robot: Robot) => void;
  updateRobot: (id: string, updates: Partial<Robot>) => void;
  setRobots: (robots: Robot[]) => void;
  updateTelemetry: (data: any) => void;
}

export const useRobotStore = create<RobotStore>((set, get) => ({
  robots: {},
  addRobot: (robot) => set((state) => ({ 
    robots: { ...state.robots, [robot.id]: robot } 
  })),
  updateRobot: (id, updates) => set((state) => {
    if (!state.robots[id]) return state;
    return {
      robots: {
        ...state.robots,
        [id]: { ...state.robots[id], ...updates }
      }
    };
  }),
  setRobots: (robotsList) => set(() => {
    const robotsMap: Record<string, Robot> = {};
    robotsList.forEach(r => robotsMap[r.id] = r);
    return { robots: robotsMap };
  }),
  updateTelemetry: (data: any) => set((state) => {
    const updatedRobots = { ...state.robots };
    
    if (data && data.robots && Array.isArray(data.robots)) {
      data.robots.forEach((telemetryRobot: any) => {
        const id = telemetryRobot.id;
        if (updatedRobots[id]) {
          updatedRobots[id] = {
            ...updatedRobots[id],
            battery: telemetryRobot.battery !== undefined ? telemetryRobot.battery : updatedRobots[id].battery,
            coordinates: telemetryRobot.position ? { x: telemetryRobot.position.x, y: telemetryRobot.position.y } : updatedRobots[id].coordinates,
            taskId: telemetryRobot.current_task !== undefined ? telemetryRobot.current_task : updatedRobots[id].taskId,
            // Map telemetry status to valid RobotState if possible, else keep old
            state: (telemetryRobot.status === 'active' ? 'MOVING' : 
                   telemetryRobot.status === 'returning' ? 'IDLE' : 
                   updatedRobots[id].state) as RobotState
          };
        } else {
          // Add new robot if not exists
          updatedRobots[id] = {
            id: id,
            name: `Autonomous Unit ${id}`,
            state: (telemetryRobot.status === 'active' ? 'MOVING' : 'IDLE') as RobotState,
            battery: telemetryRobot.battery || 100,
            coordinates: telemetryRobot.position ? { x: telemetryRobot.position.x, y: telemetryRobot.position.y } : { x: 0, y: 0 },
            taskId: telemetryRobot.current_task || null,
            signalStrength: 100,
            reliabilityScore: 99.9,
            walletBalance: 0,
            efficiencyScore: 100,
            systemHealth: 100
          };
        }
      });
    }
    
    return { robots: updatedRobots };
  })
}));
