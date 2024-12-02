import React, { createContext, useContext, useState } from 'react';
import { z } from 'zod';

export const projectSchema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
  country: z.string().min(1, 'Please select a country'),
  budget: z.number().positive('Budget must be a positive number'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export type ProjectData = z.infer<typeof projectSchema>;

interface ProjectContextType {
  projects: ProjectData[];
  addProject: (project: ProjectData) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const addProject = (project: ProjectData) => {
    setProjects((prev) => [...prev, project]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}