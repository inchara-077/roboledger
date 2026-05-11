import React from 'react';
import { useTaskStore } from '../../stores/task-store';
import { useUiStore } from '../../stores/ui-store';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ArrowRight, BrainCircuit, CheckCircle2, Clock } from 'lucide-react';
import { Task, TaskPriority } from '../../domains/tasks/types';
import clsx from 'clsx';

export function AutonomousTaskMarketplace() {
  const tasksDict = useTaskStore(state => state.tasks);
  const tasks = Object.values(tasksDict).sort((a, b) => b.createdAt - a.createdAt);
  const openModal = useUiStore(state => state.openModal);
  
  // Show only recent or active tasks
  const visibleTasks = tasks.filter(t => t.status !== 'COMPLETED').slice(0, 5);

  return (
    <div className="glass-panel rounded-lg p-3 flex flex-col h-[350px] border-panel-border relative overflow-hidden">
      <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-3">
        <Network size={16} className="text-soft-purple" />
        AUTONOMOUS MARKETPLACE
      </h2>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-2 relative z-10">
        <AnimatePresence>
          {visibleTasks.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-500 text-center mt-10 font-mono">
              WAITING FOR PROTOCOL TASKS...
            </motion.div>
          ) : (
            visibleTasks.map(task => (
              <TaskCard key={task.id} task={task} onClick={() => openModal('TASK', task)} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TaskCard({ task, onClick }: { task: Task, onClick: () => void }) {
  const priorityColors: Record<TaskPriority, string> = {
    LOW: 'text-slate-400',
    MEDIUM: 'text-electric-cyan',
    HIGH: 'text-status-orange',
    CRITICAL: 'text-status-red'
  };

  const statusColors = {
    PENDING: 'border-slate-700 bg-slate-900/50',
    ASSIGNED: 'border-neon-blue/50 bg-neon-blue/10',
    IN_PROGRESS: 'border-electric-cyan/50 bg-electric-cyan/10',
    VERIFYING: 'border-soft-purple/50 bg-soft-purple/10',
    COMPLETED: 'border-status-green/50 bg-status-green/10',
    FAILED: 'border-status-red/50 bg-status-red/10'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 20 }}
      onClick={onClick}
      className={clsx(
        "rounded p-2 border transition-all cursor-pointer hover:brightness-125 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]",
        statusColors[task.status]
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-slate-400">{task.id}</span>
          <span className="text-xs font-bold text-white">{task.title}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className={clsx("text-[9px] font-bold tracking-wider", priorityColors[task.priority])}>
            {task.priority} PRIORITY
          </span>
          <span className="text-[10px] text-status-green font-mono font-bold mt-1">
            {task.rewardValue.toFixed(2)} RBL
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] mt-2 border-t border-slate-700/50 pt-2">
        {task.status === 'PENDING' ? (
          <div className="flex items-center gap-1 text-slate-400 animate-pulse">
            <Clock size={10} />
            BIDDING OPEN...
          </div>
        ) : (
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-1 text-electric-cyan font-mono bg-electric-cyan/10 px-1 rounded">
                <ArrowRight size={10} />
                {task.assignedRobotId}
              </div>
              <div className="text-slate-400">
                {task.status}
              </div>
            </div>
            {task.reasoning && (
              <div className="text-[9px] text-slate-500 flex items-start gap-1 mt-1 bg-black/20 p-1 rounded">
                <BrainCircuit size={10} className="shrink-0 mt-0.5 text-soft-purple" />
                <span>{task.reasoning}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
