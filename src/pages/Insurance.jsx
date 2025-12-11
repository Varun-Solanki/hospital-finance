import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import { formatNumber, formatCurrency } from '../utils/formatNumber';
import insuranceData from '../data/insurance.json';
import costsData from '../data/costs.json';
import { Shield, CheckCircle, Clock, XCircle, DollarSign, AlertTriangle } from 'lucide-react';

const Insurance = () => {
  const [insurance, setInsurance] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [coverage, setCoverage] = useState(null);

  useEffect(() => {
    setInsurance(insuranceData);
    setTreatments(costsData.treatments);
  }, []);

  const calculateCoverage = () => {
    if (!selectedTreatment || !insurance) return;
    const coveragePercent = insurance.claimCoverage[selectedTreatment] || 0;
    const treatment = treatments.find((t) => t.name === selectedTreatment);
    if (treatment) {
      const coveredAmount = (treatment.cost * coveragePercent) / 100;
      const outOfPocket = treatment.cost - coveredAmount;
      setCoverage({
        percent: coveragePercent,
        coveredAmount,
        outOfPocket,
        treatmentCost: treatment.cost,
      });
    }
  };

  useEffect(() => {
    calculateCoverage();
  }, [selectedTreatment, insurance, treatments]);

  if (!insurance) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  const claimStats = [
    { type: 'Approved', value: insurance.claimStats.approved, color: '#10b981' },
    { type: 'Pending', value: insurance.claimStats.pending, color: '#f59e0b' },
    { type: 'Rejected', value: insurance.claimStats.rejected, color: '#ef4444' },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Insurance & Claims
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Insurance claims management and coverage analysis
        </p>
      </motion.div>

      {/* Claim Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Claims"
          value={insurance.claimStats.total}
          icon={<Shield />}
          delay={0.1}
          color="blue"
        />
        <MetricCard
          title="Approved"
          value={insurance.claimStats.approved}
          icon={<CheckCircle />}
          delay={0.2}
          color="green"
        />
        <MetricCard
          title="Pending"
          value={insurance.claimStats.pending}
          icon={<Clock />}
          delay={0.3}
          color="purple"
        />
        <MetricCard
          title="Rejected"
          value={insurance.claimStats.rejected}
          icon={<XCircle />}
          delay={0.4}
          color="pink"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MetricCard
          title="Average Claim Amount"
          value={formatCurrency(insurance.claimStats.averageAmount)}
          delay={0.5}
          color="blue"
        />
        <MetricCard
          title="Fraud Score"
          value={`${insurance.claimStats.fraudScore}/10`}
          subtitle="Lower is better"
          icon={<AlertTriangle />}
          delay={0.6}
          color={insurance.claimStats.fraudScore > 5 ? 'pink' : 'green'}
        />
      </div>

      {/* Claim Status Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Claim Status Distribution" delay={0.7}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={claimStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {claimStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
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
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Claim Estimator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="glass-card border-2 border-purple-500/40 dark:border-purple-500/60 hover:shadow-lg dark:hover:shadow-neutral-950/60"
        >
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
            Claim Coverage Estimator
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Select Treatment:
              </label>
              <select
                value={selectedTreatment}
                onChange={(e) => setSelectedTreatment(e.target.value)}
                className="w-full px-4 py-2 glass border-2 border-purple-500/40 dark:border-purple-500/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-slate-900 dark:text-white"
              >
                <option value="">Select a treatment</option>
                {treatments.map((treatment) => (
                  <option key={treatment.id} value={treatment.name}>
                    {treatment.name}
                  </option>
                ))}
              </select>
            </div>

            {coverage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 pt-4 border-t border-neutral-700/30 dark:border-neutral-700/20"
              >
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Treatment Cost:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(coverage.treatmentCost)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Coverage:</span>
                  <span className="font-bold text-lg text-cyan-400">
                    {coverage.percent}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Covered Amount:</span>
                  <span className="font-bold text-lg text-emerald-400">
                    {formatCurrency(coverage.coveredAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-neutral-700/20 dark:border-neutral-700/10">
                  <span className="text-slate-600 dark:text-slate-400">Out of Pocket:</span>
                  <span className="font-bold text-xl text-purple-400">
                    {formatCurrency(coverage.outOfPocket)}
                  </span>
                </div>

                {/* Coverage Bar */}
                <div className="mt-4">
                  <div className="w-full bg-slate-700/30 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${coverage.percent}%` }}
                      transition={{ delay: 0.2, duration: 1 }}
                      className="h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Coverage Rates Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-card border-2 border-cyan-500/40 dark:border-cyan-500/60"
      >
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Treatment Coverage Rates
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700/30 dark:border-neutral-700/20">
                <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Treatment
                </th>
                <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Coverage %
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(insurance.claimCoverage).map(([treatment, coverage], index) => (
                <motion.tr
                  key={treatment}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.05 }}
                  className="border-b border-neutral-700/20 dark:border-neutral-700/10 hover:bg-slate-200/10 dark:hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                    {treatment}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-bold text-cyan-400">{coverage}%</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Insurance;

