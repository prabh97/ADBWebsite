import React from 'react';
import { LineChart } from 'lucide-react';
import { ProjectCharts } from '../components/visualization/ProjectCharts';

export function Visualization() {
  return (
    <div className="py-6">
      <div className="flex items-center mb-8">
        <LineChart className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Visualization</h1>
      </div>
      <ProjectCharts />
    </div>
  );
}