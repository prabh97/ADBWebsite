import React from 'react';
import { Database } from 'lucide-react';
import { ProjectForm } from '../components/forms/ProjectForm';

export function DataCollection() {
  return (
    <div className="py-6">
      <div className="flex items-center mb-8">
        <Database className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Data Collection</h1>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">New Project</h2>
        <ProjectForm />
      </div>
    </div>
  );
}