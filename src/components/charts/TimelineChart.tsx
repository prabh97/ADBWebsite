import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ProjectData } from '../../contexts/ProjectContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TimelineChartProps {
  projects: ProjectData[];
}

export function TimelineChart({ projects }: TimelineChartProps) {
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const data = {
    labels: sortedProjects.map(project => project.projectName),
    datasets: [
      {
        label: 'Start Date',
        data: sortedProjects.map(project => new Date(project.startDate).getTime()),
        borderColor: 'rgb(0, 103, 185)', // ADB Light Blue
        backgroundColor: 'rgba(0, 103, 185, 0.5)',
      },
      {
        label: 'End Date',
        data: sortedProjects.map(project => new Date(project.endDate).getTime()),
        borderColor: 'rgb(0, 160, 196)', // ADB Accent
        backgroundColor: 'rgba(0, 160, 196, 0.5)',
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
        type: 'time' as const,
        time: {
          unit: 'month' as const,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}