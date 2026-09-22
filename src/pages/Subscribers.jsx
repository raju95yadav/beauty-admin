import React, { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Search, 
  Calendar, 
  Trash2, 
  AlertCircle, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert,
  Inbox,
  Filter
} from 'lucide-react';

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'gmail' | 'other'
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/newsletters');
      setSubscribers(data || []);
    } catch (error) {
      toast.error(error.message || error.response?.data?.message || 'Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async () => {
    if (!selectedSubscriber) return;
    try {
      setIsDeleting(true);
      await api.delete(`/admin/newsletter/${selectedSubscriber._id}`);
      toast.success(`Removed ${selectedSubscriber.email} from subscriber list`);
      setSubscribers(subscribers.filter(s => s._id !== selectedSubscriber._id));
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.message || error.response?.data?.message || 'Failed to remove subscriber');
    } finally {
      setIsDeleting(false);
      setSelectedSubscriber(null);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      toast.error('No subscribers to export');
      return;
    }

    const headers = ['Email,Source,Status,Subscribed Date'];
    const rows = subscribers.map(s => 
      `"${s.email}","${s.source || 'footer'}","${s.status || 'active'}","${new Date(s.createdAt).toISOString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `beauty_glam_subscribers_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Subscriber list exported to CSV');
  };

  const gmailCount = subscribers.filter(s => s.email?.toLowerCase().endsWith('@gmail.com')).length;
  const otherCount = subscribers.length - gmailCount;

  const filteredSubscribers = subscribers.filter(s => {
    const matchesSearch = s.email?.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (filterType === 'gmail') {
      return s.email?.toLowerCase().endsWith('@gmail.com');
    }
    if (filterType === 'other') {
      return !s.email?.toLowerCase().endsWith('@gmail.com');
    }
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (loading && subscribers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="size-12 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-nykaa-text tracking-tight">
            Newsletter <span className="text-pink-500">Subscribers</span>
          </h1>
          <p className="text-nykaa-text-muted font-medium mt-1">
            Managing {subscribers.length} verified beauty enthusiast emails for drops & campaigns.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-6 flex items-center gap-5">
          <div className="size-14 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center">
            <Mail size={28} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-nykaa-text-muted">Total Subscribers</p>
            <h3 className="text-3xl font-black text-nykaa-text mt-1">{subscribers.length}</h3>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-5">
          <div className="size-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center">
            <Inbox size={28} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-nykaa-text-muted">Gmail Accounts</p>
            <h3 className="text-3xl font-black text-nykaa-text mt-1">{gmailCount}</h3>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-5">
          <div className="size-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Sparkles size={28} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-nykaa-text-muted">Other Providers</p>
            <h3 className="text-3xl font-black text-nykaa-text mt-1">{otherCount}</h3>
          </div>
        </div>
      </div>

      {/* Controls & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative group flex-1 min-w-[280px] max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-nykaa-text-muted group-focus-within:text-pink-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search subscriber by email (e.g. @gmail.com)..."
            className="input-glass pl-12 text-sm font-medium text-nykaa-text w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === 'all' 
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20' 
                : 'glass text-nykaa-text-muted hover:text-nykaa-text'
            }`}
          >
            All ({subscribers.length})
          </button>
          <button
            onClick={() => setFilterType('gmail')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === 'gmail' 
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20' 
                : 'glass text-nykaa-text-muted hover:text-nykaa-text'
            }`}
          >
            Gmail ({gmailCount})
          </button>
          <button
            onClick={() => setFilterType('other')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === 'other' 
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20' 
                : 'glass text-nykaa-text-muted hover:text-nykaa-text'
            }`}
          >
            Other ({otherCount})
          </button>
        </div>
      </div>

      {/* Subscribers Table / List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4"
      >
        <div className="hidden lg:grid grid-cols-12 px-8 py-4 text-[10px] font-black text-nykaa-text-muted uppercase tracking-[0.2em] border-b border-nykaa-border">
          <div className="col-span-5">Subscriber Email</div>
          <div className="col-span-2">Source</div>
          <div className="col-span-2">Subscribed Date</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Spam Removal</div>
        </div>

        {filteredSubscribers.map((subscriber) => (
          <motion.div 
            key={subscriber._id}
            variants={itemVariants}
            className="glass-card group hover:bg-pink-500/5 transition-all p-4 lg:px-8 lg:py-5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4">
              {/* Email Address & Avatar */}
              <div className="lg:col-span-5 flex items-center gap-4">
                <div className="size-11 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-600/10 flex items-center justify-center text-pink-500 shadow-inner group-hover:scale-110 transition-transform flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-black text-nykaa-text truncate">
                    {subscriber.email}
                  </h3>
                  <p className="text-xs font-medium text-nykaa-text-muted">
                    {subscriber.email.toLowerCase().endsWith('@gmail.com') ? 'Google Mail User' : 'Web Mail User'}
                  </p>
                </div>
              </div>

              {/* Source */}
              <div className="lg:col-span-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                  {subscriber.source || 'footer'}
                </span>
              </div>

              {/* Subscribed Date */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 text-xs font-bold text-nykaa-text">
                  <Calendar size={14} className="text-blue-500/70" />
                  {new Date(subscriber.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {/* Status */}
              <div className="lg:col-span-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <CheckCircle2 size={12} />
                  {subscriber.status || 'Active'}
                </span>
              </div>

              {/* Delete Action (Remove Spam) */}
              <div className="lg:col-span-1 text-right">
                <button 
                  title="Remove spam subscriber"
                  onClick={() => { 
                    setSelectedSubscriber(subscriber); 
                    setShowDeleteModal(true); 
                  }}
                  className="size-10 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all ml-auto group/btn"
                >
                  <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredSubscribers.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-16 text-center glass-card border-dashed border-2 border-nykaa-border"
          >
            <ShieldAlert size={48} className="text-nykaa-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-black text-nykaa-text">No subscribers found</h3>
            <p className="text-nykaa-text-muted mt-2 text-sm">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No users have joined the newsletter circle yet.'}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal for Removing Spam */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setShowDeleteModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-nykaa-surface max-w-md w-full p-8 rounded-3xl relative z-10 border border-nykaa-border shadow-2xl text-center"
            >
              <div className="size-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-black text-nykaa-text mb-2 tracking-tight">Remove Subscriber?</h3>
              <p className="text-nykaa-text-muted text-xs font-medium mb-8 leading-relaxed">
                 Are you sure you want to remove <span className="text-nykaa-text font-black">"{selectedSubscriber?.email}"</span>? This will unsubscribe this email from all campaigns and permanently purge it from the database to eliminate spam.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  disabled={isDeleting}
                  onClick={handleDeleteSubscriber}
                  className="w-full bg-red-500 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest text-white hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20 disabled:opacity-50"
                >
                  {isDeleting ? 'Purging Spam...' : 'Confirm & Remove Subscriber'}
                </button>
                <button 
                  disabled={isDeleting}
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-3.5 text-nykaa-text-muted font-bold text-xs uppercase tracking-widest hover:text-nykaa-text transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Subscribers;
