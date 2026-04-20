import React from 'react';
import { ExternalLink, Copy, BarChart2, Trash2, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { UrlResponse } from '../types';

interface LinkTableProps {
  data: UrlResponse[];
  onDelete: (code: string) => void;
  onCopy: (url: string) => void;
}

const LinkTable: React.FC<LinkTableProps> = ({ data, onDelete, onCopy }) => {
  const getStatusBadge = (expiry: string) => {
    const now = new Date();
    const expiresAt = new Date(expiry);
    const diff = expiresAt.getTime() - now.getTime();
    const days = diff / (1000 * 60 * 60 * 24);

    if (diff < 0) {
      return (
        <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-100">
          <XCircle className="w-3.5 h-3.5" />
          Expired
        </span>
      );
    }
    if (days < 7) {
      return (
        <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
          <Clock className="w-3.5 h-3.5" />
          Expiring Soon
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Active
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Short URL</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Original URL</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Clicks</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Expiry Date</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                No links found match your criteria.
              </td>
            </tr>
          ) : (
            data.map((link) => (
              <tr key={link.shortCode} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{link.shortUrl}</span>
                    <a href={link.shortUrl} target="_blank" rel="noreferrer" className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-sm text-slate-500 truncate" title={link.originalUrl}>
                    {link.originalUrl}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900">{link.clickCount || 0}</span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(link.expiresAt)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500">
                    {new Date(link.expiresAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onCopy(link.shortUrl)}
                      className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-primary"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/stats/${link.shortCode}`}
                      className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-primary"
                      title="View Stats"
                    >
                      <BarChart2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(link.shortCode)}
                      className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-red-100 transition-all text-slate-400 hover:text-red-600"
                      title="Delete Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LinkTable;
