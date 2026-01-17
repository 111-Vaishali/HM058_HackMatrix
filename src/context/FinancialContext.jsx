import React, { createContext, useState, useContext } from 'react';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
    const [financialData, setFinancialData] = useState({
        income: '',
        expenses: '',
        debt: '', // Kept for backward compatibility, represents total existing debt
        loanAmount: '',
        loanTenure: '',
        loanType: 'HOME', // Default
        employmentType: 'Salaried',
        age: '',
        creditScore: '',
        creditHistory: [], // Stores mock history objects { month: 'Jan', score: 750, reason: '...' }
        eligibilityResult: null // Store calculated result here
    });

    const updateFinancialData = (newData) => {
        setFinancialData((prevData) => ({
            ...prevData,
            ...newData
        }));
    };

    return (
        <FinancialContext.Provider value={{ financialData, updateFinancialData }}>
            {children}
        </FinancialContext.Provider>
    );
};

export const useFinancial = () => {
    const context = useContext(FinancialContext);
    if (!context) {
        throw new Error('useFinancial must be used within a FinancialProvider');
    }
    return context;
};
