import { useEffect } from 'react';
import { useRobotStore } from './robot-store';
import { useTaskStore } from './task-store';
import { useProtocolStore } from './protocol-store';
import { RobotState } from '../domains/robots/types';

const GRID_SIZE = 1000;

export function useSimulation() {
  const { robots, setRobots, updateRobot } = useRobotStore();
  const { tasks, addTask, updateTask } = useTaskStore();
  const { updateNetworkStatus, addLog } = useProtocolStore();

  // Initialize
  useEffect(() => {
    const initialRobots = Array.from({ length: 5 }).map((_, i) => ({
      id: `ROBO-0${i + 1}`,
      name: `Agent Alpha-${i + 1}`,
      state: 'IDLE' as RobotState,
      battery: Math.floor(Math.random() * 40) + 60,
      coordinates: { x: Math.random() * GRID_SIZE, y: Math.random() * GRID_SIZE },
      taskId: null,
      signalStrength: Math.floor(Math.random() * 20) + 80,
      reliabilityScore: 99.9,
      walletBalance: Math.random() * 100,
      efficiencyScore: Math.floor(Math.random() * 15) + 85,
      systemHealth: 100,
      temperature: Math.floor(Math.random() * 20) + 30,
      riskScore: Math.floor(Math.random() * 10),
    }));
    
    setRobots(initialRobots);
    addLog({ type: 'INFO', message: 'System initialized. 5 agents online.', source: 'SYSTEM' });
  }, []);

  // Main simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update Uptime & Network
      useProtocolStore.getState().updateNetworkStatus({
        uptime: useProtocolStore.getState().networkStatus.uptime + 1,
        activeAgents: Object.keys(useRobotStore.getState().robots).length,
        simulatedLatency: Math.floor(Math.random() * 20) + 10,
        tps: Math.floor(Math.random() * 100) + 400
      });

      // 2. Random Task Generation
      if (Math.random() > 0.8) {
        const taskId = `TASK-${Math.floor(Math.random() * 10000)}`;
        addTask({
          id: taskId,
          title: `Analyze Sector ${Math.floor(Math.random() * 100)}`,
          priority: Math.random() > 0.8 ? 'HIGH' : 'MEDIUM',
          status: 'PENDING',
          assignedRobotId: null,
          rewardValue: Math.floor(Math.random() * 50) + 10,
          estimatedCompletion: Date.now() + 10000,
          createdAt: Date.now()
        });
        addLog({ type: 'INFO', message: `New task generated: ${taskId}`, source: 'MARKET' });
      }

      // 3. Robot Actions
      const currentRobots = useRobotStore.getState().robots;
      const currentTasks = useTaskStore.getState().tasks;

      Object.values(currentRobots).forEach(robot => {
        // Battery drain & Temp fluctuation
        if (Math.random() > 0.5) {
            const batteryChange = robot.battery > 0 ? -0.2 : 0;
            const tempChange = robot.state === 'IDLE' ? (robot.temperature > 30 ? -0.5 : 0.5) : 1.2;
            const riskChange = robot.temperature > 80 ? 5 : (Math.random() > 0.9 ? 1 : -0.5);
            
            updateRobot(robot.id, { 
                battery: Math.max(0, robot.battery + batteryChange),
                temperature: Math.min(100, Math.max(25, robot.temperature + tempChange)),
                riskScore: Math.min(100, Math.max(0, robot.riskScore + riskChange))
            });

            if (robot.temperature > 85) {
                addLog({ type: 'WARNING', message: `CRITICAL TEMP: ${robot.id} at ${robot.temperature.toFixed(1)}°C`, source: 'HARDWARE' });
            }
        }

        if (robot.state === 'IDLE') {
          // Find pending task
          const pendingTask = Object.values(currentTasks).find(t => t.status === 'PENDING');
          if (pendingTask) {
            updateTask(pendingTask.id, { 
              status: 'ASSIGNED', 
              assignedRobotId: robot.id,
              reasoning: `Optimal efficiency and shortest ETA` 
            });
            updateRobot(robot.id, { 
              state: 'MOVING', 
              taskId: pendingTask.id,
              targetCoordinates: { x: Math.random() * GRID_SIZE, y: Math.random() * GRID_SIZE }
            });
            addLog({ type: 'INFO', message: `${robot.id} assigned to ${pendingTask.id}`, source: 'ORCHESTRATOR' });
          }
        } else if (robot.state === 'MOVING') {
          // Move towards target
          if (robot.targetCoordinates) {
            const dx = robot.targetCoordinates.x - robot.coordinates.x;
            const dy = robot.targetCoordinates.y - robot.coordinates.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 15) {
              updateRobot(robot.id, { state: 'ANALYZING' });
              addLog({ type: 'INFO', message: `${robot.id} reached destination. Analyzing...`, source: robot.id });
            } else {
              const speed = 25;
              updateRobot(robot.id, {
                coordinates: {
                  x: robot.coordinates.x + (dx / dist) * speed,
                  y: robot.coordinates.y + (dy / dist) * speed
                }
              });
            }
          }
        } else if (robot.state === 'ANALYZING') {
          if (Math.random() > 0.6) {
            updateRobot(robot.id, { state: 'VERIFYING' });
            if (robot.taskId) updateTask(robot.taskId, { status: 'VERIFYING' });
            addLog({ type: 'INFO', message: `${robot.id} requesting consensus verification.`, source: robot.id });
          }
        } else if (robot.state === 'VERIFYING') {
          if (Math.random() > 0.7) {
            updateRobot(robot.id, { state: 'SETTLING' });
            addLog({ type: 'SUCCESS', message: `${robot.id} proof verified by network.`, source: 'CONSENSUS' });
          }
        } else if (robot.state === 'SETTLING') {
          if (robot.taskId && currentTasks[robot.taskId]) {
            const reward = currentTasks[robot.taskId].rewardValue;
            const proofId = `proof_v_${Math.random().toString(36).substring(7)}`;
            updateRobot(robot.id, { 
              state: 'IDLE', 
              taskId: null,
              walletBalance: robot.walletBalance + reward,
              lastProofId: proofId
            });
            updateTask(robot.taskId, { status: 'COMPLETED' });
            useProtocolStore.getState().updateNetworkStatus({
              totalSettlementVolume: useProtocolStore.getState().networkStatus.totalSettlementVolume + reward
            });
            addLog({ type: 'SETTLEMENT', message: `SOLANA ANCHOR SUCCESS: ${proofId} (TX: sol_tx_${Math.random().toString(36).substring(7)})`, source: 'BLOCKCHAIN' });
          }
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);
}
