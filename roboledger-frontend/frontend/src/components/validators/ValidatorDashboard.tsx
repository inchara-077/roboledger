import React from 'react';
import { motion } from 'framer-motion';
import { Network, Server, ShieldCheck, Zap } from 'lucide-react';

export function ValidatorDashboard() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Network className="text-primary w-8 h-8 shrink-0" />
            Validator Network
          </h1>
          <p className="text-muted-foreground">Manage your node, participate in consensus, and track rewards.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
          Stake SOL to Join
        </button>
      </div>

      {/* Node Status */}
      <div className="bg-card p-6 rounded-xl border border-border/50 flex flex-wrap gap-8 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <Server className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Node: Observers-Not-Connected</h3>
            <p className="text-sm text-muted-foreground">Connect your wallet and stake to activate.</p>
          </div>
        </div>
        
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Status</div>
            <div className="font-semibold text-red-500 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Offline</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Uptime</div>
            <div className="font-semibold">0.00%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Proofs Signed</div>
            <div className="font-semibold">0</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[300px]">
        {/* Consensus Queue */}
        <div className="bg-card rounded-xl border border-border/50 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border/50 flex justify-between items-center bg-secondary/30">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Pending Consensus Queue
            </h3>
            <span className="text-xs px-2 py-1 bg-secondary rounded-full">Network View</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 opacity-50 pointer-events-none">
            {/* Disabled look since not connected */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 rounded border border-border/30 bg-background/50 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm text-primary">Proof #{Math.random().toString(36).substring(7).toUpperCase()}</span>
                  <span className="text-xs text-muted-foreground">Waiting for signatures (12/64)</span>
                </div>
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px] mt-16">
            <div className="bg-card px-4 py-2 border border-border/50 rounded shadow-lg text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> Activate Node to Participate
            </div>
          </div>
        </div>

        {/* Global Network Map Placeholder */}
        <div className="bg-card rounded-xl border border-border/50 p-6 flex flex-col relative overflow-hidden">
           <div className="absolute inset-0 opacity-10" style={{
             backgroundImage: 'radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 60%)',
             backgroundSize: '100% 100%'
           }}></div>
          <h3 className="font-semibold mb-4 text-lg z-10 relative">Global Validator Network</h3>
          <div className="flex-1 flex items-center justify-center z-10 relative border border-dashed border-border/50 rounded-lg bg-background/50">
             <span className="text-muted-foreground flex flex-col items-center gap-2">
               <Network className="w-8 h-8 opacity-50" />
               3D Network Map Visualization
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}
