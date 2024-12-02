import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { z } from 'zod';

const projectSchema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
  country: z.string().min(1, 'Please select a country'),
  budget: z.number().positive('Budget must be a positive number'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
}).refine(
  (data) => new Date(data.startDate) < new Date(data.endDate),
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

type ProjectFormData = z.infer<typeof projectSchema>;

const countries = [
  'Bangladesh',
  'Bhutan',
  'Cambodia',
  'China',
  'India',
  'Indonesia',
  'Kazakhstan',
  'Laos',
  'Malaysia',
  'Maldives',
  'Mongolia',
  'Myanmar',
  'Nepal',
  'Pakistan',
  'Philippines',
  'Sri Lanka',
  'Thailand',
  'Vietnam',
];

export function ProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: '',
    country: '',
    budget: 0,
    startDate: '',
    endDate: '',
    description: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'budget' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name as keyof ProjectFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    try {
      projectSchema.parse(formData);
      setErrors({});

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus({
        type: 'success',
        message: 'Project data has been successfully submitted!',
      });

      // Reset form
      setFormData({
        projectName: '',
        country: '',
        budget: 0,
        startDate: '',
        endDate: '',
        description: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ProjectFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ProjectFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Project Name"
        type="text"
        name="projectName"
        value={formData.projectName}
        onChange={handleChange}
        error={errors.projectName}
        placeholder="Enter project name"
        disabled={isLoading}
        required
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
            ${errors.country ? 'border-red-300' : 'border-gray-300'}`}
          disabled={isLoading}
          required
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country}</p>
        )}
      </div>

      <Input
        label="Budget (USD)"
        type="number"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        error={errors.budget}
        placeholder="Enter budget amount"
        min="0"
        step="1000"
        disabled={isLoading}
        required
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          error={errors.startDate}
          disabled={isLoading}
          required
        />

        <Input
          label="End Date"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          error={errors.endDate}
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
            ${errors.description ? 'border-red-300' : 'border-gray-300'}`}
          placeholder="Enter project description"
          disabled={isLoading}
          required
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {status && (
        <div
          className={`p-4 rounded-md ${
            status.type === 'success' ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle2
                className={`h-5 w-5 ${
                  status.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  status.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {status.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Project'
          )}
        </button>
      </div>
    </form>
  );
}