import React, { useState, useEffect } from 'react';
import BentoGrid from './components/BentoGrid';
import AIChat from './components/AIChat';
import ContactForm from './components/ContactForm';
import { ArrowUp, Sun, Moon, X, Code, Sparkles, Cpu, Database, Layout, Terminal, Server, Globe, AlertTriangle, Home, Menu, FileText, Download, ShieldCheck } from 'lucide-react';
import { SKILLS, PROJECTS, PORTFOLIO_BIO, PORTFOLIO_OWNER, PORTFOLIO_ROLE } from './constants';
import ProjectCard from './components/ProjectCard';
import { Project, Skill } from './types';

// Typing Effect Component
const TypingEffect: React.FC = () => {
  const roles = ["AI Developer", "vibe coder", "Freelancer", "Graphic Designer", "Full-Stack Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  return (
    <span className="hidden sm:inline-block min-w-[150px] font-mono text-sm text-gray-500 dark:text-gray-400">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Map skills to icons
const getSkillIcon = (category: string) => {
    switch(category) {
        case 'frontend': return <Layout size={14} />;
        case 'backend': return <Server size={14} />;
        case 'ai': return <Sparkles size={14} />;
        case 'tools': return <Terminal size={14} />;
        default: return <Code size={14} />;
    }
}

// Futuristic 404 Component
const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-mono">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none animate-scan"></div>
            
            <div className="relative z-10 text-center">
                <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-glitch mb-4" style={{textShadow: '0 0 20px rgba(78,159,61,0.5)'}}>404</h1>
                <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-1 rounded inline-flex items-center gap-2 mb-8 animate-pulse">
                    <AlertTriangle size={16} /> SYSTEM_FAILURE: COORDINATES_NOT_FOUND
                </div>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">The requested data sector could not be located in the current matrix.</p>
                <a href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(78,159,61,0.4)]">
                    <Home size={18} /> RETURN TO BASE
                </a>
            </div>
        </div>
    );
};

// Loading Intro Component
const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Cyber Core Animation - Refined & Subtle */}
      <div className="relative flex items-center justify-center mb-12 opacity-90 scale-90">
          <div className="w-56 h-56 rounded-full border border-gray-800/40 animate-spin-slow absolute"></div>
          <div className="w-56 h-56 rounded-full border-t border-primary/20 animate-spin-slow absolute"></div>
          <div className="w-40 h-40 rounded-full border border-gray-800/40 animate-spin-reverse-slow absolute"></div>
          <div className="w-40 h-40 rounded-full border-b border-l border-white/5 animate-spin-reverse-slow absolute"></div>
          <div className="w-20 h-20 bg-primary/5 rounded-full blur-2xl animate-pulse-slow absolute"></div>
          <div className="w-2 h-2 bg-primary/80 rounded-full shadow-[0_0_20px_rgba(78,159,61,0.4)] animate-pulse-slow"></div>
          <div className="absolute w-48 h-48 animate-cyber-spin opacity-60">
              <div className="w-1 h-1 bg-white/60 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_5px_white]"></div>
          </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl px-4 text-center">
        <div className="font-mono text-primary/70 text-[10px] md:text-xs mb-3 tracking-[0.4em] uppercase opacity-70 animate-pulse">
            System Initialization
        </div>
        
        <div className="w-32 h-[1px] bg-gray-900 rounded-full overflow-hidden mb-6 relative opacity-50">
             <div className="absolute inset-0 bg-primary/5"></div>
             <div className="h-full bg-primary/60 shadow-[0_0_10px_rgba(78,159,61,0.4)] animate-[scan_3s_ease-in-out_infinite] w-full origin-left transform -translate-x-full" style={{ animationName: 'marquee', animationDuration: '4s' }}></div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 text-[9px] font-mono text-gray-700 uppercase tracking-widest opacity-50">
            <span className="animate-pulse" style={{animationDelay: '0s'}}>Core</span>
            <span className="animate-pulse" style={{animationDelay: '1.5s'}}>Data</span>
            <span className="animate-pulse" style={{animationDelay: '3s'}}>Sync</span>
        </div>
      </div>
      
      <div className="absolute inset-0 z-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay"></div>
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Modal States
  const [activeModal, setActiveModal] = useState<'work' | 'about' | 'contact' | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // Check for 404 condition
    const validPaths = ['/', '/index.html'];
    if (!validPaths.includes(window.location.pathname) && window.location.pathname !== '') {
        // setIs404(true); 
    }

    const bootTimer = setTimeout(() => {
        setIsLoading(false);
    }, 3500); 

    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(bootTimer);
    }
  }, []);

  // Back Button Navigation Logic (History State Management)
  useEffect(() => {
      const handlePopState = (event: PopStateEvent) => {
          // Priority-based closing of modals when Back button is pressed
          // This ensures that if multiple things are somehow open (stacked), we close them one by one
          if (isCVOpen) {
              setIsCVOpen(false);
              return;
          }
          if (expandedImage) {
              setExpandedImage(null);
              return;
          }
          if (selectedProject) {
              setSelectedProject(null);
              return;
          }
          if (activeModal) {
              setActiveModal(null);
              return;
          }
          if (isProfileOpen) {
              setIsProfileOpen(false);
              return;
          }
          if (isChatOpen) {
              setIsChatOpen(false);
              return;
          }
          if (isMobileMenuOpen) {
              setIsMobileMenuOpen(false);
              return;
          }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
  }, [expandedImage, selectedProject, activeModal, isProfileOpen, isChatOpen, isMobileMenuOpen, isCVOpen]);

  // Helper to open UI elements with History Push
  const openUI = (action: () => void) => {
      window.history.pushState(null, '');
      action();
  };

  // Helper to close UI elements via History Back
  const closeUI = () => {
      window.history.back();
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            toggleTheme();
        }
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
            e.preventDefault();
            if (isChatOpen) closeUI();
            else openUI(() => setIsChatOpen(true));
        }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isDarkMode, isChatOpen]);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
        const newMode = !prev;
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return newMode;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (modal: 'work' | 'about' | 'contact') => {
    openUI(() => setActiveModal(modal));
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  if (is404) return <NotFound />;

  if (isLoading) {
      return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen w-full bg-background text-gray-900 dark:text-gray-100 selection:bg-secondary/30 selection:text-white transition-colors duration-300 flex flex-col animate-in fade-in duration-1000 overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 border-b border-black/5 dark:border-white/5 bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
             <div className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white transition-colors">
                mohdnihadkp
            </div>
            <div className="h-6 w-[1px] bg-gray-300 dark:bg-white/20 hidden sm:block"></div>
            <TypingEffect />
          </div>
         
          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-2 text-sm font-medium">
               {['Work', 'About', 'Notes', 'Contact'].map((item) => (
                   <button 
                        key={item}
                        onClick={() => {
                            if (item === 'Work') handleNavClick('work');
                            else if (item === 'About') handleNavClick('about');
                            else if (item === 'Contact') handleNavClick('contact');
                        }}
                        className="relative px-4 py-2 group overflow-hidden rounded-full text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
                   >
                        <span className="relative z-10">{item}</span>
                        <div className="absolute inset-0 bg-primary/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                   </button>
               ))}
            </nav>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="rounded-full bg-surface/50 p-2 text-gray-600 hover:text-primary hover:bg-black/5 transition-all duration-300 ease-in-out dark:text-gray-400 dark:hover:bg-white/5 cursor-pointer hover:rotate-12 hover:scale-110"
              aria-label="Toggle Theme (Ctrl+T)"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
                className="md:hidden rounded-full p-2 text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() => {
                    if (isMobileMenuOpen) closeUI();
                    else openUI(() => setIsMobileMenuOpen(true));
                }}
            >
                <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden animate-in slide-in-from-top-10 fade-in duration-300 flex flex-col p-6">
              <div className="flex justify-end">
                  <button onClick={closeUI} className="p-2 rounded-full bg-black/5 dark:bg-white/5">
                      <X size={24} />
                  </button>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                  {['Work', 'About', 'Notes', 'Contact'].map((item) => (
                      <button 
                          key={item}
                          onClick={() => {
                              if (item === 'Work') handleNavClick('work');
                              else if (item === 'About') handleNavClick('about');
                              else if (item === 'Contact') handleNavClick('contact');
                              else closeUI(); // Notes or other non-modal links
                          }}
                          className="text-2xl font-bold text-left py-4 border-b border-gray-200 dark:border-white/10"
                      >
                          {item}
                      </button>
                  ))}
              </nav>
          </div>
      )}

      <main className="relative z-10 pt-20 flex-grow">
        <BentoGrid 
            onExpandProject={(img) => openUI(() => setExpandedImage(img))} 
            onSelectProject={(proj) => openUI(() => setSelectedProject(proj))} 
            isProfileOpen={isProfileOpen}
            onToggleProfile={(open) => open ? openUI(() => setIsProfileOpen(true)) : closeUI()}
            onOpenCV={() => openUI(() => setIsCVOpen(true))}
        />
      </main>

      <footer className="relative z-10 bg-black text-white border-t border-white/10 transition-colors">
         <div className="overflow-hidden py-8 bg-[#0a0a0a] border-b border-white/5 relative">
             <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
             <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>
             
             <div className="flex w-full items-center gap-8 animate-marquee whitespace-nowrap hover:pause">
                {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
                    <div 
                        key={`${skill.name}-${i}`} 
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group cursor-default backdrop-blur-sm hover:scale-105"
                    >
                        <div className={`p-2 rounded-full ${skill.category === 'ai' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-primary/20 text-primary'} transition-transform duration-300 group-hover:rotate-12`}>
                            {getSkillIcon(skill.category)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-wide text-gray-200 group-hover:text-white transition-colors">{skill.name}</span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 group-hover:text-primary/80 transition-colors">{skill.category}</span>
                        </div>
                    </div>
                ))}
            </div>
         </div>

        <div className="py-8 text-center text-sm text-gray-500 bg-black">
            <p>&copy; {new Date().getFullYear()} mohdnihadkp. Built with React, Tailwind & Gemini API.</p>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-50 rounded-full bg-surface border border-black/10 dark:border-white/10 p-3 text-primary shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-pointer ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      <AIChat 
        isOpen={isChatOpen} 
        onToggle={() => isChatOpen ? closeUI() : openUI(() => setIsChatOpen(true))} 
      />

      {/* MODALS - All controlled via App state & History */}
      
      {/* CV Preview Modal - Futuristic Style */}
      {isCVOpen && (
          <div 
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in zoom-in-95 duration-300"
            onClick={closeUI}
          >
              <div 
                className="w-full max-w-6xl h-[90vh] bg-gray-900/50 rounded-2xl border border-white/10 flex flex-col relative overflow-hidden shadow-2xl backdrop-blur-2xl"
                onClick={e => e.stopPropagation()}
              >
                  {/* Futuristic Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 relative">
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                      
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-primary/20 rounded-lg text-primary animate-pulse">
                             <ShieldCheck size={20} />
                         </div>
                         <div className="flex flex-col">
                             <span className="text-xs text-primary font-mono tracking-widest uppercase">Identity Document</span>
                             <span className="text-white font-bold tracking-tight">RESUME_PREVIEW.PDF</span>
                         </div>
                      </div>

                      <div className="flex items-center gap-3">
                         <a 
                             href="/assets/resume.pdf" 
                             download="Mohammed_Nihad_CV.pdf"
                             className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg transition-all text-xs font-mono uppercase tracking-wider"
                         >
                             <Download size={14} /> Download File
                         </a>
                         <button 
                             onClick={closeUI}
                             className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                         >
                             <X size={24} />
                         </button>
                      </div>
                  </div>

                  {/* Document Viewer */}
                  <div className="flex-1 bg-gray-950 relative overflow-hidden flex flex-col items-center justify-center">
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                      {/* Grid overlay inside viewer */}
                      <div 
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                      ></div>
                      
                      <iframe 
                          src="/assets/resume.pdf" 
                          className="w-full h-full relative z-10" 
                          title="Resume Preview"
                      />
                  </div>

                  {/* Footer Status Bar */}
                  <div className="h-8 bg-black/80 border-t border-white/10 flex items-center justify-between px-6 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                      <span>SECURE CONNECTION ESTABLISHED</span>
                      <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          LIVE VIEW
                      </span>
                  </div>
              </div>
          </div>
      )}

      {/* Expanded Image Modal */}
      {expandedImage && (
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={closeUI}
          >
              <button 
                  onClick={closeUI} 
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                  <X size={24} />
              </button>
              <img src={expandedImage} alt="Expanded" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
          </div>
      )}

      {/* Selected Project Details Modal */}
      {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in" onClick={closeUI}>
              <div 
                  className="bg-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden" 
                  onClick={e => e.stopPropagation()}
              >
                  <button 
                      onClick={closeUI} 
                      className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md cursor-pointer"
                  >
                      <X size={20} />
                  </button>
                  
                  <div className="w-full md:w-1/2 h-64 md:h-auto relative group">
                      <img 
                          src={selectedProject.imageUrl} 
                          alt={selectedProject.title} 
                          className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden"></div>
                  </div>
                  
                  <div className="w-full md:w-1/2 p-8 flex flex-col">
                      <div className="mb-4">
                          <div className="flex flex-wrap gap-2 mb-4">
                              {selectedProject.tags.map(tag => (
                                  <span key={tag} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
                                      {tag}
                                  </span>
                              ))}
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedProject.title}</h2>
                      </div>
                      
                      <div className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-300 mb-8 flex-grow">
                          <p>{selectedProject.description}</p>
                          <p className="mt-4">
                              Leveraging modern technologies to build scalable and efficient solutions. 
                              This project demonstrates proficiency in full-stack development and attention to UI/UX details.
                          </p>
                      </div>
                      
                      <div className="flex gap-4 mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
                          {selectedProject.link && (
                              <a 
                                  href={selectedProject.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl text-center font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02]"
                              >
                                  <Globe size={18} /> Visit Live Demo
                              </a>
                          )}
                          {selectedProject.githubUrl && (
                              <a 
                                  href={selectedProject.githubUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex-1 py-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-xl text-center font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                              >
                                  <Code size={18} /> View Code
                              </a>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Work Modal */}
      {activeModal === 'work' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in" onClick={closeUI}>
            <div className="bg-surface w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={closeUI} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><X /></button>
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Selected Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROJECTS.map(project => (
                        <div key={project.id} className="col-span-1">
                             <ProjectCard 
                                project={{...project, size: 'medium'}} 
                                onExpandImage={(img) => openUI(() => setExpandedImage(img))} 
                                onSelect={(proj) => openUI(() => setSelectedProject(proj))}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* About Modal */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in" onClick={closeUI}>
            <div className="bg-surface w-full max-w-2xl rounded-3xl p-8 relative shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                <button onClick={closeUI} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><X /></button>
                <div className="flex flex-col items-center text-center">
                    <div className="relative h-32 w-32 mb-6 rounded-full overflow-hidden border-4 border-accent/20">
                         <img src="assets/profile_pic.png" alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{PORTFOLIO_OWNER}</h2>
                    <p className="text-accent font-medium mb-6">{PORTFOLIO_ROLE}</p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {PORTFOLIO_BIO}
                    </p>
                    <div className="grid grid-cols-3 gap-4 w-full">
                         <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                             <div className="text-2xl font-bold text-primary">1+</div>
                             <div className="text-xs uppercase tracking-wider opacity-70">Years Exp</div>
                         </div>
                         <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                             <div className="text-2xl font-bold text-primary">5+</div>
                             <div className="text-xs uppercase tracking-wider opacity-70">Projects</div>
                         </div>
                         <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                             <div className="text-2xl font-bold text-primary">100%</div>
                             <div className="text-xs uppercase tracking-wider opacity-70">Committed</div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Contact Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in" onClick={closeUI}>
            <div className="bg-surface w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 bg-white dark:bg-[#111]" onClick={e => e.stopPropagation()}>
                 <button onClick={closeUI} className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><X /></button>
                 <ContactForm />
            </div>
        </div>
      )}

    </div>
  );
};

export default App;