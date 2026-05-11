import React from 'react';
import { useRobotStore } from '../../stores/robot-store';
import { motion } from 'framer-motion';
import { Map, Navigation } from 'lucide-react';
import clsx from 'clsx';

export function TacticalRobotMap() {
  const robotsDict = useRobotStore((state) => state.robots);
  const robots = Object.values(robotsDict);
  const GRID_SIZE = 1000;

  return (
    <div className="glass-panel rounded-lg p-1 flex flex-col flex-1 min-h-0 relative overflow-hidden border-panel-border group">
      {/* Header */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 rounded border border-panel-border">
        <Map size={14} className="text-electric-cyan" />
        <h2 className="text-xs font-bold text-slate-300 tracking-wider">TACTICAL COORDINATION</h2>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 rounded border border-panel-border">
          <div className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
          <span className="text-[10px] text-slate-400 font-mono tracking-wider">LIVE TELEMETRY</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-[#030712] overflow-hidden rounded">
        {/* Radar Sweep Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full border border-electric-cyan/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] aspect-square rounded-full border border-electric-cyan/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-square rounded-full border border-electric-cyan/30"></div>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-[75%] h-[75%] origin-top-left -z-0"
          style={{
            background: 'conic-gradient(from 180deg at 0% 0%, rgba(0, 242, 254, 0.2) 0deg, transparent 60deg)'
          }}
        />

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Crosshairs */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-electric-cyan/20"></div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-electric-cyan/20"></div>

        {/* Map Elements (Scaling from 1000x1000 to 100%x100%) */}
        {robots.map(robot => {
          const xPos = `${(robot.coordinates.x / GRID_SIZE) * 100}%`;
          const yPos = `${(robot.coordinates.y / GRID_SIZE) * 100}%`;
          
          let targetXPos, targetYPos;
          if (robot.targetCoordinates) {
            targetXPos = `${(robot.targetCoordinates.x / GRID_SIZE) * 100}%`;
            targetYPos = `${(robot.targetCoordinates.y / GRID_SIZE) * 100}%`;
          }

          const isActive = robot.state !== 'IDLE' && robot.state !== 'FAILED';
          const isWarning = robot.battery < 20 || robot.state === 'FAILED' || robot.temperature > 80;

          return (
            <React.Fragment key={robot.id}>
              {/* Movement Trail / Line */}
              {robot.targetCoordinates && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                  <line 
                    x1={xPos} 
                    y1={yPos} 
                    x2={targetXPos} 
                    y2={targetYPos} 
                    stroke="rgba(0, 242, 254, 0.3)" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                  />
                  {/* Target Marker */}
                  <circle cx={targetXPos} cy={targetYPos} r="3" fill="none" stroke="rgba(0, 242, 254, 0.8)" strokeWidth="1" />
                  <circle cx={targetXPos} cy={targetYPos} r="8" fill="none" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1" className="animate-ping" />
                </svg>
              )}

              {/* Robot Node */}
              <motion.div
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                animate={{ left: xPos, top: yPos }}
                transition={{ type: "tween", duration: 1, ease: "linear" }}
              >
                {/* Ping Animation */}
                {isActive && (
                  <div className="absolute inset-0 bg-electric-cyan rounded-full animate-ping opacity-30"></div>
                )}
                
                {/* Core Dot */}
                <div className={clsx(
                  "w-3 h-3 rounded-full border-2 bg-background relative z-10 flex items-center justify-center",
                  isWarning ? "border-status-red shadow-[0_0_10px_rgba(255,23,68,0.8)]" : 
                  isActive ? "border-electric-cyan shadow-[0_0_10px_rgba(0,242,254,0.8)]" : 
                  "border-slate-500"
                )}>
                  {isActive && <div className="w-1 h-1 bg-electric-cyan rounded-full"></div>}
                </div>
                
                {/* Label */}
                <div className="mt-2 px-1.5 py-0.5 bg-background/80 backdrop-blur border border-panel-border rounded text-[9px] font-mono whitespace-nowrap text-white">
                  {robot.id} <span className={clsx("ml-1", isWarning ? "text-status-red" : "text-electric-cyan")}>[{robot.state.substring(0,3)}]</span>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
