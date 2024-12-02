import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ProjectData } from '../../contexts/ProjectContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BudgetChartProps {
  projects: ProjectData[];
}

export function BudgetChart({ projects }: BudgetChartProps) {
  const data = {
    labels: projects.map(project => project.projectName),
    datasets: [
      {
        label: 'Budget (USD)',
        data: projects.map(project => project.budget),
        backgroundColor: 'rgba(0, 32, 91, 0.5)', // ADB Blue
        borderColor: 'rgb(0, 32, 91)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}