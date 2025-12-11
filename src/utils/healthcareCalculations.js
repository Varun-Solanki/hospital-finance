// Healthcare Financial Calculations Utility

/**
 * Calculate Department Efficiency Score (ROI)
 * @param {number} revenue - Revenue generated
 * @param {number} budget - Budget allocated
 * @returns {number} Efficiency score as percentage
 */
export const calculateDepartmentEfficiency = (revenue, budget) => {
  if (budget === 0) return 0;
  return ((revenue - budget) / budget) * 100;
};

/**
 * Calculate Cost Per Patient
 * @param {number} budget - Department budget
 * @param {number} patientLoad - Number of patients
 * @returns {number} Cost per patient
 */
export const calculateCostPerPatient = (budget, patientLoad) => {
  if (patientLoad === 0) return 0;
  return budget / patientLoad;
};

/**
 * Calculate Revenue Per Patient
 * @param {number} revenue - Revenue generated
 * @param {number} patientLoad - Number of patients
 * @returns {number} Revenue per patient
 */
export const calculateRevenuePerPatient = (revenue, patientLoad) => {
  if (patientLoad === 0) return 0;
  return revenue / patientLoad;
};

/**
 * Calculate Department Profitability Index
 * @param {number} revenue - Revenue generated
 * @param {number} budget - Budget allocated
 * @returns {number} Profitability percentage
 */
export const calculateProfitability = (revenue, budget) => {
  if (revenue === 0) return 0;
  return ((revenue - budget) / revenue) * 100;
};

/**
 * Calculate Weighted Average Treatment Cost
 * @param {Array} treatments - Array of {cost, weight} objects
 * @returns {number} Weighted average cost
 */
export const calculateWeightedAverageCost = (treatments) => {
  if (!treatments || treatments.length === 0) return 0;
  
  const totalWeightedCost = treatments.reduce((sum, treatment) => {
    return sum + (treatment.cost * (treatment.weight || 1));
  }, 0);
  
  const totalWeight = treatments.reduce((sum, treatment) => {
    return sum + (treatment.weight || 1);
  }, 0);
  
  return totalWeight === 0 ? 0 : totalWeightedCost / totalWeight;
};

/**
 * Calculate Insurance Claim Approval Rate
 * @param {number} approved - Approved claims
 * @param {number} total - Total claims
 * @returns {number} Approval rate percentage
 */
export const calculateApprovalRate = (approved, total) => {
  if (total === 0) return 0;
  return (approved / total) * 100;
};

/**
 * Calculate Cost Efficiency Ratio
 * @param {number} budget - Budget allocated
 * @param {number} costOverrun - Cost overrun percentage
 * @returns {number} Efficiency ratio percentage
 */
export const calculateCostEfficiency = (budget, costOverrun) => {
  const actualSpending = budget * (1 + costOverrun / 100);
  return ((budget - (actualSpending - budget)) / budget) * 100;
};

/**
 * Calculate Hospital-wide Average Metrics
 * @param {Array} departments - Array of department objects
 * @returns {Object} Aggregated metrics
 */
export const calculateHospitalMetrics = (departments) => {
  if (!departments || departments.length === 0) {
    return {
      avgCostPerPatient: 0,
      avgRevenuePerPatient: 0,
      avgEfficiency: 0,
      avgProfitability: 0,
    };
  }

  const totals = departments.reduce(
    (acc, dept) => {
      acc.totalBudget += dept.budget;
      acc.totalRevenue += dept.revenueGenerated;
      acc.totalPatients += dept.patientLoad;
      acc.totalEfficiency += calculateDepartmentEfficiency(
        dept.revenueGenerated,
        dept.budget
      );
      acc.totalProfitability += calculateProfitability(
        dept.revenueGenerated,
        dept.budget
      );
      return acc;
    },
    {
      totalBudget: 0,
      totalRevenue: 0,
      totalPatients: 0,
      totalEfficiency: 0,
      totalProfitability: 0,
    }
  );

  return {
    avgCostPerPatient: totals.totalPatients > 0 
      ? totals.totalBudget / totals.totalPatients 
      : 0,
    avgRevenuePerPatient: totals.totalPatients > 0 
      ? totals.totalRevenue / totals.totalPatients 
      : 0,
    avgEfficiency: totals.totalEfficiency / departments.length,
    avgProfitability: totals.totalProfitability / departments.length,
  };
};

/**
 * Calculate Treatment Cost Savings (Private vs Government)
 * @param {number} privateCost - Private treatment cost
 * @param {number} govCost - Government treatment cost
 * @returns {Object} Savings data
 */
export const calculateTreatmentSavings = (privateCost, govCost) => {
  const savings = privateCost - govCost;
  const savingsPercent = privateCost > 0 ? (savings / privateCost) * 100 : 0;
  
  return {
    absoluteSavings: savings,
    percentageSavings: savingsPercent,
    costRatio: govCost / privateCost,
  };
};

/**
 * Calculate Insurance Coverage Impact
 * @param {number} treatmentCost - Base treatment cost
 * @param {number} coveragePercent - Insurance coverage percentage
 * @returns {Object} Coverage breakdown
 */
export const calculateCoverageImpact = (treatmentCost, coveragePercent) => {
  const coveredAmount = (treatmentCost * coveragePercent) / 100;
  const outOfPocket = treatmentCost - coveredAmount;
  const effectiveCost = outOfPocket;
  
  return {
    coveredAmount,
    outOfPocket,
    effectiveCost,
    coveragePercent,
    savings: coveredAmount,
  };
};

/**
 * Calculate Department Rankings
 * @param {Array} departments - Array of department objects
 * @returns {Array} Sorted departments with rankings
 */
export const calculateDepartmentRankings = (departments) => {
  if (!departments || departments.length === 0) return [];

  return departments
    .map((dept) => ({
      ...dept,
      efficiency: calculateDepartmentEfficiency(
        dept.revenueGenerated,
        dept.budget
      ),
      profitability: calculateProfitability(
        dept.revenueGenerated,
        dept.budget
      ),
      costPerPatient: calculateCostPerPatient(dept.budget, dept.patientLoad),
      revenuePerPatient: calculateRevenuePerPatient(
        dept.revenueGenerated,
        dept.patientLoad
      ),
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .map((dept, index) => ({
      ...dept,
      rank: index + 1,
    }));
};

/**
 * Calculate Budget Utilization Rate
 * @param {number} budget - Budget allocated
 * @param {number} costOverrun - Cost overrun percentage
 * @returns {number} Utilization rate percentage
 */
export const calculateBudgetUtilization = (budget, costOverrun) => {
  const actualSpending = budget * (1 + costOverrun / 100);
  return (actualSpending / budget) * 100;
};

