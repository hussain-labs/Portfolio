import React from "react";
import ProjectsGrid from "./ProjectsGrid";
import projects from "../data/projects.json";
import ScrollReveal from "./ScrollReveal";

// --- Step 1: Create a helper function to calculate the color ---
// This function transitions the HUE from blue (~220) to purple (~270)
const getGradientColor = (index, total) => {
  if (total <= 1) {
    return 'hsl(220, 90%, 60%)'; // Default to blue if only one item
  }
  const startHue = 220; // Blue
  const endHue = 270;   // Purple
  const fraction = index / (total - 1);
  const currentHue = startHue + (endHue - startHue) * fraction;
  return `hsl(${currentHue}, 90%, 60%)`;
};


const Projects = () => {
  const reversedProjects = [...projects].reverse();
  const totalProjects = reversedProjects.length;

  return (
    <section id="projects" className="bg-[var(--color-surface)] py-16">
      <div className="max-w-[1638px] mx-auto px-6 md:px-16">
        <ScrollReveal direction="up">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-gradient-animated">Projects Timeline</span>
          </h2>
        </ScrollReveal>

        <div className="relative mb-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 
                         bg-[var(--color-primary)] h-full"></div>

          {reversedProjects.map((project, i) => {
            // Use the primary color for all projects to maintain the theme
            const circleColor = "var(--color-primary)";

            return (
              <ScrollReveal
                key={i}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 100}
                className={`mb-12 flex w-full justify-center ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                <div
                  className="relative w-full md:w-5/12 p-6 bg-[var(--color-background)] border border-[var(--color-primary)]/20 rounded-lg shadow-md 
                             hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* --- Step 2: Apply the dynamic color to the desktop circle --- */}
                  <span
                    className={`image-glow absolute top-6 w-6 h-6 rounded-full border-4 border-[var(--color-surface)] shadow
                      hidden md:block 
                      ${i % 2 === 0 ? "-right-12 md:-right-3" : "-left-12 md:-left-3"}`}
                    style={{ backgroundColor: circleColor, boxShadow: `0 0 15px ${circleColor}` }}
                  >
                    <span
                      className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-[var(--color-primary)]
                        ${i % 2 === 0 ? "left-full w-12" : "right-full w-12"}`}
                    ></span>
                  </span>

                  {/* --- Step 3: Apply the dynamic color to the mobile circle --- */}
                  <span
                    className="image-glow md:hidden absolute left-1/2 transform -translate-x-1/2 -top-3 w-5 h-5 
                               border-4 border-[var(--color-surface)] shadow rounded-full"
                    style={{ backgroundColor: circleColor, boxShadow: `0 0 15px ${circleColor}` }}
                  ></span>

                  <span className="text-xl font-semibold mb-2 text-gradient-static">
                    {project.name}
                  </span>
                  <p className="text-[var(--color-text-secondary)] mb-2">{project.desc}</p>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-1">Role: {project.role}</p>
                  {project.company && (
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                      <span className="font-semibold">Organization:</span> {project.company}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ProjectsGrid />
      </div>
    </section>
  );
};

export default Projects;