import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { BudgetChart } from '../charts/BudgetChart';
import { TimelineChart } from '../charts/TimelineChart';
import { CountryChart } from '../charts/CountryChart';

export function ProjectCharts() {
  const { projects } = useProjects();

  return (
    <div className="space-y-6">
      {projects.length > 0 ? (
        <>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Distribution</h3>
            <div className="h-64">
              <BudgetChart projects={projects} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Timeline</h3>
            <div className="h-64">
              <TimelineChart projects={projects} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Geographic Distribution
            </h3>
            <div className="h-64">
              <CountryChart projects={projects} />
            </div>
          </div>
        </>
      ) : (
        <div className="bg-gray-50 p-6 text-center rounded-lg">
          <p className="text-gray-500">
            No projects available for visualization. Add projects in the Data Collection tab.
          </p>
        </div>
      )}
    </div>
  );
}