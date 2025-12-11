import { motion } from 'framer-motion';
import { formatNumber, formatPercentage } from '../utils/formatNumber';

const MetricCard = ({ title, value, subtitle, icon, delay = 0, color = 'blue' }) => {
  const colorClasses = {
    blue: 'border-cyan-500/40 dark:border-cyan-500/60',
    purple: 'border-purple-500/40 dark:border-purple-500/60',
    pink: 'border-pink-500/40 dark:border-pink-500/60',
    green: 'border-emerald-500/40 dark:border-emerald-500/60',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`glass-card border-2 ${colorClasses[color]} hover:shadow-lg dark:hover:shadow-neutral-950/60 transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {typeof value === 'number' && value > 1000 ? formatNumber(value) : value}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-3xl opacity-80">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MetricCard;

