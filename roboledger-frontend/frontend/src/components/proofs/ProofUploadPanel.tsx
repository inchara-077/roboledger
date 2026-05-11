import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, File, Lock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ProofUploadPanel() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSimulateUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      // Redirect to pipeline view for demo
      navigate('/dashboard/pipeline');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Submit New Proof</h1>
        <p className="text-muted-foreground">Upload documents or data for canonical encoding and verification.</p>
      </div>

      <div className="space-y-6">
        {/* Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-secondary/20'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex justify-center mb-4">
            <UploadCloud className={`w-12 h-12 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Drag and drop your files here</h3>
          <p className="text-muted-foreground mb-6">Supports PDF, JSON, CSV, Images (Max 50MB)</p>
          
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
          />
          <label 
            htmlFor="file-upload"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg cursor-pointer hover:bg-secondary/80 font-medium inline-block"
          >
            Browse Files
          </label>
        </div>

        {/* Selected File & Metadata */}
        {file && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-xl border border-border/50"
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <File className="w-5 h-5 text-primary" />
              Selected Proof Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs text-muted-foreground uppercase font-semibold">Filename</label>
                <p className="font-mono text-sm mt-1">{file.name}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase font-semibold">Size</label>
                <p className="text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Proof Context / Metadata</label>
                <textarea 
                  className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  rows={3}
                  placeholder="Describe the context of this proof..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="encrypt" className="rounded border-border bg-background text-primary" />
                <label htmlFor="encrypt" className="text-sm flex items-center gap-1 cursor-pointer">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  Encrypt payload before encoding
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleSimulateUpload}
                disabled={isUploading}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Submit for Verification
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
