import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Logo } from '../ui/Logo';
import { userSchema, type UserFormData } from '../../utils/validation';
import { mockApi } from '../../utils/mockApi';
import { auth } from '../../utils/auth';
import { z } from 'zod';

export function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof UserFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    try {
      // Validate form data
      userSchema.parse(formData);
      setErrors({});

      // Call mock API
      const { token } = await mockApi.register(formData);
      
      // Store token
      auth.setToken(token);

      setStatus({
        type: 'success',
        message: 'Registration successful! Redirecting to dashboard...',
      });

      // Redirect after showing success message
      setTimeout(() => {
        navigate('/dashboard/data-collection');
      }, 1500);

    } catch (error) {
      if (error instanceof Error) {
        setStatus({
          type: 'error',
          message: error.message,
        });
      }
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof UserFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof UserFormData] = err.message;
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
          <h2 className="text-2xl font-bold text-adb-blue mb-6">Create Account</h2>

          {status && (
            <div
              className={`mb-4 p-4 rounded-md ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              <div className="flex items-center">
                {status.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2" />
                )}
                <p>{status.message}</p>
              </div>
            </div>
          )}

          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="johndoe"
            autoComplete="username"
            disabled={isLoading}
          />

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
            autoComplete="new-password"
            disabled={isLoading}
          />

          <div className="flex items-center justify-end mb-6">
            <Link
              to="/login"
              className="text-sm text-adb-light-blue hover:text-adb-accent"
            >
              Already have an account? Login
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}