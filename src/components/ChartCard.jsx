import { motion } from 'framer-motion';

const ChartCard = ({ title, children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`glass-card ${className}`}
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        {title}
      </h3>
      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default ChartCard;

