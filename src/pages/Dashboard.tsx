import React from 'react';
import { Outlet } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}