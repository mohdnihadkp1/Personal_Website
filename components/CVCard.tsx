import React, { useState } from 'react';
import { Fingerprint, Loader2, Check, FileText, Eye } from 'lucide-react';

interface CVCardProps {
    onOpen: () => void;
}

const CVCard: React.FC<CVCardProps> = ({ onOpen }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'accessing' | 'complete'>('idle');

  const handleClick = () => {
    if (status !== 'idle') return;

    // Phase 1: Biometric Scan Simulation
    setStatus('scanning');
    
    setTimeout(() => {
        // Phase 2: Accessing System
        setStatus('accessing');
        
        setTimeout(() => {
            // Phase 3: Completion & Open Modal
            setStatus('complete');
            
            // Trigger Parent Modal
            setTimeout(() => {
                onOpen();
                // Reset to idle after opening
                setTimeout(() => setStatus('idle'), 1000);
            }, 500);
            
        }, 1200);
    }, 1500);
  };

  return (
    <div 
        onClick={handleClick}
        className="glass-panel col-span-1 row-span-1 relative overflow-hidden rounded-3xl p-1 cursor-pointer group hover:border-primary/50 transition-colors duration-500"
    >
        {/* Ambient Background Glow */}
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
        
        <div className="h-full w-full bg-black/5 dark:bg-white/5 rounded-[20px] flex flex-col items-center justify-center p-6 relative overflow-hidden backdrop-blur-sm">
            
            {/* Tech Grid Background */}
            <div 
                className="absolute inset-0 opacity-[0.05]" 
                style={{ 
                    backgroundImage: 'radial-gradient(#4E9F3D 1px, transparent 1px)', 
                    backgroundSize: '10px 10px' 
                }} 
            />

            {/* Central Icon Logic */}
            <div className="relative mb-4 h-16 w-16 flex items-center justify-center">
                {/* Rotating Rings */}
                <div className={`absolute inset-0 border border-gray-400/30 rounded-full transition-all duration-700 ${status === 'idle' ? 'group-hover:scale-110 group-hover:border-primary/50' : 'scale-100 opacity-0'}`} />
                <div className={`absolute inset-0 border border-dashed border-primary/40 rounded-full animate-spin-slow ${status === 'scanning' ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Icons */}
                <div className="relative z-10 transition-all duration-300 transform">
                    {status === 'idle' && (
                        <div className="group-hover:hidden">
                           <FileText size={32} className="text-gray-400" />
                        </div>
                    )}
                    {status === 'idle' && (
                        <div className="hidden group-hover:block animate-in zoom-in duration-300">
                           <Eye size={32} className="text-primary" />
                        </div>
                    )}
                    
                    {status === 'scanning' && <Fingerprint size={32} className="text-primary animate-pulse" />}
                    {status === 'accessing' && <Loader2 size={32} className="text-primary animate-spin" />}
                    {status === 'complete' && <Check size={32} className="text-green-500 animate-in zoom-in" />}
                </div>
            </div>

            {/* Text Feedback */}
            <div className="text-center relative z-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 tracking-tight transition-all duration-300">
                    {status === 'idle' && "CV"}
                    {status === 'scanning' && "AUTHENTICATING"}
                    {status === 'accessing' && "DECRYPTING"}
                    {status === 'complete' && "ACCESS GRANTED"}
                </h3>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                    {status === 'idle' && "CLICK TO VIEW"}
                    {status === 'scanning' && "BIOMETRIC SCAN"}
                    {status === 'accessing' && "LOADING DATA..."}
                    {status === 'complete' && "OPENING FILE"}
                </p>
            </div>

            {/* Scanning Beam Effect */}
            <div 
                className={`absolute left-0 w-full h-12 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none transition-all duration-[1500ms] ease-linear ${status === 'scanning' ? 'top-full opacity-100' : '-top-12 opacity-0'}`}
                style={{ borderTop: '2px solid rgba(78, 159, 61, 0.5)' }}
            />
            
            {/* Progress Bar */}
            <div className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-[1200ms] ease-out ${status === 'accessing' ? 'w-full' : 'w-0'}`} />
        </div>
    </div>
  );
};

export default CVCard;