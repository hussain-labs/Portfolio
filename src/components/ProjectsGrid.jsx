import React from "react";
import { Link } from "react-router-dom";
import projects from "../services/projects";
import ScrollReveal from "./ScrollReveal";

const ProjectsGrid = () => {
  return (
    <section className="max-w-[1638px] mx-auto px-6 md:px-16 py-10">
      <ScrollReveal direction="up">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-gradient-animated-hero">
          All Projects
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <ScrollReveal
            key={i}
            direction="up"
            delay={i * 100}
            className="flex flex-col bg-[#16181C] border border-[#CDFC31]/10 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(205,252,49,0.15)] hover:border-[#CDFC31]/30 overflow-hidden hover:-translate-y-2 transition-all duration-500 group/card"
          >
            {/* Project Image */}
            <div className="relative h-56 overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0F1115] to-[#16181C] flex items-center justify-center relative overflow-hidden">
                  {/* Subtle decorative shapes for placeholder */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#CDFC31]/5 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#CDFC31]/5 rounded-full blur-2xl"></div>
                  <span className="text-[#CDFC31]/20 text-6xl font-black tracking-tighter">{project.name.substring(0, 2).toUpperCase()}</span>
                </div>
              )}

              {/* Gradient Overlay for smooth transition to content */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#16181C] to-transparent"></div>
              
              {/* Overlay on hover */}
              <Link 
                to={`/project/${project.id}`} 
                className="absolute inset-0 bg-[#0A0C10]/60 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]"
              >
                <span className="text-white font-medium tracking-wide border border-[#CDFC31]/50 px-6 py-2.5 rounded-full bg-[#0A0C10]/60 transform translate-y-4 group-hover/card:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(205,252,49,0.2)]">
                  View Case Study
                </span>
              </Link>
            </div>

            {/* Info below */}
            <div className="p-6 md:p-8 text-left relative z-10 flex flex-col flex-grow">
              {/* Tech Pills */}
              {project.tech && project.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((t, index) => (
                    <span 
                      key={index} 
                      className="text-[11px] font-semibold tracking-wider text-[#CDFC31] bg-[#CDFC31]/10 px-2.5 py-1.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[11px] font-semibold tracking-wider text-gray-400 bg-gray-800/50 px-2.5 py-1.5 rounded-md">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2 group-hover/card:text-[#CDFC31] transition-colors duration-300">
                {project.name}
              </h3>
              
              <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                {project.overview || project.desc}
              </p>
              
              {/* Divider */}
              <div className="h-[1px] w-full bg-gray-800/50 mt-auto mb-5"></div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Role</span>
                  <span className="text-sm text-gray-300 font-medium">{project.role}</span>
                </div>

                {/* View Project Button */}
                <Link
                  to={`/project/${project.id}`}
                  className="w-11 h-11 rounded-full bg-[#CDFC31]/10 flex items-center justify-center text-[#CDFC31] group-hover/card:bg-[#CDFC31] group-hover/card:text-[#0A0C10] group-hover/card:shadow-[0_0_15px_rgba(205,252,49,0.4)] transition-all duration-300"
                  aria-label="View Project"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover/card:rotate-0 transition-transform duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;