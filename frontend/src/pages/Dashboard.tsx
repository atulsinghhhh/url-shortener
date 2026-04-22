import { useState, useEffect } from 'react';
import { Plus, Search, Link2, MousePointer2, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import LinkTable from '../components/LinkTable';
import { useUrls } from '../hooks/useUrls';
import api from '../services/api';
import { cn } from '../utils/cn';

const Dashboard = () => {
  const { urls, removeUrl } = useUrls();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'expired'>('all');
  const [enrichedUrls, setEnrichedUrls] = useState(urls);

  // Fetch updated click counts for links
  useEffect(() => {
    const fetchStats = async () => {
      const updated = await Promise.all(
        urls.map(async (url) => {
          try {
            const res = await api.get(`/api/v1/stats/${url.shortCode}`);
            return { ...url, clickCount: res.data.clickCount };
          } catch {
            return url;
          }
        })
      );
      setEnrichedUrls(updated);
    };

    if (urls.length > 0) fetchStats();
  }, [urls]);

  const filteredUrls = enrichedUrls.filter((url) => {
    const matchesSearch = url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) || url.shortCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const expiresAt = new Date(url.expiresAt);
    const isExpired = expiresAt.getTime() < now.getTime();

    if (activeTab === 'active') return matchesSearch && !isExpired;
    if (activeTab === 'expired') return matchesSearch && isExpired;
    return matchesSearch;
  });

  const handleDelete = async (shortCode: string) => {
    try {
      await api.delete(`/api/v1/urls/${shortCode}`);
      removeUrl(shortCode);
      toast.success('Link deleted successfully');
    } catch {
      toast.error('Failed to delete link');
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const metrics = {
    total: enrichedUrls.length,
    clicks: enrichedUrls.reduce((acc, curr) => acc + (curr.clickCount || 0), 0),
    active: enrichedUrls.filter(u => new Date(u.expiresAt) > new Date()).length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Dashboard</h1>
          <p className="text-slate-500 font-medium">Manage and track your shortened links</p>
        </div>
        <Link to="/" className="btn-primary">
          <Plus className="w-5 h-5" />
          Create New Link
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricCard 
          title="Total Links" 
          value={metrics.total} 
          icon={<Link2 className="w-6 h-6" />} 
          color="primary" 
        />
        <MetricCard 
          title="Total Clicks" 
          value={metrics.clicks} 
          icon={<MousePointer2 className="w-6 h-6" />} 
          color="emerald" 
        />
        <MetricCard 
          title="Active Links" 
          value={metrics.active} 
          icon={<CheckCircle className="w-6 h-6" />} 
          color="amber" 
        />
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['all', 'active', 'expired'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                  activeTab === tab 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="relative group max-w-sm w-full">
            <Search className="absolute left-3 inset-y-0 my-auto w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all bg-slate-50/50"
            />
          </div>
        </div>

        <LinkTable 
          data={filteredUrls} 
          onDelete={handleDelete} 
          onCopy={handleCopy} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
