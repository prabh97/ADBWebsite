import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../utils/validation';
import { Link } from 'react-router-dom';
import { z } from 'zod';

export function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordFormData, string>>>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ForgotPasswordFormData]) {
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
      forgotPasswordSchema.parse(formData);
      setErrors({});

      // Simulate API call
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      setStatus({
        type: 'success',
        message: 'If an account exists with this email, you will receive password reset instructions.',
      });
      setFormData({ email: '' });
    } catch (error) {
      if (error instanceof Error) {
        setStatus({
          type: 'error',
          message: error.message,
        });
      }
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ForgotPasswordFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ForgotPasswordFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
        <p className="text-gray-600 mb-6">
          Enter your email address and we'll send you instructions to reset your password.
        </p>

        {status && (
          <div
            className={`mb-4 p-4 rounded-md ${
              status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Reset Instructions'
          )}
        </button>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}