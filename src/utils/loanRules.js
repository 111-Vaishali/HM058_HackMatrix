import { calculateEMI } from './emiCalculator';

export const LOAN_TYPES = {
    HOME: { id: 'HOME', name: 'Home Loan', rate: 8.50, maxTenure: 30 },
    PERSONAL: { id: 'PERSONAL', name: 'Personal Loan', rate: 11.50, maxTenure: 5 },
    EDUCATION: { id: 'EDUCATION', name: 'Education Loan', rate: 9.50, maxTenure: 15 }
};

export const checkEligibility = (data) => {
    // Extract values with safe defaults
    const income = parseFloat(data.income) || 0;
    const expenses = parseFloat(data.expenses) || 0;
    const age = parseFloat(data.age) || 0;
    const loanAmount = parseFloat(data.loanAmount) || 0;
    const tenure = parseFloat(data.loanTenure) || 0;
    const loanTypeKey = data.loanType || 'HOME';

    const typeRules = LOAN_TYPES[loanTypeKey] || LOAN_TYPES.HOME;

    // Calculate EMI based on mock rate rules
    const emiDetails = calculateEMI(loanAmount, typeRules.rate, tenure);
    const emi = emiDetails.monthlyEMI;

    const reasons = [];

    // Rule 1: Age Check
    if (age < 21 || age > 60) {
        reasons.push(`Applicant age (${age}) must be between 21 and 60.`);
    }

    // Rule 2: Tenure Check
    if (tenure > typeRules.maxTenure) {
        reasons.push(`Maximum tenure for ${typeRules.name} is ${typeRules.maxTenure} years.`);
    }

    // Rule 3: Income > 0 and Disposable Check
    const disposableIncome = Math.max(income - expenses, 0);
    if (disposableIncome <= 0) {
        reasons.push("Disposable income is zero or negative.");
    }

    // Rule 4: EMI Affordability (Standard Rule: EMI <= 40% of Income)
    const maxAffordableEMI = income * 0.40;
    if (emi > maxAffordableEMI) {
        reasons.push(`EMI (₹${emi}) exceeds 40% of monthly income. Limit: ₹${maxAffordableEMI}`);
    } else if (emi > disposableIncome) {
        reasons.push(`EMI (₹${emi}) exceeds current disposable income (₹${disposableIncome}).`);
    }

    return {
        isEligible: reasons.length === 0,
        reasons,
        emi,
        rate: typeRules.rate,
        totalInterest: emiDetails.totalInterest,
        totalPayment: emiDetails.totalPayment,
        loanType: typeRules.name
    };
};
