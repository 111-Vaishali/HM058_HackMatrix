import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container animate-fade-in" style={{ paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Master Your <span style={{ color: 'var(--primary)' }}>Financial Health</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Analyze your credit score, track income vs. expenses, and find the best loan offers curated just for you.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/financial-form" className="btn btn-primary">Get Started</Link>
                <Link to="/dashboard" className="btn btn-secondary">View Demo Dashboard</Link>
            </div>

            <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Real-time Analysis</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Get instant feedback on your financial health based on your latest data.</p>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Smart Recommendations</h3>
                    <p style={{ color: 'var(--text-muted)' }}>AI-driven suggestions to improve your credit score and reduce debt.</p>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Loan Comparison</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Compare interest rates and terms from top lenders in one place.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
