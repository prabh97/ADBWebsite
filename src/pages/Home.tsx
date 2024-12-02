import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Logo />
        
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-adb-blue">
              Welcome to ADB Data Analytics Platform
            </h1>
            <p className="mt-2 text-gray-600">
              Access powerful data analytics tools and insights
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-adb-blue hover:bg-adb-light-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-adb-accent"
            >
              Login
            </Link>
            
            <Link
              to="/register"
              className="w-full flex justify-center py-2 px-4 border border-adb-blue rounded-md shadow-sm text-sm font-medium text-adb-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-adb-accent"
            >
              Create Account
            </Link>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-adb-light-blue hover:text-adb-accent"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}