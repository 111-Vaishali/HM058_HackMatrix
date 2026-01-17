import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinancial } from '../context/FinancialContext';
import { checkEligibility, LOAN_TYPES } from '../utils/loanRules';

const FinancialForm = () => {
    const navigate = useNavigate();
    const { financialData, updateFinancialData } = useFinancial();


    // Initialize form with current context data
    const [formData, setFormData] = useState({
        income: financialData.income || '',
        expenses: financialData.expenses || '',
        employmentType: financialData.employmentType || 'Salaried',
        age: financialData.age || '',
        loanAmount: financialData.loanAmount || '',
        loanTenure: financialData.loanTenure || '',
        loanType: financialData.loanType || 'HOME',
        // keeping creditScore/debt for backward compatibility if needed, though mostly using above now
        creditScore: financialData.creditScore || '750',
        debt: financialData.debt || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (formData.income <= 0 || formData.expenses < 0 || formData.age <= 18) {
            alert("Please enter valid financial details.");
            return;
        }

        // Run Eligibility Check
        const eligibilityResult = checkEligibility(formData);

        // Auto-sync 'debt' with 'loanAmount' for the older logic to work seamlessly if it uses 'debt'
        const updatedData = {
            ...formData,
            debt: formData.loanAmount, // Considering loan amount as the debt payload for this context
            eligibilityResult
        };

        updateFinancialData(updatedData);
        navigate('/dashboard');
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '3rem', maxWidth: '600px' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create Financial Profile</h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                placeholder="e.g. 30"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                min="18"
                            />
                        </div>
                        <div>
                            <label>Employment Type</label>
                            <select
                                name="employmentType"
                                value={formData.employmentType}
                                onChange={handleChange}
                            >
                                <option value="Salaried">Salaried</option>
                                <option value="Self-Employed">Self-Employed</option>
                                <option value="Student">Student</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label>Monthly Income (₹)</label>
                        <input
                            type="number"
                            name="income"
                            placeholder="e.g. 50000"
                            value={formData.income}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label>Monthly Expenses (₹)</label>
                        <input
                            type="number"
                            name="expenses"
                            placeholder="e.g. 20000"
                            value={formData.expenses}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label>Loan Type</label>
                        <select
                            name="loanType"
                            value={formData.loanType}
                            onChange={handleChange}
                        >
                            {Object.values(LOAN_TYPES).map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Desired Loan Amount (₹)</label>
                        <input
                            type="number"
                            name="loanAmount"
                            placeholder="e.g. 500000"
                            value={formData.loanAmount}
                            onChange={handleChange}
                            required
                            min="10000"
                        />
                    </div>

                    <div>
                        <label>Preferred Tenure (Years)</label>
                        <input
                            type="number"
                            name="loanTenure"
                            placeholder="e.g. 5"
                            value={formData.loanTenure}
                            onChange={handleChange}
                            required
                            min="1"
                            max="30"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Generate Analysis
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FinancialForm;
