import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FinancialForm from './pages/FinancialForm';
import Dashboard from './pages/Dashboard';
import LoanComparison from './pages/LoanComparison';
import CreditScoreTracker from './pages/CreditScoreTracker';
import { FinancialProvider } from './context/FinancialContext';

function App() {
  return (
    <Router>
      <FinancialProvider>
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/financial-form" element={<FinancialForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/loans" element={<LoanComparison />} />
              <Route path="/credit-score" element={<CreditScoreTracker />} />
            </Routes>
          </main>
          <footer style={{
            textAlign: 'center',
            padding: '2rem',
            borderTop: '1px solid var(--border-glass)',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            background: 'rgba(15, 23, 42, 0.3)'
          }}>
            <p>This platform uses simulated data for educational purposes only. It does not provide financial advice.</p>
            <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>&copy; 2026 Credit Health Platform</p>
          </footer>
        </div>
      </FinancialProvider>
    </Router>
  );
}

export default App;
