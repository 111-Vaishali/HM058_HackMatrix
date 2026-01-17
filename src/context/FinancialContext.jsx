import React, { createContext, useState, useContext } from 'react';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
    const [financialData, setFinancialData] = useState({
        income: '',
        expenses: '',
        debt: '',
        creditScore: ''
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
