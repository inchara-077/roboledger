import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, ShieldAlert, CheckCircle, Cpu, Lock } from 'lucide-react';
import { Robot } from '../../domains/robots/types';
import clsx from 'clsx';

interface RobotCardProps {
  robot: Robot;
  onClick: (robot: Robot) => void;
}

export function RobotCard({ robot, onClick }: RobotCardProps) {
  const isHighRisk = robot.riskScore > 60 || robot.temperature > 80;
  const isVerified = robot.state === 'IDLE' && !!robot.lastProofId;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(robot)}
      className={clsx(
        "glass-panel p-4 cursor-pointer relative overflow-hidden transition-all duration-300",
        isHighRisk ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "border-panel-border"
      )}
    >
      {/* Background Glow */}
      <div className={clsx(
        "absolute -right-8 -top-8 w-24 h-24 blur-3xl opacity-20 pointer-events-none",
        isHighRisk ? "bg-red-500" : "bg-primary"
      )} />

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx(
            "p-2 rounded-lg bg-background/50 border",
            isHighRisk ? "border-red-500/50 text-red-500" : "border-primary/30 text-primary"
          )}>
            <Cpu size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wider">{robot.id}</h3>
            <div className="flex items-center gap-2">
              <span className={clsx(
                "w-1.5 h-1.5 rounded-full animate-pulse",
                robot.state === 'IDLE' ? "bg-slate-500" : "bg-primary"
              )} />
              <span className="text-[10px] text-muted-foreground font-mono uppercase">{robot.state}</span>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isHighRisk && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="px-2 py-1 bg-red-500/10 border border-red-500/50 rounded text-[9px] text-red-500 font-bold animate-pulse"
            >
              HIGH RISK
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background/40 p-2 rounded border border-border/30">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Thermometer size={12} />
            <span className="text-[10px] uppercase">Temp</span>
          </div>
          <p className={clsx(
            "text-sm font-mono font-bold",
            robot.temperature > 80 ? "text-red-500" : "text-foreground"
          )}>
            {robot.temperature.toFixed(1)}°C
          </p>
        </div>
        <div className="bg-background/40 p-2 rounded border border-border/30">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <ShieldAlert size={12} />
            <span className="text-[10px] uppercase">Risk</span>
          </div>
          <p className={clsx(
            "text-sm font-mono font-bold",
            robot.riskScore > 60 ? "text-red-500" : "text-foreground"
          )}>
            {robot.riskScore.toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/30">
        <div className="flex items-center gap-2">
            {isVerified ? (
                <>
                    <CheckCircle size={14} className="text-status-green" />
                    <span className="text-[10px] font-bold text-status-green tracking-tight uppercase glow-green">Verified</span>
                </>
            ) : (
                <>
                    <div className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-[10px] font-bold text-primary/70 tracking-tight uppercase">Syncing...</span>
                </>
            )}
        </div>
        <div className="flex items-center gap-1.5">
            <Lock size={12} className="text-muted-foreground" />
            <span className="text-[9px] font-mono text-muted-foreground">SH-256</span>
        </div>
      </div>

      {/* Blockchain indicator */}
      {isVerified && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 py-1 px-2 bg-primary/5 border border-primary/20 rounded flex items-center justify-between"
        >
            <span className="text-[8px] text-primary/60 font-mono">SOLANA ANCHORED</span>
            <div className="flex gap-0.5">
                {[1,2,3].map(i => (
                    <motion.div 
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1 h-1 bg-primary rounded-full"
                    />
                ))}
            </div>
        </motion.div>
      )}
    </motion.div>
  );
}
