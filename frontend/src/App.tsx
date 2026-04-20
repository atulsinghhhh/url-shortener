import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 selection:bg-primary/20">
        <Toaster position="top-right" />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stats/:code" element={<Stats />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;