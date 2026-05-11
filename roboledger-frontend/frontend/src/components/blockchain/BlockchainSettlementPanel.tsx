import React from 'react';
import { useProtocolStore } from '../../stores/protocol-store';
import { useUiStore } from '../../stores/ui-store';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, Database, Link, ArrowRightLeft } from 'lucide-react';
import clsx from 'clsx';

export function BlockchainSettlementPanel() {
  const { networkStatus, logs } = useProtocolStore();
  const openModal = useUiStore(state => state.openModal);
  
  // Get recent settlements
  const settlements = logs.filter(l => l.type === 'SETTLEMENT').slice(0, 3);

  return (
    <div className="glass-panel rounded-lg p-3 h-[250px] border-panel-border flex gap-4">
      {/* Left: Treasury & Stats */}
      <div className="w-1/3 flex flex-col gap-3 border-r border-slate-800 pr-4">
        <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          <Database size={16} className="text-status-green" />
          PROTOCOL SETTLEMENT
        </h2>
        
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div 
            onClick={() => openModal('NETWORK_STATS', { type: 'VOLUME', value: networkStatus.totalSettlementVolume })}
            className="bg-slate-900/50 rounded p-3 border border-status-green/30 relative overflow-hidden cursor-pointer hover:border-status-green/60 hover:shadow-[0_0_15px_rgba(0,255,102,0.1)] transition-all"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-status-green/20 blur-xl pointer-events-none"></div>
            <div className="text-[10px] text-slate-400 mb-1">TOTAL VOLUME SETTLED</div>
            <div className="text-2xl font-mono text-status-green font-bold">
              {networkStatus.totalSettlementVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RBL
            </div>
          </div>
          
          <div className="flex gap-2">
            <div 
              onClick={() => openModal('NETWORK_STATS', { type: 'TPS', value: networkStatus.tps })}
              className="flex-1 bg-slate-900/50 rounded p-2 border border-slate-800 cursor-pointer hover:border-electric-cyan/50 hover:bg-electric-cyan/5 transition-colors"
            >
              <div className="text-[9px] text-slate-400">NETWORK TPS</div>
              <div className="text-sm font-mono text-electric-cyan font-bold">{networkStatus.tps}</div>
            </div>
            <div 
              onClick={() => openModal('NETWORK_STATS', { type: 'VALIDATORS', value: '1024' })}
              className="flex-1 bg-slate-900/50 rounded p-2 border border-slate-800 cursor-pointer hover:border-soft-purple/50 hover:bg-soft-purple/5 transition-colors"
            >
              <div className="text-[9px] text-slate-400">VALIDATORS</div>
              <div className="text-sm font-mono text-soft-purple font-bold">1,024 Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Live Blocks */}
      <div className="flex-1 flex flex-col gap-3 border-r border-slate-800 pr-4">
        <h3 className="text-xs font-bold text-slate-400 flex items-center gap-2">
          <Link size={14} /> LIVE BLOCKS
        </h3>
        <div className="flex gap-2 flex-1 items-center overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={networkStatus.uptime + i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => openModal('LIVE_BLOCK', { id: 804020 + networkStatus.uptime - i, timestamp: Date.now() })}
              className="flex-1 h-20 bg-slate-900/80 border border-slate-700 rounded flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-slate-400 hover:bg-slate-800 transition-colors"
            >
              {i === 0 && <div className="absolute inset-0 bg-electric-cyan/10 animate-pulse"></div>}
              <ShieldCheck size={16} className={clsx("mb-1", i === 0 ? "text-electric-cyan" : "text-slate-500")} />
              <div className="text-[9px] font-mono text-slate-400">#{804020 + networkStatus.uptime - i}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: Recent Settlements */}
      <div className="w-1/3 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 flex items-center gap-2">
          <ArrowRightLeft size={14} /> RECENT TRANSFERS
        </h3>
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          <AnimatePresence initial={false}>
            {settlements.length === 0 ? (
              <div className="text-[10px] text-slate-500 text-center mt-4">WAITING FOR SETTLEMENTS...</div>
            ) : (
              settlements.map(settlement => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={settlement.id}
                  onClick={() => openModal('SETTLEMENT', settlement)}
                  className="bg-status-green/5 border border-status-green/20 rounded p-2 flex justify-between items-center cursor-pointer hover:bg-status-green/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Wallet size={12} className="text-status-green" />
                    <div className="text-[10px] font-mono text-slate-300">{settlement.source}</div>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-status-green">
                    +{settlement.message.match(/(\d+) RBL/)?.[1] || '0'} RBL
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
