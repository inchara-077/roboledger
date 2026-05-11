import React, { useMemo } from 'react';
import { useRobotStore } from '../../stores/robot-store';
import { useUiStore } from '../../stores/ui-store';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

export function EfficiencyChart() {
  const robotsDict = useRobotStore(state => state.robots);
  const robots = Object.values(robotsDict);
  const openModal = useUiStore(state => state.openModal);
  
  // Create mock historical data based on current efficiency
  const data = useMemo(() => {
    const avgEfficiency = robots.reduce((acc, r) => acc + r.efficiencyScore, 0) / (robots.length || 1);
    
    return Array.from({ length: 20 }).map((_, i) => ({
      time: i,
      efficiency: Math.max(60, Math.min(100, avgEfficiency + (Math.sin(i / 2) * 10) + (Math.random() * 5 - 2.5)))
    }));
  }, [robots]);

  return (
    <div 
      onClick={() => openModal('FLEET_EFFICIENCY', { currentEfficiency: data[data.length - 1].efficiency, history: data })}
      className="glass-panel rounded-lg p-3 h-[200px] border-panel-border flex flex-col cursor-pointer hover:border-neon-blue/50 hover:shadow-[0_0_15px_rgba(0,102,255,0.1)] transition-colors"
    >
      <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-2">
        <Activity size={16} className="text-neon-blue" />
        FLEET EFFICIENCY
      </h2>
      <div className="flex-1 -ml-4 -mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4facfe" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(10, 25, 47, 0.9)', border: '1px solid rgba(79, 172, 254, 0.2)', borderRadius: '4px' }}
              itemStyle={{ color: '#4facfe' }}
              labelStyle={{ display: 'none' }}
            />
            <Area 
              type="monotone" 
              dataKey="efficiency" 
              stroke="#4facfe" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorEfficiency)" 
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
