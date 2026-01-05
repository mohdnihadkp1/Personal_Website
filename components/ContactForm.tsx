import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, AlertCircle, X } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const MAX_MESSAGE_LENGTH = 500;

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
        setError("Name is required.");
        return;
    }

    if (!validateEmail(formData.email)) {
        setError("Please enter a valid email address (e.g. user@example.com).");
        return;
    }

    if (!formData.message.trim()) {
        setError("Message cannot be empty.");
        return;
    }

    setStatus('submitting');
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push({
      ...formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    
    setStatus('success');
    setShowSuccessBanner(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status after a delay
    setTimeout(() => {
        setStatus('idle');
        setShowSuccessBanner(false);
    }, 5000);
  };

  return (
    <div className="glass-panel col-span-1 md:col-span-2 row-span-1 rounded-3xl p-6 md:p-8 relative overflow-hidden transition-colors duration-300 h-full flex flex-col justify-center">
      
      {/* Success Banner */}
      {showSuccessBanner && (
          <div className="absolute top-0 left-0 right-0 bg-green-500 text-white p-3 text-sm font-medium flex items-center justify-between animate-in slide-in-from-top duration-300 z-20">
              <div className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
              </div>
              <button onClick={() => setShowSuccessBanner(false)} className="hover:bg-green-600 rounded p-1">
                  <X size={14} />
              </button>
          </div>
      )}

      <div className="relative z-10 flex flex-col h-full mt-4 md:mt-0">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 transition-colors">
           Get In Touch
           <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 transition-colors">Have a project in mind? Let's build something extraordinary.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <input
                type="text"
                required
                placeholder="Name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full rounded-xl bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div className="space-y-1">
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={e => {
                    setFormData({...formData, email: e.target.value});
                    if (error && error.includes('email')) setError(null);
                }}
                className={`w-full rounded-xl bg-gray-50/50 dark:bg-black/20 border px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${error && error.includes('email') ? 'border-red-500 focus:border-red-500 focus:ring-red-500 animate-pulse' : 'border-gray-200 dark:border-white/10 focus:border-primary focus:ring-primary'}`}
              />
            </div>
          </div>
          <div className="space-y-1">
            <textarea
              required
              rows={3}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Your message..."
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full rounded-xl bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
            />
            <div className="flex justify-end mt-1">
                <span className={`text-[10px] ${formData.message.length >= MAX_MESSAGE_LENGTH ? 'text-red-500' : 'text-gray-400'}`}>
                    {formData.message.length} / {MAX_MESSAGE_LENGTH}
                </span>
            </div>
          </div>
          
          {error && (
              <div className="flex items-center gap-2 text-red-500 dark:text-red-400 text-xs mt-1 font-medium bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                  <AlertCircle size={12} />
                  {error}
              </div>
          )}

          <button
            type="submit"
            disabled={status !== 'idle'}
            className={`mt-2 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-300 
              ${status === 'success' 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-primary hover:bg-primary/80 hover:scale-[1.02]'
              } 
              disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle size={18} />
                Sent Successfully
              </>
            ) : (
              <>
                Send Message
                <Send size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;