import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileDigit, Brain, Users, Link, FileCheck, ArrowRight, Check } from 'lucide-react';

const STAGES = [
  { id: 'encoding', label: 'Canonical Encoding', icon: FileDigit },
  { id: 'ai', label: 'AI Risk Analysis', icon: Brain },
  { id: 'consensus', label: 'Validator Consensus', icon: Users },
  { id: 'attestation', label: 'Blockchain Attestation', icon: Link },
  { id: 'certificate', label: 'Certificate Generation', icon: FileCheck },
];

export function VerificationPipeline() {
  const [currentStage, setCurrentStage] = useState(0);

  // Simulate pipeline progress for the demo
  useEffect(() => {
    if (currentStage >= STAGES.length) return;
    
    const timer = setTimeout(() => {
      setCurrentStage(prev => prev + 1);
    }, 3000); // 3 seconds per stage
    
    return () => clearTimeout(timer);
  }, [currentStage]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Verification Pipeline</h1>
        <p className="text-muted-foreground">Live visualization of proof processing and attestation.</p>
      </div>

      {/* Stepper */}
      <div className="w-full overflow-x-auto pb-6 mb-10 hide-scrollbar">
        <div className="flex justify-between relative min-w-[600px] px-4">
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-secondary -translate-y-1/2 z-0">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStage / (STAGES.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {STAGES.map((stage, index) => {
            const isCompleted = index < currentStage;
            const isActive = index === currentStage;
            const Icon = stage.icon;
            
            return (
              <div key={stage.id} className="relative z-10 flex flex-col items-center gap-3">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors border-2 ${
                    isCompleted ? 'bg-primary border-primary text-primary-foreground' :
                    isActive ? 'bg-background border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]' :
                    'bg-card border-border text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs md:text-sm font-medium text-center max-w-[80px] md:max-w-none ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Details Pane */}
      <div className="bg-card rounded-xl border border-border/50 p-8 min-h-[300px]">
        {currentStage < STAGES.length ? (
          <ActiveStageDetail stage={STAGES[currentStage]} />
        ) : (
          <PipelineCompleteDetail />
        )}
      </div>
    </div>
  );
}

function ActiveStageDetail({ stage }: { stage: any }) {
  return (
    <motion.div 
      key={stage.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col items-center justify-center h-full text-center py-12"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <stage.icon className="w-8 h-8 text-primary animate-pulse" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Processing: {stage.label}</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Please wait while the system computes cryptographic hashes and communicates with the network...
      </p>
      
      <div className="mt-8 w-64 h-2 bg-secondary rounded-full overflow-hidden">
        <div className="w-full h-full bg-primary animate-[slide_2s_ease-in-out_infinite]" style={{ transformOrigin: 'left' }} />
      </div>
    </motion.div>
  );
}

function PipelineCompleteDetail() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center py-12"
    >
      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
        <FileCheck className="w-10 h-10 text-green-500" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Proof Attested Successfully!</h3>
      <p className="text-muted-foreground mb-8">
        Your document has been verified by the consensus network and permanently recorded on the Solana blockchain.
      </p>
      
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2">
          View Certificate
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
