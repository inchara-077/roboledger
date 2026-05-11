import React, { useEffect, useState } from 'react';
import { useProtocolStore } from '../../stores/protocol-store';
import { Activity, Wifi, ShieldCheck, Clock, Cpu, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export function GlobalCommandHeader() {
  const { networkStatus } = useProtocolStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-panel border-b border-panel-border z-50 flex items-center justify-between px-6 py-3 relative overflow-hidden"
    >
      {/* Animated background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-electric-cyan to-transparent opacity-50 blur-sm"></div>

      {/* Left: Logo & Core Status */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-electric-cyan rounded-full blur-md opacity-40 animate-pulse"></div>
            <div className="relative w-10 h-10 bg-deep-navy border border-electric-cyan rounded flex items-center justify-center neon-border-cyan">
              <ShieldCheck className="w-6 h-6 text-electric-cyan" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-white neon-text-cyan flex items-center gap-2">
              ROBOLEDGER
            </h1>
            <div className="text-[10px] text-electric-cyan/70 tracking-widest uppercase">Autonomous Protocol</div>
          </div>
        </div>

        <div className="h-8 w-px bg-panel-border mx-2"></div>

        <div className="flex gap-6">
          <StatusIndicator icon={<Wifi size={14} />} label="NETWORK" value={networkStatus.status} color="green" glow />
          <StatusIndicator icon={<Cpu size={14} />} label="AUTONOMOUS MODE" value={networkStatus.autonomousMode ? "ENGAGED" : "MANUAL"} color="cyan" />
        </div>
      </div>

      {/* Center: Live Pulse & Latency */}
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Radio size={12} className="text-neon-blue animate-pulse" />
            PROTOCOL SYNC
          </div>
          <div className="flex gap-1 h-6 items-end">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: Math.random() * 20 + 4 }}
                animate={{ height: Math.random() * 20 + 4 }}
                transition={{ repeat: Infinity, duration: Math.random() * 0.5 + 0.5, repeatType: 'reverse' }}
                className="w-1 bg-neon-blue rounded-t opacity-70"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right: Telemetry & Clock */}
      <div className="flex items-center gap-6">
        <StatusIndicator icon={<Activity size={14} />} label="ACTIVE AGENTS" value={networkStatus.activeAgents.toString()} color="blue" />
        <StatusIndicator label="LATENCY" value={`${networkStatus.simulatedLatency}ms`} color="orange" />
        <StatusIndicator label="UPTIME" value={formatUptime(networkStatus.uptime)} color="purple" />
        
        <div className="h-8 w-px bg-panel-border mx-2"></div>

        <div className="flex items-center gap-2 font-mono text-sm text-white">
          <Clock size={14} className="text-slate-400" />
          {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          <span className="text-[10px] text-slate-500 ml-1">UTC{time.getTimezoneOffset() / -60 >= 0 ? '+' : ''}{time.getTimezoneOffset() / -60}</span>
        </div>
      </div>
    </motion.header>
  );
}

function StatusIndicator({ icon, label, value, color, glow }: { icon?: React.ReactNode, label: string, value: string, color: 'green' | 'cyan' | 'blue' | 'orange' | 'purple', glow?: boolean }) {
  const colors = {
    green: 'text-status-green',
    cyan: 'text-electric-cyan',
    blue: 'text-neon-blue',
    orange: 'text-status-orange',
    purple: 'text-soft-purple',
  };
  
  const bgColors = {
    green: 'bg-status-green',
    cyan: 'bg-electric-cyan',
    blue: 'bg-neon-blue',
    orange: 'bg-status-orange',
    purple: 'bg-soft-purple',
  };

  return (
    <div className="flex flex-col">
      <div className="text-[9px] text-slate-500 font-semibold tracking-wider flex items-center gap-1 mb-1">
        {icon}
        {label}
      </div>
      <div className="flex items-center gap-2">
        <div className={clsx("w-1.5 h-1.5 rounded-full", bgColors[color], glow && "animate-pulse shadow-[0_0_8px_currentColor]")}></div>
        <span className={clsx("text-xs font-bold tracking-wide", colors[color])}>{value}</span>
      </div>
    </div>
  );
}
