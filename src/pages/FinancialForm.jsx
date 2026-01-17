import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinancial } from '../context/FinancialContext';

const FinancialForm = () => {
    const navigate = useNavigate();
    const { financialData, updateFinancialData } = useFinancial();

    // Initialize form with current context data or empty strings
    const [formData, setFormData] = useState({
        income: financialData.income || '',
        expenses: financialData.expenses || '',
        debt: financialData.debt || '',
        creditScore: financialData.creditScore || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        updateFinancialData(formData);
        navigate('/dashboard');
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '3rem', maxWidth: '600px' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '1rem' }}>
                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Update Financial Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label>Monthly Income (₹)</label>
                        <input
                            type="number"
                            name="income"
                            placeholder="e.g. 50000"
                            value={formData.income}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label>Monthly Expenses (₹)</label>
                        <input
                            type="number"
                            name="expenses"
                            placeholder="e.g. 20000"
                            value={formData.expenses}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label>Total Debt (₹)</label>
                        <input
                            type="number"
                            name="debt"
                            placeholder="e.g. 100000"
                            value={formData.debt}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <label>Estimated Credit Score</label>
                        <input
                            type="number"
                            name="creditScore"
                            placeholder="e.g. 720"
                            value={formData.creditScore}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Update Analysis
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FinancialForm;
