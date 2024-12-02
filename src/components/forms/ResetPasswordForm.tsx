import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../ui/Input';
import { resetPasswordSchema, type ResetPasswordFormData } from '../../utils/validation';
import { z } from 'zod';

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ResetPasswordFormData, string>>>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ResetPasswordFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setStatus({
        type: 'error',
        message: 'Invalid reset token',
      });
      return;
    }

    setStatus(null);
    setIsLoading(true);

    try {
      // Validate form data
      resetPasswordSchema.parse(formData);
      setErrors({});

      // Simulate API call
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      setStatus({
        type: 'success',
        message: 'Password has been reset successfully!',
      });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setStatus({
          type: 'error',
          message: error.message,
        });
      }
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ResetPasswordFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ResetPasswordFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>Invalid or missing reset token</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-600 mb-6">Please enter your new password below.</p>

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
          label="New Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="new-password"
          disabled={isLoading}
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="••••••••"
          autoComplete="new-password"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Resetting Password...
            </>
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </div>
  );
}