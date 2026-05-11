import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  GitMerge, 
  BrainCircuit, 
  Network, 
  Search,
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clsx } from 'clsx';
import { useTelemetrySocket } from '../../hooks/useTelemetrySocket';
import { useSimulation } from '../../stores/simulation';

const NAVIGATION = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Submit Proof', path: '/dashboard/submit', icon: UploadCloud },
  { name: 'Pipeline', path: '/dashboard/pipeline', icon: GitMerge },
  { name: 'AI Analysis', path: '/dashboard/ai', icon: BrainCircuit },
  { name: 'Validators', path: '/dashboard/validators', icon: Network },
  { name: 'Explorer', path: '/dashboard/explorer', icon: Search },
];

export function DashboardLayout() {
  const { connected } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Initialize WebSocket connection for live telemetry
  useTelemetrySocket();
  useSimulation();

  useEffect(() => {
    // Optionally redirect to landing if disconnected
    // if (!connected) navigate('/');
  }, [connected, navigate]);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-border/50 bg-card flex flex-col transition-transform duration-300 md:relative md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border/50">
          <span className="text-xl font-bold tracking-tight text-primary">RoboLedger</span>
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {NAVIGATION.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            Exit Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background/50 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border/50 bg-card/80 backdrop-blur-md shrink-0 relative z-50">
          <div className="flex items-center gap-3">
            <button 
              className="p-1 md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold tracking-tight hidden sm:block">Mission Control</h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4 relative">
            <button 
              className="p-2 text-muted-foreground hover:text-foreground relative hidden sm:block"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-card"></span>
            </button>
            
            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl z-[60] overflow-hidden">
                <div className="p-4 border-b border-border/50 flex justify-between items-center bg-secondary/30">
                  <h3 className="font-semibold">Notifications</h3>
                  <button 
                    className="text-xs text-primary hover:underline"
                    onClick={() => setIsNotificationsOpen(false)}
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 border-b border-border/30 hover:bg-secondary/10 transition-colors cursor-pointer">
                    <p className="text-sm font-medium">Proof Attestation Successful</p>
                    <p className="text-xs text-muted-foreground mt-1">Proof #X7F9 has been recorded on Solana.</p>
                    <p className="text-xs text-muted-foreground mt-1">2 mins ago</p>
                  </div>
                  <div className="p-3 border-b border-border/30 hover:bg-secondary/10 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-yellow-500">Consensus Delayed</p>
                    <p className="text-xs text-muted-foreground mt-1">Waiting on 3 more validators for Proof #B2M1.</p>
                    <p className="text-xs text-muted-foreground mt-1">15 mins ago</p>
                  </div>
                  <div className="p-3 hover:bg-secondary/10 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-red-500">Anomaly Detected</p>
                    <p className="text-xs text-muted-foreground mt-1">AI flagged unusual metadata entropy.</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            )}

            <div className="scale-90 sm:scale-100 origin-right">
              <WalletMultiButton className="!bg-secondary !text-sm !h-9 !py-0 !px-4 hover:!bg-secondary/80 !transition-colors !rounded-md !text-foreground" />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto min-h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
