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
    const loanAmount = parseFloat(financialData.debt) || 100000; // Default to 1L if 0 to show example
    const disposableIncome = Math.max(income - expenses, 0);

    // Strategies based on Indian Loan Market
    const strategies = [
        {
            name: "Low Risk Plan",
            loanRef: indianLoanProducts.find(p => p.id === 'sbi-home'),
            tenureYears: 15,
            desc: "Lowest monthly commitment over a longer tenure.",
            type: "Secured"
        },
        {
            name: "Balanced Plan",
            loanRef: indianLoanProducts.find(p => p.id === 'sbi-education'),
            tenureYears: 7,
            desc: "Standard education financing.",
            type: "Education"
        },
        {
            name: "Aggressive Plan",
            loanRef: indianLoanProducts.find(p => p.id === 'hdfc-personal'),
            tenureYears: 3,
            desc: "Pay off quickly but with higher monthly outflow.",
            type: "Personal"
        }
    ];

    // Generate Plans
    const plans = strategies.map(strategy => {
        const ref = strategy.loanRef;
        const avgRate = (ref.minRate + ref.maxRate) / 2;

        // Calculate EMI for the specific Loan Amount
        const emiDetails = calculateEMI(loanAmount, avgRate, strategy.tenureYears);

        // Affordability Check
        const emiRatio = (emiDetails.monthlyEMI / income) * 100;
        const affordable = emiDetails.monthlyEMI <= disposableIncome;

        let riskLabel = "Affordable";
        let riskColor = "var(--secondary)"; // Greenish

        if (!affordable || emiRatio > 40) {
            riskLabel = "High Risk";
            riskColor = "var(--accent)"; // Reddish
        } else if (emiRatio > 30) {
            riskLabel = "Moderate Risk";
            riskColor = "#facc15"; // Yellow
        }

        return {
            ...strategy,
            rate: avgRate,
            details: emiDetails,
            riskLabel,
            riskColor,
            provider: ref.provider
        };
    });

    // Determine Recommended Plan (Lowest EMI that is Affordable, or just Lowest EMI)
    // We'll mark the one with lowest EMI as recommended for "Affordability"
    const sortedByEMI = [...plans].sort((a, b) => a.details.monthlyEMI - b.details.monthlyEMI);
    const recommendedPlanName = sortedByEMI[0].name;

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
                <div>
                    <h2>Loan Comparison</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        For Principal Amount: <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{formatINR(loanAmount)}</span>
                    </p>
                </div>
                <Link to="/financial-form" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Update Data</Link>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                {plans.map((plan, idx) => {
                    const isRecommended = plan.name === recommendedPlanName;

                    return (
                        <div key={idx} className="glass" style={{
                            padding: '2rem', borderRadius: '1rem',
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            alignItems: 'center', gap: '1.5rem',
                            border: isRecommended ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
                            position: 'relative'
                        }}>
                            {isRecommended &&
                                <div style={{
                                    position: 'absolute', top: '-10px', left: '2rem',
                                    background: 'var(--primary)', padding: '0.25rem 0.75rem',
                                    borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'
                                }}>
                                    RECOMMENDED
                                </div>
                            }

                            <div style={{ minWidth: '200px' }}>
                                <h3 style={{ marginBottom: '0.25rem' }}>{plan.name}</h3>
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
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Interest Rate</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                    {plan.rate}%
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    Tenure: {plan.tenureYears} Years
                                </div>
                            </div>

                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Monthly EMI</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                    {formatINR(plan.details.monthlyEMI)}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    Total Interest: {formatINR(plan.details.totalInterest)}
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <button className={isRecommended ? "btn btn-primary" : "btn btn-secondary"}>
                                    Select Plan
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <footer style={{ textAlign: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '2rem', paddingBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <p>Loan details are indicative and for educational purposes only. Actual loan terms may vary by lender.</p>
                <p>Values calculated for {formatINR(loanAmount)} principal.</p>
            </footer>
        </div>
    );
};

export default LoanComparison;
