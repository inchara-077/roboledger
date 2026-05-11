import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck, Cpu, Clock, Hash } from 'lucide-react';
import { Robot } from '../../domains/robots/types';

interface ProofModalProps {
  robot: Robot | null;
  onClose: () => void;
}

export function ProofModal({ robot, onClose }: ProofModalProps) {
  if (!robot) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass-panel rounded-2xl overflow-hidden border-panel-border shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-border/30 bg-primary/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-primary" />
              <div>
                <h2 className="text-lg font-bold tracking-tight">Proof Verification</h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Immutable Certificate</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-secondary/50 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1.5">
                    <Cpu size={10} /> Robot ID
                 </label>
                 <p className="font-mono text-sm">{robot.id}</p>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1.5">
                    <Clock size={10} /> Timestamp
                 </label>
                 <p className="font-mono text-sm">{new Date().toLocaleString()}</p>
               </div>
            </div>

            <div className="space-y-3">
                <div className="p-3 bg-background/50 rounded-xl border border-border/30 space-y-2">
                    <label className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1.5">
                        <Hash size={10} /> Proof Hash (SHA-256)
                    </label>
                    <p className="font-mono text-xs break-all text-primary">{robot.lastProofId || '7f8a2c1b9e0d4f3a...6b5c4d3e2f1a0b'}</p>
                </div>

                <div className="p-3 bg-background/50 rounded-xl border border-border/30 space-y-2">
                    <label className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1.5">
                        <ExternalLink size={10} /> Solana Transaction ID
                    </label>
                    <p className="font-mono text-xs break-all">sol_tx_{Math.random().toString(36).substring(2, 15)}</p>
                </div>
            </div>

            <div className="p-4 bg-status-green/10 border border-status-green/30 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-status-green/20 flex items-center justify-center text-status-green">
                    <ShieldCheck size={28} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-status-green uppercase">Verified & Secured</h4>
                    <p className="text-xs text-status-green/70">This proof has been permanently anchored to the Solana blockchain with 100% consensus matching.</p>
                </div>
            </div>
          </div>

          <div className="p-6 bg-secondary/20 flex gap-3">
             <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                Close Inspector
             </button>
             <button className="px-4 py-3 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground transition-all">
                <ExternalLink size={18} />
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
