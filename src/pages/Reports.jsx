import { motion } from 'framer-motion';
import { FileText, Calendar, Users, Shield } from 'lucide-react';

const Reports = () => {
  const colorClasses = {
    cyan: {
      border: 'border-cyan-500/40 dark:border-cyan-500/60',
      shadow: 'hover:shadow-lg dark:hover:shadow-neutral-950/60',
      text: 'text-cyan-500 dark:text-cyan-400',
      textHover: 'group-hover:text-cyan-400 dark:group-hover:text-cyan-300',
    },
    purple: {
      border: 'border-purple-500/40 dark:border-purple-500/60',
      shadow: 'hover:shadow-lg dark:hover:shadow-neutral-950/60',
      text: 'text-purple-500 dark:text-purple-400',
      textHover: 'group-hover:text-purple-400 dark:group-hover:text-purple-300',
    },
    pink: {
      border: 'border-pink-500/40 dark:border-pink-500/60',
      shadow: 'hover:shadow-lg dark:hover:shadow-neutral-950/60',
      text: 'text-pink-500 dark:text-pink-400',
      textHover: 'group-hover:text-pink-400 dark:group-hover:text-pink-300',
    },
    green: {
      border: 'border-emerald-500/40 dark:border-emerald-500/60',
      shadow: 'hover:shadow-lg dark:hover:shadow-neutral-950/60',
      text: 'text-emerald-500 dark:text-emerald-400',
      textHover: 'group-hover:text-emerald-400 dark:group-hover:text-emerald-300',
    },
  };

  const reports = [
    {
      id: 1,
      title: 'Annual Financial Report',
      description: 'Comprehensive annual financial overview with all departments, costs, and revenue analysis.',
      icon: <FileText className="w-8 h-8" />,
      color: 'cyan',
      date: '2023',
    },
    {
      id: 2,
      title: 'Monthly Summary',
      description: 'Monthly breakdown of expenses, revenue, and key financial metrics.',
      icon: <Calendar className="w-8 h-8" />,
      color: 'purple',
      date: 'December 2023',
    },
    {
      id: 3,
      title: 'Patient Flow Analysis',
      description: 'Detailed analysis of patient admissions, treatments, and department utilization.',
      icon: <Users className="w-8 h-8" />,
      color: 'pink',
      date: 'Q4 2023',
    },
    {
      id: 4,
      title: 'Insurance Summary',
      description: 'Complete insurance claims report with approval rates and coverage statistics.',
      icon: <Shield className="w-8 h-8" />,
      color: 'green',
      date: '2023',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Reports
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Access comprehensive financial and operational reports
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`glass-card border-2 ${colorClasses[report.color].border} ${colorClasses[report.color].shadow} transition-all cursor-pointer group`}
          >
            <div className="flex items-start gap-4">
              <div className={`${colorClasses[report.color].text} group-hover:scale-110 transition-transform`}>
                {report.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {report.title}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-neutral-800/40 px-2 py-1 rounded">
                    {report.date}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {report.description}
                </p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className={`${colorClasses[report.color].text} font-medium flex items-center gap-2 ${colorClasses[report.color].textHover} transition-colors`}
                >
                  View Report
                  <span className="text-lg">→</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass-card border-2 border-neutral-400/30 dark:border-neutral-600/20"
      >
        <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
          Report Generation
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Reports are generated automatically based on the latest data from the dashboard. 
          All reports include comprehensive analytics, charts, and detailed breakdowns. 
          For custom reports or specific date ranges, please contact the administration.
        </p>
      </motion.div>
    </div>
  );
};

export default Reports;

