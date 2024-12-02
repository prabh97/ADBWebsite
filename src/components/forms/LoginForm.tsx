import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Logo } from '../ui/Logo';
import { loginSchema, type LoginFormData } from '../../utils/validation';
import { mockApi } from '../../utils/mockApi';
import { auth } from '../../utils/auth';
import { z } from 'zod';

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      loginSchema.parse(formData);
      setErrors({});

      const { token } = await mockApi.login(formData);
      auth.setToken(token);
      navigate('/dashboard/data-collection');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Logo />
        <form onSubmit={handleSubmit} className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-adb-blue mb-6">Login</h2>

          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 text-red-700">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="john@example.com"
            autoComplete="email"
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isLoading}
          />

          <div className="flex items-center justify-between mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-adb-light-blue hover:text-adb-accent"
            >
              Forgot your password?
            </Link>
            <Link
              to="/register"
              className="text-sm text-adb-light-blue hover:text-adb-accent"
            >
              Create an account
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-adb-blue text-white py-2 px-4 rounded-md hover:bg-adb-light-blue focus:outline-none focus:ring-2 focus:ring-adb-accent focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}