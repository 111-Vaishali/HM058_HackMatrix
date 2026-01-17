export const generateCreditHistory = (financialData) => {
    // defaults
    const income = parseFloat(financialData.income) || 50000;
    const debt = parseFloat(financialData.debt) || 0; // The loan amount or existing debt
    const existingScore = parseInt(financialData.creditScore) || 750;

    // Calculate DTI
    const dti = income > 0 ? (debt / income) * 100 : 0;

    const history = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    let currentScore = existingScore;

    // Simulate past 6 months to reach current score or simulate future based on it
    // Let's simulate a trend leading UP TO the current moment to show context

    // Base fluctuation
    let volatility = 10;
    if (dti > 40) volatility = 20;

    // Trend direction based on health
    let trend = 0;
    if (dti < 30) trend = 5;       // Improving
    else if (dti > 50) trend = -10; // Declining
    else trend = 2;                 // Stable/Slow growth

    // If Salary is high, bonus stability
    if (financialData.employmentType === 'Salaried') trend += 2;

    // Generate reverse history so the last point matches current score roughly
    for (let i = 5; i >= 0; i--) {
        const month = months[i];

        let change = trend + (Math.random() * volatility - (volatility / 2));
        change = Math.floor(change);

        // Calculate score for this month relative to the "final" target, 
        // effectively working backwards to create a history that arrives at Current Score.
        // But for display, we want the array to be chronological.
        // So let's actually start from (Current - TotalChange) and work forward.

        // easier: Start from a hypothetical score 6 months ago
        // If trend is positive (+5/mo), start 30 points lower.
    }

    // Let's rebuild: Start 6 months ago at (CurrentScore - (Trend * 6))
    let startScore = existingScore - (trend * 6);
    // Add some noise
    startScore += Math.floor(Math.random() * 20 - 10);

    // Clamp
    startScore = Math.max(300, Math.min(900, startScore));

    let simScore = startScore;

    months.forEach((m, index) => {
        // Apply monthly change
        // Random fluctuation specific to this month
        const monthlyFluctuation = Math.floor(Math.random() * 10 - 2);
        const monthlyChange = trend + monthlyFluctuation;

        simScore += monthlyChange;
        simScore = Math.max(300, Math.min(900, simScore));

        let reason = "Routine payments";
        if (monthlyChange > 5) reason = "Low credit utilization";
        if (monthlyChange > 10) reason = "Debt repayment milestone";
        if (monthlyChange < 0) reason = "High utilization or inquiry";
        if (dti > 50 && monthlyChange < 0) reason = "High Debt-to-Income ratio";

        history.push({
            month: m,
            score: simScore,
            change: monthlyChange,
            reason
        });
    });

    return history;
};

export const getScoreStatus = (score) => {
    if (score >= 750) return { label: "Excellent", color: "#4ade80" };
    if (score >= 700) return { label: "Good", color: "#a3e635" };
    if (score >= 650) return { label: "Fair", color: "#facc15" };
    if (score >= 550) return { label: "Poor", color: "#fb923c" };
    return { label: "Critical", color: "#f87171" };
};
