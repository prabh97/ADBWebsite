import React from 'react';
import { BarChart2 } from 'lucide-react';
import { ProjectAnalysis } from '../components/analysis/ProjectAnalysis';

export function Analysis() {
  return (
    <div className="py-6">
      <div className="flex items-center mb-8">
        <BarChart2 className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Analysis</h1>
      </div>
      <ProjectAnalysis />
    </div>
  );
}