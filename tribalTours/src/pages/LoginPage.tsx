import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { UserIcon, MapIcon } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'tawo' | 'giya'>('tawo');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Use selected role, but allow admin override for demo
      const finalRole = email.includes('admin') ? 'admin' : role;
      login(email, finalRole);
      setIsLoading(false);
      // Redirect based on role
      if (finalRole === 'admin') navigate('/admin-dashboard');else
      if (finalRole === 'giya') navigate('/giya-dashboard');else
      navigate('/tawo-dashboard');
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome back to <span className="text-ocean">Tribal</span>
            <span className="text-olive">Tours</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="p-8 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center text-center ${role === 'tawo' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                onClick={() => setRole('tawo')}>

                <UserIcon
                  className={`w-6 h-6 mb-2 ${role === 'tawo' ? 'text-amber-600' : 'text-gray-400'}`} />

                <span
                  className={`text-sm font-bold ${role === 'tawo' ? 'text-amber-800' : 'text-gray-600'}`}>

                  Tawo (Tourist)
                </span>
              </div>
              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center text-center ${role === 'giya' ? 'border-olive bg-olive/10' : 'border-gray-200 hover:border-olive/50'}`}
                onClick={() => setRole('giya')}>

                <MapIcon
                  className={`w-6 h-6 mb-2 ${role === 'giya' ? 'text-olive' : 'text-gray-400'}`} />

                <span
                  className={`text-sm font-bold ${role === 'giya' ? 'text-olive' : 'text-gray-600'}`}>

                  Giya (Guide)
                </span>
              </div>
            </div>

            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" />


            <div>
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" />

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-ocean focus:ring-ocean border-gray-300 rounded" />

                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900">

                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-ocean hover:text-ocean/80">

                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="py-3">

              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Facebook
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-ocean hover:text-ocean/80">

              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>);

}