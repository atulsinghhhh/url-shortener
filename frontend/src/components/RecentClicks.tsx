import React from 'react';
import { Globe, Monitor, MapPin, Clock } from 'lucide-react';
import type { ClickData } from '../types';

interface RecentClicksProps {
  clicks: ClickData[];
}

const RecentClicks: React.FC<RecentClicksProps> = ({ clicks }) => {
  return (
    <div className="space-y-4">
      {clicks.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          No click data available yet.
        </div>
      ) : (
        clicks.map((click, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{click.country || 'Unknown Location'}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    <Monitor className="w-3 h-3" />
                    {click.userAgent.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    <MapPin className="w-3 h-3" />
                    {click.referer === 'direct' ? 'Direct' : new URL(click.referer).hostname}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                <Clock className="w-3 h-3" />
                {new Date(click.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentClicks;
