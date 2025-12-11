import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import { DollarSign, TrendingUp, Percent, FileCheck, Users } from 'lucide-react';
import metricsData from '../data/metrics.json';
import trendsData from '../data/trends.json';
import departmentsData from '../data/departments.json';
import { calculateHospitalMetrics } from '../utils/healthcareCalculations';
import { formatCurrency } from '../utils/formatNumber';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [trends, setTrends] = useState(null);
  const [hospitalMetrics, setHospitalMetrics] = useState(null);

  useEffect(() => {
    setMetrics(metricsData);
    setTrends(trendsData);
    const calculatedMetrics = calculateHospitalMetrics(departmentsData);
    setHospitalMetrics(calculatedMetrics);
  }, []);

  if (!metrics || !trends || !hospitalMetrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  const COLORS = ['#00f0ff', '#a855f7', '#ec4899', '#10b981'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive financial overview and analytics
        </p>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Spending"
          value={metrics.totalSpending}
          icon={<DollarSign />}
          delay={0.1}
          color="blue"
        />
        <MetricCard
          title="Total Revenue"
          value={metrics.totalRevenue}
          icon={<TrendingUp />}
          delay={0.2}
          color="green"
        />
        <MetricCard
          title="Profit Margin"
          value={`${metrics.profitMargin}%`}
          icon={<Percent />}
          delay={0.3}
          color="purple"
        />
        <MetricCard
          title="Claims Processed"
          value={metrics.insuranceClaimsProcessed}
          icon={<FileCheck />}
          delay={0.4}
          color="pink"
        />
      </div>

      {/* Additional Analytics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard
          title="Avg Cost Per Patient"
          value={formatCurrency(hospitalMetrics.avgCostPerPatient)}
          subtitle="Hospital-wide average"
          icon={<Users />}
          delay={0.5}
          color="blue"
        />
        <MetricCard
          title="Avg Revenue Per Patient"
          value={formatCurrency(hospitalMetrics.avgRevenuePerPatient)}
          subtitle="Hospital-wide average"
          icon={<TrendingUp />}
          delay={0.6}
          color="green"
        />
        <MetricCard
          title="Avg Efficiency Score"
          value={`${hospitalMetrics.avgEfficiency.toFixed(1)}%`}
          subtitle="ROI across departments"
          icon={<Percent />}
          delay={0.7}
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Yearly Spending Line Chart */}
        <ChartCard title="Yearly Spending Trend" delay={0.5}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends.yearlySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis
                dataKey="year"
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `₹${value / 10000000}Cr`}
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
                formatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#00f0ff"
                strokeWidth={3}
                dot={{ fill: '#00f0ff', r: 5 }}
                activeDot={{ r: 8 }}
                name="Spending"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Department Budget Bar Chart */}
        <ChartCard title="Department Budget Allocation" delay={0.6}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trends.departmentBudget}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis
                dataKey="department"
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `₹${value}Cr`}
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
                formatter={(value) => `₹${value}Cr`}
              />
              <Legend />
              <Bar dataKey="amount" fill="#a855f7" radius={[8, 8, 0, 0]} name="Budget (Cr)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Settlement Ratios Doughnut Chart */}
        <ChartCard title="Claim Settlement Ratios" delay={0.7}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trends.settlementRatios}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {trends.settlementRatios.map((entry, index) => (
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
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Cost Breakdown Pie Chart */}
        <ChartCard title="Cost Breakdown" delay={0.8}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trends.costBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {trends.costBreakdown.map((entry, index) => (
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
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;

