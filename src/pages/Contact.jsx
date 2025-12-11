import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Get in touch with our team for support or inquiries
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-card border-2 border-cyan-500/40 dark:border-cyan-500/60">
            <div className="flex items-start gap-4">
              <div className="text-cyan-500 dark:text-cyan-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  finance@hospital.com
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card border-2 border-purple-500/40 dark:border-purple-500/60">
            <div className="flex items-start gap-4">
              <div className="text-purple-500 dark:text-purple-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Phone</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  +91 123 456 7890
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card border-2 border-pink-500/40 dark:border-pink-500/60">
            <div className="flex items-start gap-4">
              <div className="text-pink-500 dark:text-pink-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Address</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  123 Hospital Street<br />
                  Medical District, City 123456
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass-card border-2 border-cyan-500/40 dark:border-cyan-500/60">
            <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
              Send us a Message
            </h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-emerald-500/20 dark:bg-emerald-500/30 border border-emerald-500/50 dark:border-emerald-500/70 rounded-xl text-emerald-500 dark:text-emerald-400"
              >
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 glass border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-400/50 focus:ring-red-400'
                      : 'border-cyan-500/40 dark:border-cyan-500/60 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:shadow-lg dark:focus:shadow-neutral-950/60'
                  } text-slate-900 dark:text-white`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 glass border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-400/50 focus:ring-red-400'
                      : 'border-cyan-500/40 dark:border-cyan-500/60 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:shadow-lg dark:focus:shadow-neutral-950/60'
                  } text-slate-900 dark:text-white`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 glass border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.subject
                      ? 'border-red-400/50 focus:ring-red-400'
                      : 'border-cyan-500/40 dark:border-cyan-500/60 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:shadow-lg dark:focus:shadow-neutral-950/60'
                  } text-slate-900 dark:text-white`}
                  placeholder="Subject"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 glass border-2 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? 'border-red-400/50 focus:ring-red-400'
                      : 'border-cyan-500/40 dark:border-cyan-500/60 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:shadow-lg dark:focus:shadow-neutral-950/60'
                  } text-slate-900 dark:text-white`}
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

