import React from 'react';
import { Link } from 'react-router-dom';
import { useFinancial } from '../context/FinancialContext';
import { formatINR } from '../utils/formatters';

const Dashboard = () => {
    const { financialData } = useFinancial();

    // Parse values
    const income = parseFloat(financialData.income) || 0;
    const expenses = parseFloat(financialData.expenses) || 0;
    const disposable = Math.max(income - expenses, 0);
    const loanAmount = parseFloat(financialData.loanAmount) || 0;
    const tenure = parseFloat(financialData.loanTenure) || 0;

    // Simple textual recommendations based on financial health
    const recommendations = [];
    if (disposable < (income * 0.2)) recommendations.push("Your disposable income is low. Consider reducing expenses.");
    if (loanAmount > (income * 20)) recommendations.push("Loan amount seems high compared to typical eligibility (20x monthly income).");
    if (disposable > 0 && loanAmount > 0) recommendations.push("You have a healthy surplus to service a loan.");
    if (recommendations.length === 0) recommendations.push("Great financial profile! You are likely eligible for various offers.");

    const StatCard = ({ title, value, subtext, color }) => (
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: color || 'var(--text-main)', marginBottom: '0.25rem' }}>
                {value}
            </div>
            {subtext && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{subtext}</div>}
        </div>
    );

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>Financial Dashboard</h2>
                <Link to="/financial-form" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Edit Profile</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard title="Monthly Income" value={formatINR(income)} />
                <StatCard title="Monthly Expenses" value={formatINR(expenses)} />
                <StatCard
                    title="Disposable Income"
                    value={formatINR(disposable)}
                    color={disposable > 0 ? '#4ade80' : 'var(--accent)'}
                />
            </div>

            {financialData.eligibilityResult && (
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '3rem', border: financialData.eligibilityResult.isEligible ? '1px solid #4ade80' : '1px solid var(--accent)' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        Eligibility Status:
                        <span style={{ color: financialData.eligibilityResult.isEligible ? '#4ade80' : 'var(--accent)', textTransform: 'uppercase' }}>
                            {financialData.eligibilityResult.isEligible ? 'Eligible' : 'Not Eligible'}
                        </span>
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Projected EMI</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '700' }}>{formatINR(financialData.eligibilityResult.emi)}</div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Base Interest Rate</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{financialData.eligibilityResult.rate}%</div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loan Type</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{financialData.eligibilityResult.loanType}</div>
                        </div>
                    </div>

                    {!financialData.eligibilityResult.isEligible && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                            <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Reasons for Ineligibility:</h4>
                            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                                {financialData.eligibilityResult.reasons.map((reason, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{reason}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Loan Request Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Desired Amount</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{formatINR(loanAmount)}</div>
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Preferred Tenure</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{tenure} Years</div>
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Employment</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{financialData.employmentType || 'Standard'}</div>
                    </div>
                </div>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>AI Insights</h3>
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
                <div style={{ marginTop: '2rem', textAlign: 'right', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <Link to="/credit-score" className="btn btn-secondary">Track Credit Score</Link>
                    <Link to="/loans" className="btn btn-primary">Check Eligibility</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
