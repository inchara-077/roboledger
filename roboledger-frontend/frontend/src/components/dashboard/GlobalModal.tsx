import React from 'react';
import { useUiStore } from '../../stores/ui-store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Network, Database, Terminal, Activity } from 'lucide-react';
import clsx from 'clsx';

export function GlobalModal() {
  const { activeModal, modalData, closeModal } = useUiStore();

  if (!activeModal) return null;

  const renderContent = () => {
    switch (activeModal) {
      case 'ROBOT':
        return <RobotDetails robot={modalData} />;
      case 'TASK':
        return <TaskDetails task={modalData} />;
      case 'SETTLEMENT':
        return <SettlementDetails data={modalData} />;
      case 'LOG':
        return <LogDetails log={modalData} />;
      case 'NETWORK_STATS':
        return <NetworkStatsDetails data={modalData} />;
      case 'LIVE_BLOCK':
        return <LiveBlockDetails data={modalData} />;
      case 'FLEET_EFFICIENCY':
        return <FleetEfficiencyDetails data={modalData} />;
      default:
        return null;
    }
  };

  const icons = {
    ROBOT: <Cpu className="text-electric-cyan" />,
    TASK: <Network className="text-soft-purple" />,
    SETTLEMENT: <Database className="text-status-green" />,
    LOG: <Terminal className="text-neon-blue" />,
    NETWORK_STATS: <Network className="text-status-orange" />,
    LIVE_BLOCK: <Database className="text-electric-cyan" />,
    FLEET_EFFICIENCY: <Activity className="text-neon-blue" />
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#0a192f]/90 border border-electric-cyan/30 rounded-xl shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-panel-border bg-black/20">
            <div className="flex items-center gap-3">
              {icons[activeModal]}
              <h2 className="text-lg font-bold text-white tracking-wider">
                {activeModal} SECTOR ANALYSIS
              </h2>
            </div>
            <button
              onClick={closeModal}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {renderContent()}
          </div>
          
          {/* Background Decorator */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Detail Views ---

function RobotDetails({ robot }: { robot: any }) {
  if (!robot) return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded border border-slate-800">
          <div className="text-xs text-slate-500 mb-1">IDENTIFIER</div>
          <div className="text-xl font-mono text-white">{robot.id}</div>
          <div className="text-sm text-slate-400">{robot.name}</div>
        </div>
        <div className="bg-black/30 p-4 rounded border border-slate-800">
          <div className="text-xs text-slate-500 mb-1">OPERATIONAL STATE</div>
          <div className="text-xl font-mono text-electric-cyan">{robot.state}</div>
          <div className="text-sm text-status-green">Health: {robot.systemHealth}%</div>
        </div>
      </div>
      
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-3">DIAGNOSTIC TELEMETRY</div>
        <div className="grid grid-cols-3 gap-4 font-mono text-sm">
          <div>
            <div className="text-slate-500 text-xs">BATTERY</div>
            <div className={clsx(robot.battery < 20 ? "text-status-red" : "text-white")}>{robot.battery.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs">EFFICIENCY</div>
            <div className="text-neon-blue">{robot.efficiencyScore}%</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs">SIGNAL</div>
            <div className="text-status-green">{robot.signalStrength} dBm</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs">WALLET</div>
            <div className="text-status-green">{robot.walletBalance.toFixed(2)} RBL</div>
          </div>
          <div className="col-span-2">
            <div className="text-slate-500 text-xs">COORDINATES</div>
            <div className="text-electric-cyan">[{robot.coordinates.x.toFixed(3)}, {robot.coordinates.y.toFixed(3)}]</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskDetails({ task }: { task: any }) {
  if (!task) return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-1">TASK ID: {task.id}</div>
        <div className="text-xl text-white">{task.title}</div>
        <div className="text-sm text-soft-purple mt-2">Priority: {task.priority}</div>
      </div>
      
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-3">EXECUTION MATRIX</div>
        <div className="grid grid-cols-2 gap-4 font-mono text-sm">
          <div>
            <div className="text-slate-500 text-xs">STATUS</div>
            <div className="text-electric-cyan">{task.status}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs">REWARD</div>
            <div className="text-status-green">{task.rewardValue.toFixed(2)} RBL</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs">ASSIGNED AGENT</div>
            <div className="text-white">{task.assignedRobotId || 'Unassigned'}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs">CREATED</div>
            <div className="text-slate-300">{new Date(task.createdAt).toLocaleString()}</div>
          </div>
          {task.reasoning && (
            <div className="col-span-2">
              <div className="text-slate-500 text-xs">ASSIGNMENT REASONING</div>
              <div className="text-slate-300 bg-slate-900 p-2 rounded mt-1">{task.reasoning}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettlementDetails({ data }: { data: any }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-1">SETTLEMENT OVERVIEW</div>
        <div className="text-sm text-slate-300">
          This sector provides insights into the autonomous protocol's financial settlement layer.
        </div>
      </div>
      {data && data.type === 'SETTLEMENT' && (
        <div className="bg-black/30 p-4 rounded border border-slate-800">
          <div className="text-xs text-slate-500 mb-3">TRANSACTION RECORD</div>
          <div className="font-mono text-sm grid grid-cols-1 gap-2">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500">HASH</span>
              <span className="text-electric-cyan">{data.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2 pt-2">
              <span className="text-slate-500">SOURCE</span>
              <span className="text-white">{data.source}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">AMOUNT</span>
              <span className="text-status-green font-bold">{data.message.match(/(\d+) RBL/)?.[1] || '0'} RBL</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LogDetails({ log }: { log: any }) {
  if (!log) return null;
  return (
    <div className="flex flex-col gap-4 font-mono">
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-1">LOG ID</div>
        <div className="text-sm text-electric-cyan">{log.id}</div>
      </div>
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-3">RAW PAYLOAD</div>
        <pre className="text-[10px] text-slate-300 bg-black/50 p-3 rounded overflow-x-auto">
          {JSON.stringify(log, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function NetworkStatsDetails({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-1">METRIC: {data.type}</div>
        <div className="text-2xl font-mono text-status-orange">{data.value.toLocaleString ? data.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : data.value}</div>
      </div>
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-3">SYSTEM PERFORMANCE</div>
        <div className="text-sm text-slate-300">
          The network metrics layer aggregates validator performance, transaction throughput, and total settlement volume to ensure protocol stability and economic security.
        </div>
      </div>
    </div>
  );
}

function LiveBlockDetails({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="flex flex-col gap-4 font-mono">
      <div className="bg-black/30 p-4 rounded border border-electric-cyan/30">
        <div className="text-xs text-slate-500 mb-1">BLOCK HEIGHT</div>
        <div className="text-xl text-electric-cyan">#{data.id}</div>
      </div>
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-3">BLOCK METADATA</div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-slate-500 text-xs">TIMESTAMP</div>
            <div className="text-white">{new Date(data.timestamp).toISOString()}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs">VALIDATOR SIGNATURES</div>
            <div className="text-status-green">1,024 / 1,024</div>
          </div>
          <div className="col-span-2">
            <div className="text-slate-500 text-xs">BLOCK HASH</div>
            <div className="text-slate-400 break-all">
              0x{Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FleetEfficiencyDetails({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-black/30 p-4 rounded border border-neon-blue/30">
        <div className="text-xs text-slate-500 mb-1">GLOBAL FLEET EFFICIENCY</div>
        <div className="text-3xl font-mono text-neon-blue">{data.currentEfficiency.toFixed(2)}%</div>
      </div>
      <div className="bg-black/30 p-4 rounded border border-slate-800">
        <div className="text-xs text-slate-500 mb-3">PREDICTIVE ANALYSIS</div>
        <div className="text-sm text-slate-300 mb-2">
          Based on current battery drain rates and task distribution, the fleet is operating at optimal parameters. The AI orchestrator predicts a 2% increase in efficiency upon task completion.
        </div>
        <div className="h-2 w-full bg-slate-800 rounded overflow-hidden mt-4">
          <div 
            className="h-full bg-neon-blue transition-all duration-1000" 
            style={{ width: `${data.currentEfficiency}%` }}
          />
        </div>
      </div>
    </div>
  );
}
