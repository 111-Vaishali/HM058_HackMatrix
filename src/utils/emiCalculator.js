/**
 * Calculates standard loan EMI details.
 * 
 * @param {number} principal - Loan amount
 * @param {number} annualInterestRate - Annual interest rate in percent (e.g. 5.5)
 * @param {number} tenureYears - Loan tenure in years
 * @returns {object} { monthlyEMI, totalInterest, totalPayment }
 */
export const calculateEMI = (principal, annualInterestRate, tenureYears) => {
    if (principal <= 0 || annualInterestRate < 0 || tenureYears <= 0) {
        return {
            monthlyEMI: 0,
            totalInterest: 0,
            totalPayment: 0
        };
    }

    const monthlyRate = annualInterestRate / 12 / 100;
    const months = tenureYears * 12;

    // Formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    let emi;
    if (monthlyRate === 0) {
        emi = principal / months;
    } else {
        emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
        monthlyEMI: parseFloat(emi.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2)),
        totalPayment: parseFloat(totalPayment.toFixed(2))
    };
};
