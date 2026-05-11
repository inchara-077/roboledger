import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, CheckCircle, ShieldAlert, Zap, 
  Cpu, LayoutGrid, AlertTriangle, TrendingUp,
  Brain, Globe
} from 'lucide-react';
import { useRobotStore } from '../../stores/robot-store';
import { useProtocolStore } from '../../stores/protocol-store';
import { RobotCard } from './RobotCard';
import { ProofModal } from './ProofModal';
import { TerminalPanel } from './TerminalPanel';
import { TacticalRobotMap } from '../tactical-map/TacticalRobotMap';
import { AlertFeed } from './AlertFeed';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { Robot } from '../../domains/robots/types';

// Mock data for charts
const chartData = Array.from({ length: 20 }).map((_, i) => ({
  time: i,
  throughput: Math.floor(Math.random() * 200) + 400,
  risk: Math.floor(Math.random() * 30) + 10,
}));

export function DashboardHome() {
  const robotsMap = useRobotStore(state => state.robots);
  const robots = Object.values(robotsMap);
  const network = useProtocolStore(state => state.networkStatus);
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);

  const totalThreats = robots.filter(r => r.temperature > 80 || r.riskScore > 60).length;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      <AlertFeed />
      
      {/* 1. HERO STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Active Robots" 
          value={robots.length.toString()} 
          icon={<Cpu className="text-primary" />} 
          label="Agents Streaming"
          glow="primary"
        />
        <KpiCard 
          title="Verified Proofs" 
          value={(network.totalSettlementVolume * 10).toFixed(0)} 
          icon={<CheckCircle className="text-status-green" />} 
          label="On-Chain Anchors"
          glow="green"
        />
        <KpiCard 
          title="Threat Alerts" 
          value={totalThreats.toString()} 
          icon={<ShieldAlert className={totalThreats > 0 ? "text-status-red" : "text-slate-500"} />} 
          label="AI Anomalies"
          glow={totalThreats > 0 ? "red" : "none"}
        />
        <KpiCard 
          title="Consensus Speed" 
          value={`${network.simulatedLatency}ms`} 
          icon={<Zap className="text-accent" />} 
          label="Solana Latency"
          glow="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 2. LIVE ROBOT MONITOR PANEL (Left - 7 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Activity size={20} className="text-primary" />
                Live Fleet Monitor
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Real-time Telemetry Feed</p>
            </div>
            <div className="flex gap-2">
                <div className="px-3 py-1 bg-secondary/50 rounded border border-border/30 text-[10px] font-bold">2.0Hz SYNC</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {robots.map(robot => (
              <RobotCard 
                key={robot.id} 
                robot={robot} 
                onClick={setSelectedRobot}
              />
            ))}
          </div>

          {/* 3. TACTICAL MAP */}
          <div className="h-[400px] flex flex-col">
            <TacticalRobotMap />
          </div>
        </div>

        {/* 4. ANALYTICS & ALERTS (Right - 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Analytics Panel */}
          <div className="glass-panel p-5 border-panel-border relative overflow-hidden">
             <div className="flex items-center gap-2 mb-4">
                <Brain className="text-primary" size={18} />
                <h3 className="text-sm font-bold uppercase tracking-widest">AI Threat Engine</h3>
             </div>
             
             <div className="space-y-4">
                <AnalyticMetric label="Global Trust Score" value="98.2%" trend="up" />
                <AnalyticMetric label="Anomaly Probability" value="2.4%" trend="down" />
                <AnalyticMetric label="Predicted Failure" value="0.01%" trend="stable" />
                
                <div className="h-32 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorThru" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="throughput" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorThru)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>

          {/* Activity/Throughput Chart */}
          <div className="glass-panel p-5 border-panel-border">
             <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-accent" size={18} />
                <h3 className="text-sm font-bold uppercase tracking-widest">Network Throughput</h3>
             </div>
             <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line type="monotone" dataKey="throughput" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Terminal Panel */}
          <div className="h-64">
             <TerminalPanel />
          </div>
        </div>
      </div>

      {/* Proof Modal */}
      <ProofModal 
        robot={selectedRobot} 
        onClose={() => setSelectedRobot(null)} 
      />
    </div>
  );
}

function KpiCard({ title, value, icon, label, glow }: { title: string, value: string, icon: React.ReactNode, label: string, glow: 'primary' | 'green' | 'red' | 'blue' | 'none' }) {
  const glowClasses = {
    primary: "shadow-[0_0_15px_rgba(0,242,254,0.15)] border-primary/30",
    green: "shadow-[0_0_15px_rgba(0,230,118,0.15)] border-status-green/30",
    red: "shadow-[0_0_15px_rgba(255,23,68,0.2)] border-status-red/50",
    blue: "shadow-[0_0_15px_rgba(79,172,254,0.15)] border-accent/30",
    none: "border-panel-border"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        "glass-panel p-5 rounded-xl border flex flex-col justify-between transition-all duration-500",
        glowClasses[glow]
      )}
    >
      <div className="flex justify-between items-start">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</h4>
        <div className="p-1.5 bg-background/50 rounded border border-border/20">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold tracking-tighter mb-1 neon-text-cyan">{value}</div>
        <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-tight">{label}</div>
      </div>
    </motion.div>
  );
}

function AnalyticMetric({ label, value, trend }: { label: string, value: string, trend: 'up' | 'down' | 'stable' }) {
    return (
        <div className="flex justify-between items-center bg-background/30 p-2 rounded border border-border/10">
            <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">{label}</p>
                <p className="text-lg font-bold font-mono tracking-tighter">{value}</p>
            </div>
            <div className={clsx(
                "text-[9px] px-1.5 py-0.5 rounded font-bold",
                trend === 'up' && "bg-status-green/10 text-status-green",
                trend === 'down' && "bg-status-red/10 text-status-red",
                trend === 'stable' && "bg-slate-500/10 text-slate-400"
            )}>
                {trend.toUpperCase()}
            </div>
        </div>
    )
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
