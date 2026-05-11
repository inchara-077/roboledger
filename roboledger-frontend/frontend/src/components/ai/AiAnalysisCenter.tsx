import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ShieldAlert, Activity, AlertTriangle } from 'lucide-react';

export function AiAnalysisCenter() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Brain className="text-primary w-8 h-8 shrink-0" />
            AI Analysis Center
          </h1>
          <p className="text-muted-foreground">Neural threat detection and pattern tracking across the proof network.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            System Nominal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <RiskGauge title="Global Threat Level" score={12} trend="down" />
        <RiskGauge title="Anomaly Detection Rate" score={3.4} suffix="%" trend="up" />
        <RiskGauge title="AI Confidence Score" score={98.2} suffix="%" trend="stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[400px]">
        {/* Real-time Threat Graph Placeholder */}
        <div className="bg-card rounded-xl border border-border/50 p-6 flex flex-col">
          <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Real-time Threat Activity
          </h3>
          <div className="flex-1 rounded-lg bg-secondary/20 flex items-center justify-center border border-dashed border-border overflow-hidden relative">
             {/* Simulated visualization background */}
            <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at center, var(--primary) 0%, transparent 70%)' }}></div>
            <span className="text-muted-foreground z-10">Threat Graph Visualization</span>
          </div>
        </div>

        {/* Recent Anomalies Log */}
        <div className="bg-card rounded-xl border border-border/50 p-6 flex flex-col">
          <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Flagged Anomalies Queue
          </h3>
          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 rounded-lg bg-background border border-border/50 flex flex-col gap-2 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono bg-red-500/10 text-red-500 px-2 py-0.5 rounded">Risk Score: 87</span>
                  <span className="text-xs text-muted-foreground">14 mins ago</span>
                </div>
                <h4 className="font-medium text-sm text-foreground">Suspicious Metadata Pattern detected in Proof #{Math.random().toString(36).substring(7).toUpperCase()}</h4>
                <p className="text-xs text-muted-foreground">AI Reasoning: Payload entropy exceeds normal threshold for document type. Possible steganography or corrupted encoding.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskGauge({ title, score, suffix = '', trend }: { title: string, score: number, suffix?: string, trend: 'up' | 'down' | 'stable' }) {
  const color = score > 80 ? 'text-green-500' : score > 50 ? 'text-yellow-500' : 'text-red-500';
  
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-card p-5 rounded-xl border border-border/50 flex flex-col justify-between"
    >
      <h4 className="text-sm font-medium text-muted-foreground mb-4">{title}</h4>
      <div className="flex items-end justify-between">
        <div className={`text-4xl font-bold tracking-tight ${color}`}>
          {score}{suffix}
        </div>
        <div className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground uppercase">
          Trend: {trend}
        </div>
      </div>
    </motion.div>
  );
}
