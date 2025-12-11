import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Departments from './pages/Departments';
import Costs from './pages/Costs';
import Insurance from './pages/Insurance';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Contact from './pages/Contact';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/costs" element={<Costs />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <div className="lg:ml-64">
            <main className="min-h-[calc(100vh-4rem)]">
              <AnimatedRoutes />
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

