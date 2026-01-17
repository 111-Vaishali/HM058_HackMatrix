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

            <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                {[
                    { title: "Financial Profile Builder", desc: "Build a comprehensive financial identity with income and expense tracking.", icon: "📋", color: "var(--primary)" },
                    { title: "Loan Eligibility Check", desc: "Instant eligibility assessments for Home, Personal, and Education loans.", icon: "✅", color: "var(--secondary)" },
                    { title: "EMI Calculator", desc: "Precise EMI calculations using current Indian market interest rates.", icon: "🧮", color: "var(--accent)" },
                    { title: "Loan Comparison Dashboard", desc: "Compare multiple loan offers side-by-side to find the best deal.", icon: "⚖️", color: "#facc15" },
                    { title: "Credit Score Tracking", desc: "Monitor your credit health simulations and view detailed history.", icon: "📈", color: "#4ade80" },
                    { title: "Smart Financial Insights", desc: "AI-driven recommendations to optimize your debt and savings.", icon: "💡", color: "#8b5cf6" }
                ].map((feature, idx) => (
                    <div key={idx} className="glass" style={{ padding: '2rem', borderRadius: '1rem', transition: 'transform 0.3s ease' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                        <h3 style={{ marginBottom: '1rem', color: feature.color }}>{feature.title}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
