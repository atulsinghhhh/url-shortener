import React, { useState } from 'react';
import { Copy, Check, QrCode, MousePointer2, Calendar, ShieldCheck, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '../utils/cn';
import type { UrlResponse } from '../types';

interface ResultCardProps {
  data: UrlResponse;
}

const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = () => {
    const now = new Date();
    const expiry = new Date(data.expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const days = diff / (1000 * 60 * 60 * 24);

    if (diff < 0) return 'text-red-600 bg-red-50 border-red-100';
    if (days < 7) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-emerald-600 bg-emerald-50 border-emerald-100';
  };

  return (
    <div className="card max-w-2xl mx-auto mt-8 overflow-hidden animate-in fade-in zoom-in duration-500">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className={cn("px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider flex items-center gap-1.5", getStatusColor())}>
            <ShieldCheck className="w-3.5 h-3.5" />
            Active Result
          </div>
          <div className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Created {new Date(data.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Short URL</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-900 truncate">{data.shortUrl}</span>
                <a href={data.shortUrl} target="_blank" rel="noreferrer" className="text-primary hover:text-primary-hover">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="p-3 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 text-slate-500 group-hover:text-primary" />}
              </button>
              <button
                onClick={() => setShowQR(!showQR)}
                className={cn(
                  "p-3 rounded-xl border transition-all",
                  showQR ? "bg-primary border-primary text-white" : "border-slate-200 hover:border-primary hover:bg-primary/5 text-slate-500 hover:text-primary"
                )}
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Original URL</label>
            <p className="text-slate-600 truncate text-sm">{data.originalUrl}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <MousePointer2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{data.clickCount || 0}</div>
              <div className="text-xs font-medium text-slate-500">Total Clicks</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{new Date(data.expiresAt).toLocaleDateString()}</div>
              <div className="text-xs font-medium text-slate-500">Expires at</div>
            </div>
          </div>
        </div>

        {showQR && (
          <div className="mt-6 p-6 bg-slate-50 rounded-panel border border-slate-200 flex flex-col items-center gap-4 animate-in slide-in-from-bottom-4 duration-300">
            <QRCodeSVG value={data.shortUrl} size={160} />
            <p className="text-xs font-medium text-slate-500">Scan to visit the short URL</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
