import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/formatNumber';
import costsData from '../data/costs.json';
import ChartCard from '../components/ChartCard';

const Costs = () => {
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  useEffect(() => {
    setTreatments(costsData.treatments);
    if (costsData.treatments.length > 0) {
      setSelectedTreatment(costsData.treatments[0]);
    }
  }, []);

  const comparisonData = treatments.map((treatment) => ({
    name: treatment.name,
    Private: treatment.cost,
    Government: treatment.govCost,
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Treatment Costs
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Compare private and government treatment costs
        </p>
      </motion.div>

      {/* Treatment Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Select Treatment for Details:
        </label>
        <select
          value={selectedTreatment?.id || ''}
          onChange={(e) => {
            const treatment = treatments.find((t) => t.id === parseInt(e.target.value));
            setSelectedTreatment(treatment);
          }}
          className="w-full md:w-64 px-4 py-2 glass border-2 border-cyan-500/40 dark:border-cyan-500/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 text-slate-900 dark:text-white"
        >
          {treatments.map((treatment) => (
            <option key={treatment.id} value={treatment.id}>
              {treatment.name}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Selected Treatment Details */}
      {selectedTreatment && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          <div className="glass-card border-2 border-cyan-500/40 dark:border-cyan-500/60">
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
              {selectedTreatment.name}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Private Cost:</span>
                <span className="font-bold text-lg text-purple-400">
                  {formatCurrency(selectedTreatment.cost)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Government Cost:</span>
                <span className="font-bold text-lg text-cyan-400">
                  {formatCurrency(selectedTreatment.govCost)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-neutral-700/30 dark:border-neutral-700/20">
                <span className="text-slate-600 dark:text-slate-400">Savings:</span>
                <span className="font-bold text-lg text-emerald-400">
                  {formatCurrency(selectedTreatment.cost - selectedTreatment.govCost)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Savings %:</span>
                <span className="font-bold text-lg text-emerald-400">
                  {(
                    ((selectedTreatment.cost - selectedTreatment.govCost) /
                      selectedTreatment.cost) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card border-2 border-purple-500/40 dark:border-purple-500/60">
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
              Cost Comparison Chart
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[selectedTreatment]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
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
                <Bar dataKey="cost" fill="#a855f7" radius={[8, 8, 0, 0]} name="Private" />
                <Bar dataKey="govCost" fill="#00f0ff" radius={[8, 8, 0, 0]} name="Government" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* All Treatments Comparison Chart */}
      <ChartCard title="All Treatments - Private vs Government Cost Comparison" delay={0.3}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
            <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
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
            <Bar dataKey="Private" fill="#a855f7" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Government" fill="#00f0ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Treatments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 glass-card border-2 border-pink-500/40 dark:border-pink-500/60"
      >
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          All Treatments
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700/30 dark:border-neutral-700/20">
                <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Treatment
                </th>
                <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Private Cost
                </th>
                <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Government Cost
                </th>
                <th className="text-right py-3 px-4 text-slate-600 dark:text-slate-400 font-semibold">
                  Savings
                </th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment, index) => (
                <motion.tr
                  key={treatment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="border-b border-neutral-700/20 dark:border-neutral-700/10 hover:bg-slate-200/10 dark:hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                    {treatment.name}
                  </td>
                  <td className="py-3 px-4 text-right text-purple-400 font-semibold">
                    {formatCurrency(treatment.cost)}
                  </td>
                  <td className="py-3 px-4 text-right text-cyan-400 font-semibold">
                    {formatCurrency(treatment.govCost)}
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400 font-semibold">
                    {formatCurrency(treatment.cost - treatment.govCost)}
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

export default Costs;

