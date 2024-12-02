import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { BarChart2, DollarSign, Globe } from 'lucide-react';

export function ProjectAnalysis() {
  const { projects } = useProjects();

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const averageBudget = projects.length > 0 ? totalBudget / projects.length : 0;
  const countryDistribution = projects.reduce((acc, project) => {
    acc[project.project.country] = (acc[project.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart2 className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Projects
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {projects.length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Average Budget
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  ${averageBudget.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Globe className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Countries Covered
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {Object.keys(countryDistribution).length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="col-span-full">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Projects</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {projects.map((project, index) => (
                <li key={index}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {project.projectName}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {project.country}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          ${project.budget.toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          {new Date(project.startDate).toLocaleDateString()} - 
                          {new Date(project.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="col-span-full bg-gray-50 p-6 text-center">
          <p className="text-gray-500">No projects have been added yet.</p>
        </div>
      )}
    </div>
  );
}