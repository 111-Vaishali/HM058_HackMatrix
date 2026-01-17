import React, { useEffect } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { generateCreditHistory, getScoreStatus } from '../utils/creditScoreSimulator';
import { Link } from 'react-router-dom';

const CreditScoreTracker = () => {
    const { financialData, updateFinancialData } = useFinancial();

    useEffect(() => {
        // Generate history if not present or single value
        if (!financialData.creditHistory || financialData.creditHistory.length === 0) {
            const history = generateCreditHistory(financialData);
            updateFinancialData({ creditHistory: history });
        }
    }, []); // Run once on mount

    const history = financialData.creditHistory || [];
    const currentScore = history.length > 0 ? history[history.length - 1].score : (financialData.creditScore || 750);
    const status = getScoreStatus(currentScore);

    // Simple Bar Chart Logic
    const maxScore = 900;
    const minScore = 300;
    const range = maxScore - minScore;

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Credit Health Tracker</h2>
                <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Main Score Display */}
                <div className="glass" style={{ padding: '3rem', borderRadius: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Your Credit Score (CIBIL Estimate)</h3>

                    <div style={{
                        width: '200px', height: '200px', borderRadius: '50%',
                        border: `10px solid ${status.color}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 30px ${status.color}40`,
                        background: 'rgba(0,0,0,0.2)'
                    }}>
                        <span style={{ fontSize: '4rem', fontWeight: 'bold' }}>{currentScore}</span>
                        <span style={{ color: status.color, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{status.label}</span>
                    </div>

                    <p style={{ marginTop: '2rem', maxWidth: '80%', color: 'var(--text-muted)' }}>
                        Updated just now based on your profile inputs.
                    </p>
                </div>

                {/* Factors & Insights */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Score Factors</h3>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Payment History</span>
                            <span style={{ color: '#4ade80' }}>Excellent</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--border-glass)', borderRadius: '3px' }}>
                            <div style={{ width: '95%', height: '100%', background: '#4ade80', borderRadius: '3px' }}></div>
                        </div>
                        <small style={{ color: 'var(--text-muted)' }}>No missed payments recorded.</small>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Credit Utilization</span>
                            <span style={{ color: '#facc15' }}>Moderate</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--border-glass)', borderRadius: '3px' }}>
                            <div style={{ width: '60%', height: '100%', background: '#facc15', borderRadius: '3px' }}></div>
                        </div>
                        <small style={{ color: 'var(--text-muted)' }}>Using about 30-40% of available limit.</small>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Credit Mix</span>
                            <span style={{ color: '#8b5cf6' }}>Good</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--border-glass)', borderRadius: '3px' }}>
                            <div style={{ width: '80%', height: '100%', background: '#8b5cf6', borderRadius: '3px' }}></div>
                        </div>
                        <small style={{ color: 'var(--text-muted)' }}>Healthy mix of secured and unsecured loans.</small>
                    </div>
                </div>

                {/* History Chart */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', gridColumn: '1 / -1' }}>
                    <h3 style={{ marginBottom: '2rem' }}>6-Month Score Trend</h3>

                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                        height: '200px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem'
                    }}>
                        {history.map((h, i) => {
                            // Normalize height relative to 900
                            const heightPercent = ((h.score - 300) / (900 - 300)) * 100; // Map 300-900 to 0-100%
                            const barColor = h.change >= 0 ? '#4ade80' : '#f87171';

                            return (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                    <div style={{
                                        marginBottom: '0.5rem',
                                        background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem',
                                        borderRadius: '4px', fontSize: '0.8rem'
                                    }}>
                                        {h.score}
                                    </div>
                                    <div style={{
                                        width: '40%', height: `${heightPercent}%`,
                                        background: `linear-gradient(to top, ${barColor}, transparent)`,
                                        borderRadius: '4px 4px 0 0',
                                        transition: 'height 1s ease',
                                        borderTop: `3px solid ${barColor}`
                                    }}></div>
                                    <div style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>{h.month}</div>
                                    <div style={{ fontSize: '0.7rem', color: barColor }}>
                                        {h.change > 0 ? '+' : ''}{h.change}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {history.map((h, i) => (
                            <div key={i} style={{ width: '100%', textAlign: 'center', padding: '0 0.5rem' }}>
                                {h.reason}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CreditScoreTracker;
