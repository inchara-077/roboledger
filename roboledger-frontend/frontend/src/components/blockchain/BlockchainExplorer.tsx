import React from 'react';
import { Search, Box, ArrowUpRight, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

export function BlockchainExplorer() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Blockchain Explorer</h1>
          <p className="text-muted-foreground">Search and verify immutable proofs attested on Solana.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input 
          type="text" 
          className="w-full pl-12 pr-28 py-4 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-shadow text-sm md:text-lg"
          placeholder="Search hashes, transactions, or validators..."
        />
        <button className="absolute inset-y-2 right-2 px-4 md:px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm md:text-base">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[400px] mt-4">
        {/* Latest Blocks */}
        <div className="bg-card rounded-xl border border-border/50 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border/50 flex justify-between items-center bg-secondary/30">
            <h3 className="font-semibold flex items-center gap-2">
              <Box className="w-5 h-5 text-primary" />
              Latest Blocks
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 border-b border-border/20 flex items-center justify-between hover:bg-secondary/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center font-mono text-xs text-muted-foreground">
                    Bk
                  </div>
                  <div>
                    <div className="font-medium text-primary hover:underline cursor-pointer">294,812,{800 - i * 14}</div>
                    <div className="text-xs text-muted-foreground">12 secs ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">14 Proofs</div>
                  <div className="text-xs text-muted-foreground">{1.2 + i * 0.1} SOL</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions / Attestations */}
        <div className="bg-card rounded-xl border border-border/50 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border/50 flex justify-between items-center bg-secondary/30">
            <h3 className="font-semibold flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-accent" />
              Recent Attestations
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="p-3 rounded border border-border/30 bg-background/50 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-mono text-primary flex items-center gap-1 cursor-pointer hover:text-primary/80">
                    Tx: {Math.random().toString(36).substring(2, 10).toUpperCase()}...
                    <Copy className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded">Success</span>
                </div>
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>From: Validator Node {i}</span>
                  <span>Fee: 0.000005 SOL</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
