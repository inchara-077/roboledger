import React, { useRef, useEffect } from 'react';
import { useProtocolStore } from '../../stores/protocol-store';
import { motion, AnimatePresence } from 'framer-motion';

export function TerminalPanel() {
  const logs = useProtocolStore(state => state.logs);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-panel flex flex-col h-full border-panel-border overflow-hidden rounded-xl font-mono text-[11px]">
      <div className="bg-secondary/40 px-3 py-1.5 border-b border-border/30 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <span className="text-muted-foreground uppercase tracking-widest text-[9px] font-bold">System Terminal</span>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 p-3 overflow-y-auto space-y-1.5 bg-black/40 scrollbar-hide"
      >
        <AnimatePresence mode="popLayout">
          {logs.slice(-50).map((log, i) => (
            <motion.div
              key={`${log.timestamp}-${i}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <span className="text-primary/50 shrink-0">[{new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}]</span>
              <span className={clsx(
                "shrink-0 font-bold",
                log.type === 'INFO' && "text-primary",
                log.type === 'SUCCESS' && "text-status-green",
                log.type === 'WARNING' && "text-status-orange",
                log.type === 'ERROR' && "text-status-red",
                log.type === 'SETTLEMENT' && "text-accent"
              )}>
                {log.source}:
              </span>
              <span className="text-foreground/90 break-all">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex gap-2">
            <span className="text-primary animate-pulse">{'>'}</span>
            <span className="w-2 h-4 bg-primary/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
