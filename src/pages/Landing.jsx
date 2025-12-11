import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, BarChart3 } from 'lucide-react';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const featureColorClasses = {
    cyan: {
      border: 'border-cyan-500/40 dark:border-cyan-500/60',
      shadow: 'hover:shadow-lg dark:hover:shadow-neutral-950/60',
      text: 'text-cyan-500 dark:text-cyan-400',
    },
    purple: {
      border: 'border-purple-500/40 dark:border-purple-500/60',
      shadow: 'hover:shadow-lg dark:hover:shadow-neutral-950/60',
      text: 'text-purple-500 dark:text-purple-400',
    },
    pink: {
      border: 'border-pink-500/40 dark:border-pink-500/60',
      shadow: 'hover:shadow-lg dark:hover:shadow-neutral-950/60',
      text: 'text-pink-500 dark:text-pink-400',
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Hospital Finance
            <br />
            Intelligence Dashboard
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto"
          >
            Advanced analytics and insights for hospital financial management.
            Real-time data visualization and comprehensive reporting.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
              >
                View Dashboard
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/departments">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-card border-2 border-cyan-500/40 dark:border-cyan-500/60 text-cyan-500 dark:text-cyan-400 rounded-xl font-semibold hover:shadow-lg dark:hover:shadow-neutral-950/60 transition-all"
              >
                Departments
              </motion.button>
            </Link>
            <Link to="/insurance">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-card border-2 border-purple-500/40 dark:border-purple-500/60 text-purple-500 dark:text-purple-400 rounded-xl font-semibold hover:shadow-lg dark:hover:shadow-neutral-950/60 transition-all"
              >
                Insurance Reports
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Real-time Analytics',
                description: 'Track financial metrics and trends in real-time',
                color: 'cyan',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Insurance Management',
                description: 'Monitor claims, approvals, and coverage rates',
                color: 'purple',
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Comprehensive Reports',
                description: 'Generate detailed financial reports and insights',
                color: 'pink',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`glass-card border-2 ${featureColorClasses[feature.color].border} ${featureColorClasses[feature.color].shadow} transition-all`}
              >
                <div className={`${featureColorClasses[feature.color].text} mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;

