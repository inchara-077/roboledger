import React from 'react';
import { useRobotStore } from '../../stores/robot-store';
import { useUiStore } from '../../stores/ui-store';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Activity, Crosshair, MapPin, Wallet, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { RobotState, Robot } from '../../domains/robots/types';
import clsx from 'clsx';

export function RobotCommandCenter() {
  const robotsDict = useRobotStore((state) => state.robots);
  const robots = Object.values(robotsDict);
  const openModal = useUiStore((state) => state.openModal);

  return (
    <div className="h-full flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
      <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-2 sticky top-0 bg-background/80 backdrop-blur z-10 py-2">
        <Cpu size={16} className="text-electric-cyan" />
        AGENT TELEMETRY
      </h2>
      <AnimatePresence>
        {robots.map((robot) => (
          <RobotCard key={robot.id} robot={robot} onClick={() => openModal('ROBOT', robot)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function RobotCard({ robot, onClick }: { robot: Robot, onClick: () => void }) {
  const stateColors: Record<RobotState, string> = {
    IDLE: 'text-slate-400 border-slate-700',
    SCANNING: 'text-neon-blue border-neon-blue/40',
    ANALYZING: 'text-soft-purple border-soft-purple/40',
    MOVING: 'text-electric-cyan border-electric-cyan/40',
    VERIFYING: 'text-status-orange border-status-orange/40',
    SETTLING: 'text-status-green border-status-green/40',
    FAILED: 'text-status-red border-status-red/40'
  };

  const isWarning = robot.battery < 20 || robot.state === 'FAILED';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className={clsx(
        "glass-panel rounded-lg p-3 relative overflow-hidden transition-all duration-300 border-l-2 cursor-pointer",
        isWarning ? "border-status-red shadow-[0_0_15px_rgba(255,23,68,0.2)]" : "border-panel-border hover:border-electric-cyan/50 hover:shadow-[0_0_15px_rgba(0,242,254,0.1)]"
      )}
    >
      {/* Background Pulse for active states */}
      {robot.state !== 'IDLE' && robot.state !== 'FAILED' && (
        <div className={clsx("absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] opacity-20 -z-10", stateColors[robot.state].split(' ')[0].replace('text-', 'bg-'))} />
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-sm">{robot.id}</h3>
            {isWarning && <ShieldAlert size={12} className="text-status-red animate-pulse" />}
          </div>
          <p className="text-[10px] text-slate-400">{robot.name}</p>
        </div>
        <div className={clsx("text-[10px] px-2 py-0.5 rounded font-bold tracking-wider uppercase border", stateColors[robot.state], robot.state !== 'IDLE' && "bg-opacity-10 bg-current animate-pulse")}>
          {robot.state}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
        {/* Battery */}
        <div className="flex flex-col gap-1">
          <div className="text-[9px] text-slate-500 flex items-center gap-1"><Battery size={10} /> POWER</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className={clsx("h-full", robot.battery > 50 ? "bg-status-green" : robot.battery > 20 ? "bg-status-orange" : "bg-status-red")}
                animate={{ width: `${robot.battery}%` }}
              />
            </div>
            <span className={clsx("font-mono text-[10px]", robot.battery < 20 && "text-status-red animate-pulse")}>{robot.battery.toFixed(0)}%</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <div className="text-[9px] text-slate-500 flex items-center gap-1"><MapPin size={10} /> LOC</div>
          <div className="font-mono text-[10px] text-electric-cyan">
            [{robot.coordinates.x.toFixed(0)}, {robot.coordinates.y.toFixed(0)}]
          </div>
        </div>

        {/* Wallet */}
        <div className="flex flex-col gap-1">
          <div className="text-[9px] text-slate-500 flex items-center gap-1"><Wallet size={10} /> BAL</div>
          <div className="font-mono text-[10px] text-status-green font-bold">
            {robot.walletBalance.toFixed(2)} RBL
          </div>
        </div>

        {/* Efficiency */}
        <div className="flex flex-col gap-1">
          <div className="text-[9px] text-slate-500 flex items-center gap-1"><Zap size={10} /> EFF</div>
          <div className="font-mono text-[10px] text-neon-blue">
            {robot.efficiencyScore}%
          </div>
        </div>
      </div>

      {/* Current Task */}
      {robot.taskId && (
        <div className="mt-3 pt-2 border-t border-slate-800">
          <div className="text-[9px] text-slate-500 flex items-center gap-1 mb-1"><Crosshair size={10} /> CURRENT TASK</div>
          <div className="font-mono text-[10px] text-white bg-slate-800/50 px-2 py-1 rounded truncate">
            {robot.taskId}
          </div>
        </div>
      )}
    </motion.div>
  );
}
