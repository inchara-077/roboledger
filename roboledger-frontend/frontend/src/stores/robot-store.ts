import { create } from 'zustand';
import { Robot, RobotState } from '../domains/robots/types';
import { apiService } from '../services/api/client';

interface RobotStore {
  robots: Record<string, Robot>;

  addRobot: (robot: Robot) => void;

  updateRobot: (
    id: string,
    updates: Partial<Robot>
  ) => void;

  setRobots: (robots: Robot[]) => void;

  updateTelemetry: (data: any) => void;

  fetchRobots: () => Promise<void>;
}

export const useRobotStore = create<RobotStore>((set, get) => ({
  robots: {},

  fetchRobots: async () => {
    try {
      const response = await apiService.getRobotStatus();

      if (response?.data) {
        const robotsMap: Record<string, Robot> = {};

        response.data.forEach((robot: any) => {
          robotsMap[robot.robotId] = {
            id: robot.robotId,
            name: robot.name,
            state:
              robot.status === 'ACTIVE'
                ? ('MOVING' as RobotState)
                : ('IDLE' as RobotState),
            battery: 100,
            coordinates: { x: 0, y: 0 },
            taskId: null,
            signalStrength: 100,
            reliabilityScore: 99,
            walletBalance: 0,
            efficiencyScore: 100,
            systemHealth: 100,
          };
        });

        set({ robots: robotsMap });
      }
    } catch (error) {
      console.error('Failed to fetch robots:', error);
    }
  },

  addRobot: (robot) =>
    set((state) => ({
      robots: {
        ...state.robots,
        [robot.id]: robot,
      },
    })),

  updateRobot: (id, updates) =>
    set((state) => {
      if (!state.robots[id]) return state;

      return {
        robots: {
          ...state.robots,
          [id]: {
            ...state.robots[id],
            ...updates,
          },
        },
      };
    }),

  setRobots: (robotsList) =>
    set(() => {
      const robotsMap: Record<string, Robot> = {};

      robotsList.forEach((robot) => {
        robotsMap[robot.id] = robot;
      });

      return {
        robots: robotsMap,
      };
    }),

  updateTelemetry: (data: any) =>
    set((state) => {
      const updatedRobots = { ...state.robots };

      if (data && data.robots && Array.isArray(data.robots)) {
        data.robots.forEach((telemetryRobot: any) => {
          const id = telemetryRobot.id;

          if (updatedRobots[id]) {
            updatedRobots[id] = {
              ...updatedRobots[id],

              battery:
                telemetryRobot.battery !== undefined
                  ? telemetryRobot.battery
                  : updatedRobots[id].battery,

              coordinates: telemetryRobot.position
                ? {
                    x: telemetryRobot.position.x,
                    y: telemetryRobot.position.y,
                  }
                : updatedRobots[id].coordinates,

              taskId:
                telemetryRobot.current_task !== undefined
                  ? telemetryRobot.current_task
                  : updatedRobots[id].taskId,

              state:
                telemetryRobot.status === 'active'
                  ? ('MOVING' as RobotState)
                  : telemetryRobot.status === 'returning'
                  ? ('IDLE' as RobotState)
                  : updatedRobots[id].state,
            };
          }
        });
      }

      return {
        robots: updatedRobots,
      };
    }),
}));