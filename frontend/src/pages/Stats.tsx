import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft,MousePointer2,Calendar,Copy,ExternalLink,RefreshCcw,Clock,Layout,BarChart3 as BarChartIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import type { StatsResponse, ClicksResponse } from '../types';
import AnalyticsBarChart from '../components/BarChart';
import AnalyticsDonutChart from '../components/DonutChart';
import RecentClicks from '../components/RecentClicks';
import MetricCard from '../components/MetricCard';

interface ChartItem {
  name: string;
  value: number;
}

const Stats = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [clickData, setClickData] = useState<ClicksResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, clicksRes] = await Promise.all([
          api.get(`/api/v1/stats/${code}`),
          api.get(`/api/v1/stats/${code}/clicks?limit=50`)
        ]);
        setStats(statsRes.data);
        setClickData(clicksRes.data);
      } catch {
        toast.error('Failed to load stats');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [code, navigate]);

  if (isLoading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Prepare chart data
  const chartData = (clickData?.clicks || []).reduce((acc: ChartItem[], click) => {
    const date = new Date(click.timestamp).toLocaleDateString();
    const existing = acc.find(item => item.name === date);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: date, value: 1 });
    }
    return acc;
  }, []).slice(-7); // Last 7 days

  const deviceData = (clickData?.clicks || []).reduce((acc: ChartItem[], click) => {
    const browser = click.userAgent.split('/')[0] || 'Other';
    const existing = acc.find(item => item.name === browser);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: browser, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-bold transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-black text-slate-900 mb-6">Link Preview</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Short URL</p>
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-primary truncate max-w-[180px]">{code}</span>
                  <div className="flex gap-1">
                    <button onClick={() => {
                       navigator.clipboard.writeText(`${window.location.origin.replace('5173', '3000')}/${code}`);
                       toast.success('Copied!');
                    }} className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-primary transition-all">
                      <Copy className="w-4 h-4" />
                    </button>
                    <a href={`http://localhost:3000/${code}`} target="_blank" rel="noreferrer" className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-primary transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Original URL</p>
                <p className="text-sm font-medium text-slate-600 break-all bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {stats.originalUrl}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Created</p>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {new Date(stats.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Expires</p>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {new Date(stats.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MetricCard 
            title="Total Clicks" 
            value={stats.clickCount || 0} 
            icon={<MousePointer2 className="w-6 h-6" />} 
            color="primary" 
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BarChartIcon className="w-5 h-5 text-primary" />
                Clicks over time
              </h3>
              <AnalyticsBarChart data={chartData.length ? chartData : [{name: 'No data', value: 0}]} />
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Layout className="w-5 h-5 text-emerald-500" />
                Browsers
              </h3>
              <AnalyticsDonutChart data={deviceData.length ? deviceData : [{name: 'No data', value: 0}]} />
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Recent Clicks</h3>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Real-time updates
              </span>
            </div>
            <div className="p-6">
              <RecentClicks clicks={clickData?.clicks || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
