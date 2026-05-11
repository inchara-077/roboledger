import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/landing/LandingPage';
import { ArchitecturePage } from './components/landing/ArchitecturePage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { ProofUploadPanel } from './components/proofs/ProofUploadPanel';
import { VerificationPipeline } from './components/pipeline/VerificationPipeline';
import { BlockchainExplorer } from './components/blockchain/BlockchainExplorer';
import { ValidatorDashboard } from './components/validators/ValidatorDashboard';
import { AiAnalysisCenter } from './components/ai/AiAnalysisCenter';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/architecture" element={<ArchitecturePage />} />
      
      {/* Authenticated Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="submit" element={<ProofUploadPanel />} />
        <Route path="pipeline" element={<VerificationPipeline />} />
        <Route path="ai" element={<AiAnalysisCenter />} />
        <Route path="validators" element={<ValidatorDashboard />} />
        <Route path="explorer" element={<BlockchainExplorer />} />
      </Route>
    </Routes>
  );
}
