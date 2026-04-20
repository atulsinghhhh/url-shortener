import React from 'react';
import { cn } from '../utils/cn';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'primary' | 'emerald' | 'amber';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <div className="card p-6 flex items-center gap-4">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorMap[color])}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
