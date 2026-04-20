import { useState } from 'react';
import { ChevronDown, ChevronUp, Settings2 } from 'lucide-react';

interface AdvancedOptionsProps {
  customAlias: string;
  setCustomAlias: (val: string) => void;
  expiryDays: number | undefined;
  setExpiryDays: (val: number | undefined) => void;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  customAlias,
  setCustomAlias,
  expiryDays,
  setExpiryDays
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-4"
      >
        <Settings2 className="w-4 h-4" />
        Advanced Options
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-6 bg-slate-50 rounded-panel border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Custom Alias</label>
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="e.g. my-awesome-link"
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Expiry (Days)</label>
            <input
              type="number"
              value={expiryDays || ''}
              onChange={(e) => setExpiryDays(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="e.g. 30"
              className="input-field"
              min="1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;
