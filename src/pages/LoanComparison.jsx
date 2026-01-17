import { Link } from 'react-router-dom';
import { useFinancial } from '../context/FinancialContext';
import { calculateEMI } from '../utils/emiCalculator';
import { indianLoanProducts } from '../data/loanProducts';
import { formatINR } from '../utils/formatters';

const LoanComparison = () => {
    const { financialData } = useFinancial();

    // Parse data
    const income = parseFloat(financialData.income) || 0;
    const expenses = parseFloat(financialData.expenses) || 0;
    const disposableIncome = Math.max(income - expenses, 0);

    // Helper to calculate Loan Amount based on affordable EMI
    // Formula: P = (EMI / r) * [1 - (1 + r)^(-n)]
    const calculateLoanLimit = (emi, annualRate, months) => {
        if (annualRate === 0) return emi * months;
        const r = annualRate / 100 / 12;
        return (emi / r) * (1 - Math.pow(1 + r, -months));
    };

    // Strategies based on Indian Loan Market
    const strategies = [
        {
            name: "Conservative / Low Risk",
            loanRef: indianLoanProducts.find(p => p.id === 'sbi-home'),
            emiPercent: 0.25,
            tenureYears: 20, // Typical home loan
            desc: "Long-term stability with lower monthly outflow.",
            type: "Home"
        },
        {
            name: "Balanced Plan",
            loanRef: indianLoanProducts.find(p => p.id === 'icici-auto'),
            emiPercent: 0.35,
            tenureYears: 5, // Typical auto loan
            desc: "Balanced repayment for mid-sized asset financing.",
            recommended: true,
            type: "Auto"
        },
        {
            name: "Aggressive Plan",
            loanRef: indianLoanProducts.find(p => p.id === 'hdfc-personal'),
            emiPercent: 0.50,
            tenureYears: 3, // Personal loan often short
            desc: "Quick debt clearance with high monthly payments.",
            type: "Personal"
        }
    ];

    const plans = strategies.map(strategy => {
        const ref = strategy.loanRef;
        // Use average of min/max rate for calculation
        const avgRate = (ref.minRate + ref.maxRate) / 2;
        // tenure in months
        const months = strategy.tenureYears * 12;

        const affordableEMI = disposableIncome * strategy.emiPercent;
        const maxLoanAmount = calculateLoanLimit(affordableEMI, avgRate, months);
        const emiDetails = calculateEMI(maxLoanAmount, avgRate, strategy.tenureYears);

        // Risk check
        const dtiInfo = (affordableEMI / income) * 100;
        const riskLabel = dtiInfo > 40 ? "High Risk" : "Affordable";
        const riskColor = dtiInfo > 40 ? "var(--accent)" : "var(--secondary)";

        return {
            ...strategy,
            details: emiDetails,
            amount: maxLoanAmount,
            rate: avgRate,
            months,
            riskLabel,
            riskColor,
            provider: ref.provider
        };
    });

    if (disposableIncome <= 1000) {
        return (
            <div className="container animate-fade-in" style={{ paddingTop: '3rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem' }}>Loan Options</h2>
                <div className="glass" style={{ padding: '3rem', borderRadius: '1rem' }}>
                    <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Insufficient Disposable Income</h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Based on your income of {formatINR(income)} and expenses of {formatINR(expenses)}, your disposable income is too low.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        Please <Link to="/financial-form" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>update your financial profile</Link>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
                <div>
                    <h2>Personalized Plans (India)</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Based on disposable income: <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{formatINR(disposableIncome)}/mo</span>
                    </p>
                </div>
                <Link to="/financial-form" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Update Data</Link>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                {plans.map((plan, idx) => (
                    <div key={idx} className="glass" style={{
                        padding: '2rem', borderRadius: '1rem',
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        alignItems: 'center', gap: '1.5rem',
                        border: plan.recommended ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
                        position: 'relative'
                    }}>
                        {plan.recommended &&
                            <div style={{
                                position: 'absolute', top: '-10px', left: '2rem',
                                background: 'var(--primary)', padding: '0.25rem 0.75rem',
                                borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'
                            }}>
                                RECOMMENDED
                            </div>
                        }

                        <div style={{ minWidth: '200px' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{plan.name}</h3>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{plan.provider}</div>
                            <div style={{
                                display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 0.5rem',
                                borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                                border: `1px solid ${plan.riskColor}`, color: plan.riskColor
                            }}>
                                {plan.riskLabel}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>{plan.desc}</div>
                        </div>

                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Qualifying Amount</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {formatINR(plan.amount)}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Total Interest: {formatINR(plan.details.totalInterest)}
                            </div>
                        </div>

                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Monthly Payment</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                                {formatINR(plan.details.monthlyEMI)}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Total Pay: {formatINR(plan.details.totalPayment)}
                            </div>
                        </div>

                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Terms</div>
                            <div style={{ fontSize: '1.1rem' }}>{plan.tenureYears} Years @ {plan.rate}%</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Type: {plan.type}
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <button className={plan.recommended ? "btn btn-primary" : "btn btn-secondary"}>
                                Select Plan
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <footer style={{ textAlign: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '2rem', paddingBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <p>Loan details shown are indicative and for educational purposes only. Actual loan terms may vary by lender.</p>
                <p>@ 2026 Credit Health Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LoanComparison;
