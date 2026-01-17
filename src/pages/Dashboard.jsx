import React from 'react';
import { Link } from 'react-router-dom';
import { useFinancial } from '../context/FinancialContext';
import { formatINR } from '../utils/formatters';

const Dashboard = () => {
    const { financialData } = useFinancial();

    // Parse values or default to 0
    const score = parseInt(financialData.creditScore) || 700; // Default mock if empty
    const income = parseFloat(financialData.income) || 5000;
    const debt = parseFloat(financialData.debt) || 1000;

    // Simple calc
    const dti = income > 0 ? Math.round((debt / income) * 100) : 0;
    const debtToIncome = dti;
    const creditScore = score;

    const recommendations = [];
    if (dti > 30) recommendations.push("Reduce debt to lower your DTI ratio below 30%");
    if (score < 700) recommendations.push("Review credit report for errors");
    if (score >= 700) recommendations.push("Maintain current timely payment streak");
    if (recommendations.length === 0) recommendations.push("Great financial health! Keep it up.");

    const scoreColor = score >= 700 ? '#4ade80' : score >= 600 ? '#facc15' : '#f87171';
    const scoreText = score >= 700 ? 'Good' : score >= 600 ? 'Fair' : 'Needs Work';
    const dtiColor = dti < 30 ? 'var(--secondary)' : 'var(--accent)';
    const dtiText = dti < 30 ? 'Healthy' : 'High';

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '3rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Financial Dashboard</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                {/* Credit Score Card */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px',
                        background: 'var(--primary)', filter: 'blur(50px)', opacity: '0.2', borderRadius: '50%'
                    }}></div>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Credit Score</h3>
                    <div style={{ fontSize: '4rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                        {creditScore}
                    </div>
                    <div style={{ color: scoreColor, fontWeight: '500' }}>{scoreText}</div>
                    <div style={{ marginTop: '1rem', height: '10px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}>
                        <div style={{ height: '100%', width: `${Math.min(Math.max((score - 300) / 5.5, 0), 100)}%`, background: 'linear-gradient(90deg, var(--secondary), var(--primary))', borderRadius: '5px' }}></div>
                    </div>
                </div>

                {/* DTI Card */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Debt-to-Income Ratio</h3>
                    <div style={{ fontSize: '4rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                        {debtToIncome}%
                    </div>
                    <div style={{ color: dtiColor, fontWeight: '500' }}>{dtiText}</div>
                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Target: &lt; 30%</p>
                </div>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>AI Recommendations</h3>
                <ul style={{ listStyle: 'none' }}>
                    {recommendations.map((rec, index) => (
                        <li key={index} style={{
                            marginBottom: '1rem', padding: '1rem',
                            background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem',
                            display: 'flex', alignItems: 'center', gap: '1rem'
                        }}>
                            <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>✦</span>
                            {rec}
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                    <Link to="/loans" className="btn btn-primary">See Loan Offers</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
