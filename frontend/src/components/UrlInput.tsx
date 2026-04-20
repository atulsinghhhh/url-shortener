import React, { useState } from 'react';
import { Link2, Sparkles, Loader2 } from 'lucide-react';
import AdvancedOptions from './AdvancedOptions';

interface UrlInputProps {
  onShorten: (url: string, alias?: string, expiry?: number) => Promise<void>;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onShorten, isLoading }) => {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiryDays, setExpiryDays] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    onShorten(url, customAlias, expiryDays);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
          <Link2 className="w-5 h-5" />
        </div>
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          className="w-full pl-12 pr-36 py-4 card rounded-full text-lg focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-lg hover:shadow-xl"
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="absolute right-2 inset-y-2 px-6 bg-primary text-white rounded-full font-bold flex items-center gap-2 hover:bg-primary-hover transition-all active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Shorten</span>
            </>
          )}
        </button>
      </form>
      
      <AdvancedOptions 
        customAlias={customAlias} 
        setCustomAlias={setCustomAlias}
        expiryDays={expiryDays}
        setExpiryDays={setExpiryDays}
      />
    </div>
  );
};

export default UrlInput;