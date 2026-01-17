import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FinancialForm from './pages/FinancialForm';
import Dashboard from './pages/Dashboard';
import LoanComparison from './pages/LoanComparison';
import { FinancialProvider } from './context/FinancialContext';

function App() {
  return (
    <Router>
      <FinancialProvider>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/financial-form" element={<FinancialForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/loans" element={<LoanComparison />} />
            </Routes>
          </main>
        </div>
      </FinancialProvider>
    </Router>
  );
}

export default App;
