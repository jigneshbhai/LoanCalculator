const calculateSimpleInterest = (formData) => {
  const {
    loanAmount,
    interestRate,
    duration,
    durationMultiplier,
    contribution,
    contributionMultiplier,
    contributionFrequency,
  } = formData;



  const P = +loanAmount;
  const r = interestRate / 100;
  const t = (duration * durationMultiplier.value) / 12;

  const SI = P * r * t;
  const FV = P + SI;

  const additionalContributions =
    contributionMultiplier * contribution * contributionFrequency.value * t;

  const totalContribution = additionalContributions + P;
  const totalProfit = FV - totalContribution;

  return {
    totalContribution,
    futureValue: FV,
    totalProfit,
    totalReturn: (SI / P) * 100,
    principal: P,
    additionalContributions,
  };
};

export default calculateSimpleInterest;
