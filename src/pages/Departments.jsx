import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatNumber, formatPercentage } from '../utils/formatNumber';
import departmentsData from '../data/departments.json';

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setDepartments(departmentsData);
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Departments
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Financial overview of all hospital departments
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card border-2 border-cyan-500/40 dark:border-cyan-500/60 hover:shadow-lg dark:hover:shadow-neutral-950/60 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {dept.name}
              </h3>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">
                {dept.name.charAt(0)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Budget:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatNumber(dept.budget)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Cost Overruns:</span>
                <span className="font-semibold text-red-400">
                  {formatPercentage(dept.costOverruns)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Patient Load:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {dept.patientLoad.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-neutral-700/30 dark:border-neutral-700/20">
                <span className="text-slate-600 dark:text-slate-400">Revenue Generated:</span>
                <span className="font-bold text-lg text-emerald-400">
                  {formatNumber(dept.revenueGenerated)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Budget Utilization</span>
                  <span className="text-slate-500">
                    {((dept.budget / dept.revenueGenerated) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700/30 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min((dept.budget / dept.revenueGenerated) * 100, 100)}%`,
                    }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                    className="h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Departments;

