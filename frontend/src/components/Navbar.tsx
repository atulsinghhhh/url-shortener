
import { Link, useLocation } from 'react-router-dom';
import { Scissors, LayoutDashboard, Home, BarChart2 } from 'lucide-react';
import { cn } from '../utils/cn';

const Navbar = () => {
  const location = useLocation();
  
  const statsMatch = location.pathname.match(/^\/stats\/([^/]+)/);
  const currentCode = statsMatch ? statsMatch[1] : null;

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ...(currentCode ? [{ name: 'Analytics', path: `/stats/${currentCode}`, icon: BarChart2 }] : []),
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              snip.<span className="text-primary">ly</span>
            </span>
          </Link>

          <div className="flex gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-card text-sm font-medium transition-all",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;