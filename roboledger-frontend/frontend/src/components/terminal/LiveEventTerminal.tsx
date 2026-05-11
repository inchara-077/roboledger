import React, { useEffect, useRef } from 'react';
import { useProtocolStore } from '../../stores/protocol-store';
import { useUiStore } from '../../stores/ui-store';
import { Terminal, ShieldAlert, CheckCircle2, Info, Banknote } from 'lucide-react';
import { ProtocolLog } from '../../domains/protocol/types';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export function LiveEventTerminal() {
  const logs = useProtocolStore(state => state.logs);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openModal = useUiStore(state => state.openModal);

  // Auto-scroll to top since flex-col-reverse or newest at top? 
  // Store prepends new logs to the start of the array, so index 0 is newest.
  
  return (
    <div className="glass-panel rounded-lg p-3 flex flex-col flex-1 min-h-0 border-panel-border relative overflow-hidden font-mono text-[10px]">
      <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-3 font-sans">
        <Terminal size={16} className="text-electric-cyan" />
        LIVE PROTOCOL LOGS
      </h2>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 pr-2"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <LogEntry key={log.id} log={log} onClick={() => openModal('LOG', log)} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LogEntry({ log, onClick }: { log: ProtocolLog, onClick: () => void }) {
  const typeConfig = {
    INFO: { color: 'text-slate-300', icon: <Info size={12} className="text-neon-blue" /> },
    WARNING: { color: 'text-status-orange', icon: <ShieldAlert size={12} className="text-status-orange" /> },
    ERROR: { color: 'text-status-red', icon: <ShieldAlert size={12} className="text-status-red" /> },
    SUCCESS: { color: 'text-status-green', icon: <CheckCircle2 size={12} className="text-status-green" /> },
    SETTLEMENT: { color: 'text-electric-cyan font-bold', icon: <Banknote size={12} className="text-electric-cyan" /> },
  };

  const config = typeConfig[log.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className={clsx("flex items-start gap-2 py-1 border-b border-slate-800/50 cursor-pointer hover:bg-white/5 transition-colors", config.color)}
    >
      <div className="text-slate-500 whitespace-nowrap mt-0.5">
        [{new Date(log.timestamp).toISOString().split('T')[1].replace('Z', '')}]
      </div>
      <div className="mt-0.5">{config.icon}</div>
      <div className="flex-1">
        <span className="text-slate-400 font-bold mr-2">[{log.source}]</span>
        {log.message}
      </div>
    </motion.div>
  );
}
