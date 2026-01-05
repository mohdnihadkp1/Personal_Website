import React from 'react';
import { ArrowUpRight, Github, Twitter, Linkedin, ExternalLink, Maximize2, Info } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onExpandImage?: (imageUrl: string) => void;
  onSelect?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onExpandImage, onSelect }) => {
  // Determine grid span based on size
  const gridSpan = 
    project.size === 'large' ? 'col-span-1 md:col-span-2 row-span-2' :
    project.size === 'medium' ? 'col-span-1 md:col-span-2 row-span-1' :
    'col-span-1 row-span-1';

  // Share URL generation
  const shareText = encodeURIComponent(`Check out ${project.title} - ${project.description}`);
  const shareUrl = encodeURIComponent(project.link || window.location.href);
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

  return (
    <div 
      className={`group relative overflow-hidden rounded-3xl glass-panel ${gridSpan} transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer`}
      onClick={() => onSelect && onSelect(project)}
    >
      {/* Image Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 cursor-zoom-in"
        onClick={(e) => {
            e.stopPropagation();
            onExpandImage && onExpandImage(project.imageUrl);
        }}
      >
        <img 
          src={project.imageUrl}
          alt={project.title} 
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
        
        {/* Expand Icon Hint */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="p-2 bg-black/50 rounded-full backdrop-blur-md text-white border border-white/10 hover:bg-black/70 transition-colors">
                 <Maximize2 size={16} />
             </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8 pointer-events-none">
        <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0 pointer-events-auto">
          <div className="mb-3 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-1">
             <h3 className="text-2xl font-bold text-white md:text-3xl tracking-tight">{project.title}</h3>
             <Info size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="mb-4 text-sm text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-base leading-relaxed line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                {project.link && (
                    <a 
                        href={project.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-all border border-accent/20 cursor-pointer"
                    >
                        Live Demo <ExternalLink size={16} />
                    </a>
                )}
                {project.githubUrl && (
                    <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-white hover:text-black transition-all cursor-pointer ${!project.link ? 'bg-white/10 text-white' : ''}`}
                    >
                        <Github size={16} /> {project.link ? 'Code' : 'View on GitHub'}
                    </a>
                )}
            </div>

            {/* Share Buttons */}
            {project.link && (
                <div className="flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                    <a 
                        href={twitterShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="rounded-full bg-black/50 p-2 text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-colors backdrop-blur-sm cursor-pointer"
                        aria-label="Share on Twitter"
                    >
                        <Twitter size={14} />
                    </a>
                    <a 
                        href={linkedinShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="rounded-full bg-black/50 p-2 text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors backdrop-blur-sm cursor-pointer"
                        aria-label="Share on LinkedIn"
                    >
                        <Linkedin size={14} />
                    </a>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;