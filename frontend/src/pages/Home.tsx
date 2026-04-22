import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import UrlInput from '../components/UrlInput';
import ResultCard from '../components/ResultCard';
import api from '../services/api';
import type { UrlResponse } from '../types';
import { useUrls } from '../hooks/useUrls';
import { Sparkles, Zap, Shield, BarChart3 } from 'lucide-react';

const Home = () => {
  const [result, setResult] = useState<UrlResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addUrl } = useUrls();

  const handleShorten = async (originalUrl: string, customAlias?: string, expiryDays?: number) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/v1/urls', {
        originalUrl,
        customAlias: customAlias || undefined,
        expiryDays: expiryDays || undefined
      });
      const data = response.data;
      setResult(data);
      addUrl(data);
      toast.success('URL shortened successfully!');
    } catch (error) {
      let message = 'Failed to shorten URL';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold animate-bounce">
            <Sparkles className="w-4 h-4" />
            New: Custom Alias & Click Tracking
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Shorten your long URLs <br />
            <span className="text-primary">instantly.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Powerful, fast, and simple URL shortening service for your business and personal needs. Track your links with detailed analytics.
          </p>
          
          <div className="mt-12">
            <UrlInput onShorten={handleShorten} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Result Section */}
      {result && (
        <section className="pb-32 px-4 scroll-mt-20" id="result">
          <ResultCard data={result} />
        </section>
      )}

      {/* Features Grid */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Lightning Fast</h3>
              <p className="text-slate-500 leading-relaxed">
                Our redirection engine is optimized for speed, ensuring your users reach their destination instantly.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Detailed Analytics</h3>
              <p className="text-slate-500 leading-relaxed">
                Get insights into who is clicking your links, from where, and on what device.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Secure & Reliable</h3>
              <p className="text-slate-500 leading-relaxed">
                Your links are safe with us. We use advanced encryption and reliable storage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
