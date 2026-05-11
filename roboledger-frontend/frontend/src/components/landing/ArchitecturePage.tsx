import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Box, Brain, FileDigit, Link, Shield, Users } from 'lucide-react';

export function ArchitecturePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a192f_0%,transparent_80%)] opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Platform Architecture</h1>
            <p className="text-xl text-muted-foreground">The technical foundation of the RoboLedger Verification OS.</p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            <ArchitectureStep 
              icon={<FileDigit />}
              title="1. Data Ingestion & Canonical Encoding"
              description="Proofs are uploaded, metadata is sanitized, and the raw data is converted into a deterministic hash structure (Merkle Trees) for efficient verification."
            />
            <ArchitectureStep 
              icon={<Brain />}
              title="2. AI Threat Analysis Layer"
              description="Before reaching the blockchain, neural networks analyze the payload entropy and metadata for anomalies, assigning a deterministic risk score to prevent spam and fraud."
            />
            <ArchitectureStep 
              icon={<Users />}
              title="3. Decentralized Validator Network"
              description="A permissionless network of nodes receives the proof hashes. They independently verify the AI signatures and encoding integrity to reach consensus."
            />
            <ArchitectureStep 
              icon={<Link />}
              title="4. Solana Blockchain Attestation"
              description="Once >66% consensus is reached, an aggregated signature is posted to the Solana Mainnet, ensuring low-latency, immutable, and permanent attestation."
            />
            <ArchitectureStep 
              icon={<Shield />}
              title="5. Cryptographic Certificate Generation"
              description="A portable, zero-knowledge verifiable certificate is generated for the end-user, proving the document's existence and integrity at a specific timestamp."
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ArchitectureStep({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(var(--primary),0.2)] z-10">
        <div className="w-5 h-5">{icon}</div>
      </div>
      
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
