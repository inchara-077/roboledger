import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Brain, Network, ArrowRight } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export function LandingPage() {
  const navigate = useNavigate();
  const { connected } = useWallet();

  // If connected, automatically navigate to dashboard
  React.useEffect(() => {
    if (connected) {
      navigate('/dashboard');
    }
  }, [connected, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative font-sans">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a192f_1px,transparent_1px),linear-gradient(to_bottom,#0a192f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">RoboLedger</span>
        </div>
        <div>
          <WalletMultiButton className="!bg-primary hover:!bg-primary/90 !transition-colors !rounded-md" />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium">Solana Mainnet Beta is Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Decentralized Proof <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Verification Platform
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            A visualization of trust. Powered by AI anomaly detection and Solana blockchain consensus, providing an immutable verification operating system.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
            >
              Enter Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/architecture')}
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors border border-border"
            >
              View Architecture
            </button>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 text-left">
          <FeatureCard 
            icon={<Brain className="w-6 h-6 text-primary" />}
            title="AI Risk Analysis"
            description="Real-time behavioral anomalies and threat detection before proofs hit the blockchain."
          />
          <FeatureCard 
            icon={<Network className="w-6 h-6 text-primary" />}
            title="Validator Consensus"
            description="Global network of validators verifying multi-signature approvals autonomously."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Immutable Attestation"
            description="Cryptographic proofs permanently stored on Solana with verifiable certificates."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-primary/5 transition-all"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
