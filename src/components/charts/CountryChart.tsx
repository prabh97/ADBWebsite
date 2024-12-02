import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { ProjectData } from '../../contexts/ProjectContext';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CountryChartProps {
  projects: ProjectData[];
}

export function CountryChart({ projects }: CountryChartProps) {
  const countryData = projects.reduce((acc, project) => {
    acc[project.country] = (acc[project.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(countryData),
    datasets: [
      {
        data: Object.values(countryData),
        backgroundColor: [
          'rgba(0, 32, 91, 0.7)',   // ADB Blue
          'rgba(0, 103, 185, 0.7)', // ADB Light Blue
          'rgba(0, 160, 196, 0.7)', // ADB Accent
          'rgba(0, 32, 91, 0.5)',
          'rgba(0, 103, 185, 0.5)',
          'rgba(0, 160, 196, 0.5)',
        ],
        borderColor: [
          'rgb(0, 32, 91)',
          'rgb(0, 103, 185)',
          'rgb(0, 160, 196)',
          'rgb(0, 32, 91)',
          'rgb(0, 103, 185)',
          'rgb(0, 160, 196)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return <Pie data={data} options={options} />;
}