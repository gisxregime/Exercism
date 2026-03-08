import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { UserIcon, MapIcon } from 'lucide-react';
export function SignupPage() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'tawo' | 'giya'>('tawo');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialties: '',
    location: '',
    bio: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'giya' || roleParam === 'tawo') {
      setRole(roleParam);
      setStep(2); // Skip role selection if provided in URL
    }
  }, [location]);
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleNext = () => {
    if (step === 1) setStep(2);else
    if (step === 2 && role === 'giya') setStep(3);else
    handleSubmit();
  };
  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      signup({
        name: formData.name,
        email: formData.email,
        role: role,
        location: formData.location,
        bio: formData.bio
      });
      setIsLoading(false);
      // Redirect based on role
      if (role === 'giya') navigate('/giya-dashboard');else
      navigate('/tawo-dashboard');
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Join <span className="text-ocean">Tribal</span>
            <span className="text-olive">Tours</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1 ?
            'Choose how you want to use TribalTours' :
            'Create your account'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div
            className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-ocean' : 'bg-gray-300'}`}>
          </div>
          <div
            className={`w-10 h-1 ${step >= 2 ? 'bg-ocean' : 'bg-gray-300'}`}>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-ocean' : 'bg-gray-300'}`}>
          </div>
          {role === 'giya' &&
          <>
              <div
              className={`w-10 h-1 ${step >= 3 ? 'bg-ocean' : 'bg-gray-300'}`}>
            </div>
              <div
              className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-ocean' : 'bg-gray-300'}`}>
            </div>
            </>
          }
        </div>

        <Card className="p-8 shadow-xl">
          {step === 1 &&
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${role === 'tawo' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                onClick={() => setRole('tawo')}>

                  <div className="flex flex-col items-center text-center">
                    <div
                    className={`p-3 rounded-full mb-4 ${role === 'tawo' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'}`}>

                      <UserIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Tawo (Tourist)</h3>
                    <p className="text-sm text-gray-600">
                      I want to book tours and explore Davao del Norte.
                    </p>
                  </div>
                </div>

                <div
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${role === 'giya' ? 'border-olive bg-olive/10' : 'border-gray-200 hover:border-olive/50'}`}
                onClick={() => setRole('giya')}>

                  <div className="flex flex-col items-center text-center">
                    <div
                    className={`p-3 rounded-full mb-4 ${role === 'giya' ? 'bg-olive text-white' : 'bg-gray-100 text-gray-500'}`}>

                      <MapIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Giya (Guide)</h3>
                    <p className="text-sm text-gray-600">
                      I want to offer tours and share my local knowledge.
                    </p>
                  </div>
                </div>
              </div>

              <Button fullWidth onClick={handleNext} className="py-3 mt-6">
                Continue as {role === 'tawo' ? 'Tawo' : 'Giya'}
              </Button>
            </div>
          }

          {step === 2 &&
          <div className="space-y-6">
              <Input
              label="Full Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan dela Cruz" />

              <Input
              label="Email address"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" />

              <Input
              label="Password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" />

              <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••" />


              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-ocean focus:ring-ocean border-gray-300 rounded" />

                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-ocean hover:underline">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-ocean hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-1/3">

                  Back
                </Button>
                <Button
                onClick={handleNext}
                className="w-2/3"
                disabled={
                isLoading ||
                !formData.name ||
                !formData.email ||
                !formData.password
                }>

                  {role === 'tawo' ?
                isLoading ?
                'Creating Account...' :
                'Create Account' :
                'Next Step'}
                </Button>
              </div>
            </div>
          }

          {step === 3 && role === 'giya' &&
          <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Guide accounts require admin approval.
                  Please provide accurate information to speed up the
                  verification process.
                </p>
              </div>

              <Input
              label="Location / Municipality"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Samal Island, Tagum City" />


              <Input
              label="Specialties (comma separated)"
              name="specialties"
              value={formData.specialties}
              onChange={handleChange}
              placeholder="e.g., Island Hopping, Food Tours"
              helperText="What kind of tours do you specialize in?" />


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio / Description
                </label>
                <textarea
                name="bio"
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ocean focus:ring-ocean sm:text-sm px-4 py-2 border"
                placeholder="Tell tourists about yourself and what makes your tours special..."
                value={formData.bio}
                onChange={handleChange}>
              </textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proof of Identity / Credentials
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-ocean transition-colors cursor-pointer bg-gray-50">
                  <div className="space-y-1 text-center">
                    <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true">

                      <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round" />

                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <span className="relative cursor-pointer bg-white rounded-md font-medium text-ocean hover:text-ocean/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ocean">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Valid ID, Guide License, or Brgy Clearance (PNG, JPG, PDF
                      up to 10MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="w-1/3">

                  Back
                </Button>
                <Button
                onClick={handleSubmit}
                className="w-2/3"
                disabled={isLoading}>

                  {isLoading ?
                'Submitting Application...' :
                'Submit Application'}
                </Button>
              </div>
            </div>
          }

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-ocean hover:text-ocean/80">

              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>);

}