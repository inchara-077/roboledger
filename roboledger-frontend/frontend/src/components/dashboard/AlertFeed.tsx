import React from 'react';
import { useProtocolStore } from '../../stores/protocol-store';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle, Info, Zap } from 'lucide-react';

export function AlertFeed() {
  const logs = useProtocolStore(state => state.logs);
  
  return (
    <div className="flex gap-4 overflow-hidden relative h-10 items-center">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div 
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {logs.slice(-10).map((log, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase italic">
            {log.type === 'SUCCESS' && <CheckCircle size={12} className="text-status-green" />}
            {log.type === 'WARNING' && <ShieldAlert size={12} className="text-status-orange" />}
            {log.type === 'ERROR' && <ShieldAlert size={12} className="text-status-red" />}
            {log.type === 'INFO' && <Info size={12} className="text-primary" />}
            {log.type === 'SETTLEMENT' && <Zap size={12} className="text-accent" />}
            
            <span className={clsx(
                log.type === 'SUCCESS' && "text-status-green",
                log.type === 'WARNING' && "text-status-orange",
                log.type === 'ERROR' && "text-status-red",
                log.type === 'INFO' && "text-primary",
                log.type === 'SETTLEMENT' && "text-accent"
            )}>
                [{log.source}] {log.message}
            </span>
          </div>
        ))}
        {/* Duplicate for infinite effect */}
        {logs.slice(-10).map((log, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase italic">
            <span className="text-muted-foreground">[{log.source}] {log.message}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function clsx(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
