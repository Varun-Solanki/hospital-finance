import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import {
  calculateHospitalMetrics,
  calculateDepartmentRankings,
  calculateDepartmentEfficiency,
  calculateProfitability,
  calculateCostPerPatient,
  calculateRevenuePerPatient,
  calculateBudgetUtilization,
  calculateApprovalRate,
} from '../utils/healthcareCalculations';
import { formatNumber, formatCurrency, formatPercentage } from '../utils/formatNumber';
import departmentsData from '../data/departments.json';
import insuranceData from '../data/insurance.json';
import metricsData from '../data/metrics.json';
import {
  TrendingUp,
  TrendingDown,
  Award,
  DollarSign,
  Users,
  Target,
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const Analytics = () => {
  const [departments, setDepartments] = useState([]);
  const [hospitalMetrics, setHospitalMetrics] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [insurance, setInsurance] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [showFormulas, setShowFormulas] = useState(false);

  useEffect(() => {
    setDepartments(departmentsData);
    setInsurance(insuranceData);
    setMetrics(metricsData);
    
    const calculatedMetrics = calculateHospitalMetrics(departmentsData);
    setHospitalMetrics(calculatedMetrics);
    
    const departmentRankings = calculateDepartmentRankings(departmentsData);
    setRankings(departmentRankings);
  }, []);

  if (!hospitalMetrics || !rankings.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  // Prepare chart data
  const efficiencyData = rankings.map((dept) => ({
    name: dept.name,
    efficiency: dept.efficiency.toFixed(1),
    profitability: dept.profitability.toFixed(1),
  }));

  const costRevenueData = rankings.map((dept) => ({
    name: dept.name,
    costPerPatient: Math.round(dept.costPerPatient),
    revenuePerPatient: Math.round(dept.revenuePerPatient),
  }));

  const utilizationData = departments.map((dept) => ({
    name: dept.name,
    utilization: calculateBudgetUtilization(dept.budget, dept.costOverruns),
    budget: dept.budget / 1000000, // Convert to millions
  }));

  const COLORS = ['#00f0ff', '#a855f7', '#ec4899', '#10b981'];

  // Get top performing department
  const topDepartment = rankings[0];
  const bottomDepartment = rankings[rankings.length - 1];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Analytics & Insights
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Advanced financial analytics and performance insights
        </p>
      </motion.div>

      {/* Hospital-wide Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Avg Cost Per Patient"
          value={formatCurrency(hospitalMetrics.avgCostPerPatient)}
          subtitle="Hospital-wide average"
          icon={<Users />}
          delay={0.1}
          color="blue"
        />
        <MetricCard
          title="Avg Revenue Per Patient"
          value={formatCurrency(hospitalMetrics.avgRevenuePerPatient)}
          subtitle="Hospital-wide average"
          icon={<DollarSign />}
          delay={0.2}
          color="green"
        />
        <MetricCard
          title="Avg Efficiency Score"
          value={`${hospitalMetrics.avgEfficiency.toFixed(1)}%`}
          subtitle="ROI across departments"
          icon={<TrendingUp />}
          delay={0.3}
          color="purple"
        />
        <MetricCard
          title="Avg Profitability"
          value={`${hospitalMetrics.avgProfitability.toFixed(1)}%`}
          subtitle="Net margin average"
          icon={<Target />}
          delay={0.4}
          color="pink"
        />
      </div>

      {/* Insurance Metrics */}
      {insurance && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <MetricCard
            title="Claim Approval Rate"
            value={`${calculateApprovalRate(
              insurance.claimStats.approved,
              insurance.claimStats.total
            ).toFixed(1)}%`}
            subtitle={`${insurance.claimStats.approved} of ${insurance.claimStats.total} claims`}
            delay={0.5}
            color="green"
          />
          <MetricCard
            title="Pending Claims"
            value={`${((insurance.claimStats.pending / insurance.claimStats.total) * 100).toFixed(1)}%`}
            subtitle={`${insurance.claimStats.pending} pending`}
            delay={0.6}
            color="purple"
          />
          <MetricCard
            title="Rejection Rate"
            value={`${((insurance.claimStats.rejected / insurance.claimStats.total) * 100).toFixed(1)}%`}
            subtitle={`${insurance.claimStats.rejected} rejected`}
            delay={0.7}
            color="pink"
          />
        </div>
      )}

      {/* Department Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-8 glass-card border-2 border-cyan-500/40 dark:border-cyan-500/60"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Department Performance Rankings
          </h2>
          <Award className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700/30 dark:border-neutral-700/20">
                <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Department
                </th>
                <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Efficiency
                </th>
                <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Profitability
                </th>
                <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Cost/Patient
                </th>
                <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Revenue/Patient
                </th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((dept, index) => (
                <motion.tr
                  key={dept.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className={`border-b border-neutral-700/20 dark:border-neutral-700/10 hover:bg-slate-200/10 dark:hover:bg-neutral-800/30 transition-colors ${
                    index === 0 ? 'bg-emerald-500/10 dark:bg-emerald-500/5' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <Award className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className="font-bold text-slate-900 dark:text-white">
                        #{dept.rank}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                    {dept.name}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-semibold ${
                        dept.efficiency > 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {dept.efficiency > 0 ? '+' : ''}
                      {dept.efficiency.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-semibold text-purple-400">
                      {dept.profitability.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-cyan-400 font-semibold">
                    {formatCurrency(dept.costPerPatient)}
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400 font-semibold">
                    {formatCurrency(dept.revenuePerPatient)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Efficiency vs Profitability */}
        <ChartCard title="Department Efficiency vs Profitability" delay={1.2}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(23, 23, 23, 0.95)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
                itemStyle={{ color: '#e2e8f0' }}
                labelStyle={{ color: '#e2e8f0' }}
                wrapperStyle={{ outline: 'none' }}
                formatter={(value) => `${value}%`}
              />
              <Legend />
              <Bar dataKey="efficiency" fill="#00f0ff" radius={[8, 8, 0, 0]} name="Efficiency %" />
              <Bar dataKey="profitability" fill="#a855f7" radius={[8, 8, 0, 0]} name="Profitability %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Cost vs Revenue Per Patient */}
        <ChartCard title="Cost vs Revenue Per Patient" delay={1.3}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `₹${value / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(23, 23, 23, 0.95)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
                itemStyle={{ color: '#e2e8f0' }}
                labelStyle={{ color: '#e2e8f0' }}
                wrapperStyle={{ outline: 'none' }}
                formatter={(value) => formatCurrency(value)}
              />
              <Legend />
              <Bar dataKey="costPerPatient" fill="#ec4899" radius={[8, 8, 0, 0]} name="Cost/Patient" />
              <Bar dataKey="revenuePerPatient" fill="#10b981" radius={[8, 8, 0, 0]} name="Revenue/Patient" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Budget Utilization */}
        <ChartCard title="Budget Utilization Rate" delay={1.4}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(23, 23, 23, 0.95)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
                itemStyle={{ color: '#e2e8f0' }}
                labelStyle={{ color: '#e2e8f0' }}
                wrapperStyle={{ outline: 'none' }}
                formatter={(value, name) => {
                  if (name === 'utilization') return `${value.toFixed(1)}%`;
                  return formatCurrency(value * 1000000);
                }}
              />
              <Legend />
              <Bar dataKey="utilization" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Utilization %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Efficiency Trend Line */}
        <ChartCard title="Department Efficiency Trend" delay={1.5}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(23, 23, 23, 0.95)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
                itemStyle={{ color: '#e2e8f0' }}
                labelStyle={{ color: '#e2e8f0' }}
                wrapperStyle={{ outline: 'none' }}
                formatter={(value) => `${value}%`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#00f0ff"
                strokeWidth={3}
                dot={{ fill: '#00f0ff', r: 5 }}
                activeDot={{ r: 8 }}
                name="Efficiency %"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="glass-card border-2 border-emerald-500/40 dark:border-emerald-500/60">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Top Performer
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">
                {topDepartment.name}
              </span>{' '}
              leads with an efficiency score of{' '}
              <span className="font-bold text-emerald-400">
                {topDepartment.efficiency.toFixed(1)}%
              </span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Revenue per patient: {formatCurrency(topDepartment.revenuePerPatient)} | 
              Profitability: {topDepartment.profitability.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="glass-card border-2 border-purple-500/40 dark:border-purple-500/60">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Improvement Opportunity
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">
                {bottomDepartment.name}
              </span>{' '}
              has an efficiency of{' '}
              <span className="font-bold text-purple-400">
                {bottomDepartment.efficiency.toFixed(1)}%
              </span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Potential improvement: Focus on cost optimization and patient volume increase
            </p>
          </div>
        </div>
      </motion.div>

      {/* Formulas Reference Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
        className="mt-8 glass-card border-2 border-purple-500/40 dark:border-purple-500/60"
      >
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="w-full flex items-center justify-between p-4 hover:bg-neutral-800/30 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Calculation Formulas Reference
            </h3>
          </div>
          {showFormulas ? (
            <ChevronUp className="w-5 h-5 text-purple-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-purple-400" />
          )}
        </button>

        {showFormulas && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-neutral-700/30 dark:border-neutral-700/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="p-4 bg-neutral-800/30 dark:bg-neutral-800/40 rounded-lg border border-cyan-500/30 dark:border-cyan-500/50 hover:border-cyan-500/50 dark:hover:border-cyan-500/70 transition-colors">
                  <h4 className="font-semibold text-cyan-400 mb-2">Department Efficiency Score</h4>
                  <p className="text-sm text-slate-400 mb-2">ROI calculation based on revenue vs budget</p>
                  <code className="text-xs text-slate-300 block bg-neutral-900/50 p-3 rounded font-mono">
                    Efficiency = ((Revenue - Budget) / Budget) × 100%
                  </code>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Positive values indicate profit, negative indicate loss
                  </p>
                </div>

                <div className="p-4 bg-neutral-800/30 dark:bg-neutral-800/40 rounded-lg border border-emerald-500/30 dark:border-emerald-500/50 hover:border-emerald-500/50 dark:hover:border-emerald-500/70 transition-colors">
                  <h4 className="font-semibold text-green-400 mb-2">Cost Per Patient</h4>
                  <p className="text-sm text-slate-400 mb-2">Average cost calculation per patient</p>
                  <code className="text-xs text-slate-300 block bg-neutral-900/50 p-3 rounded font-mono">
                    Cost/Patient = Budget / Patient Load
                  </code>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Lower values indicate better cost efficiency
                  </p>
                </div>

                <div className="p-4 bg-neutral-800/30 dark:bg-neutral-800/40 rounded-lg border border-purple-500/30 dark:border-purple-500/50 hover:border-purple-500/50 dark:hover:border-purple-500/70 transition-colors">
                  <h4 className="font-semibold text-purple-400 mb-2">Revenue Per Patient</h4>
                  <p className="text-sm text-slate-400 mb-2">Average revenue generated per patient</p>
                  <code className="text-xs text-slate-300 block bg-neutral-900/50 p-3 rounded font-mono">
                    Revenue/Patient = Revenue Generated / Patient Load
                  </code>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Higher values indicate better revenue generation
                  </p>
                </div>

                <div className="p-4 bg-neutral-800/30 dark:bg-neutral-800/40 rounded-lg border border-pink-500/30 dark:border-pink-500/50 hover:border-pink-500/50 dark:hover:border-pink-500/70 transition-colors">
                  <h4 className="font-semibold text-pink-400 mb-2">Profitability Index</h4>
                  <p className="text-sm text-slate-400 mb-2">Net profit margin percentage</p>
                  <code className="text-xs text-slate-300 block bg-neutral-900/50 p-3 rounded font-mono">
                    Profitability = ((Revenue - Budget) / Revenue) × 100%
                  </code>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Measures profit as percentage of revenue
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="p-4 bg-neutral-800/30 dark:bg-neutral-800/40 rounded-lg border border-cyan-500/30 dark:border-cyan-500/50 hover:border-cyan-500/50 dark:hover:border-cyan-500/70 transition-colors">
                  <h4 className="font-semibold text-cyan-400 mb-2">Budget Utilization Rate</h4>
                  <p className="text-sm text-slate-400 mb-2">Budget usage and overrun calculation</p>
                  <code className="text-xs text-slate-300 block bg-neutral-900/50 p-3 rounded font-mono">
                    Utilization = (Actual Spending / Budget) × 100%
                    <br />
                    <span className="text-slate-500">where:</span>
                    <br />
                    Actual Spending = Budget × (1 + Cost Overrun%)
                  </code>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Values above 100% indicate budget overrun
                  </p>
                </div>

                <div className="p-4 bg-neutral-800/30 dark:bg-neutral-800/40 rounded-lg border border-emerald-500/30 dark:border-emerald-500/50 hover:border-emerald-500/50 dark:hover:border-emerald-500/70 transition-colors">
                  <h4 className="font-semibold text-green-400 mb-2">Claim Approval Rate</h4>
                  <p className="text-sm text-slate-400 mb-2">Insurance claim success rate</p>
                  <code className="text-xs text-slate-300 block bg-neutral-900/50 p-3 rounded font-mono">
                    Approval Rate = (Approved Claims / Total Claims) × 100%
                  </code>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Higher rates indicate better claim processing
                  </p>
                </div>

                <div className="p-4 bg-neutral-800/30 dark:bg-neutral-800/40 rounded-lg border border-purple-500/30 dark:border-purple-500/50 hover:border-purple-500/50 dark:hover:border-purple-500/70 transition-colors">
                  <h4 className="font-semibold text-purple-400 mb-2">Hospital-wide Average</h4>
                  <p className="text-sm text-slate-400 mb-2">Aggregated metrics across all departments</p>
                  <code className="text-xs text-slate-300 block bg-neutral-900/50 p-3 rounded font-mono">
                    Avg Cost/Patient = Σ(Budget) / Σ(Patient Load)
                    <br />
                    Avg Revenue/Patient = Σ(Revenue) / Σ(Patient Load)
                    <br />
                    Avg Efficiency = Σ(Efficiency) / Number of Departments
                  </code>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Provides hospital-wide performance overview
                  </p>
                </div>

                <div className="p-4 bg-neutral-800/30 dark:bg-neutral-800/40 rounded-lg border border-pink-500/30 dark:border-pink-500/50 hover:border-pink-500/50 dark:hover:border-pink-500/70 transition-colors">
                  <h4 className="font-semibold text-pink-500 dark:text-pink-400 mb-2">Weighted Average Treatment Cost</h4>
                  <p className="text-sm text-slate-400 mb-2">Treatment cost with frequency weighting</p>
                  <code className="text-xs text-slate-300 block bg-neutral-900/50 p-3 rounded font-mono">
                    Weighted Avg = Σ(Cost × Weight) / Σ(Weights)
                  </code>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Accounts for treatment frequency in calculations
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-neutral-800/10 rounded-lg border border-neutral-700/30">
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-slate-300">Note:</span> All calculations are performed in real-time based on the latest data from the dashboard. 
                Formulas are standard healthcare financial metrics used for performance analysis and decision-making.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Analytics;

