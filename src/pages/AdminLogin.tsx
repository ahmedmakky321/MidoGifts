import { useState, useEffect } from 'react';
import { Shield, Lock, User, X, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdminLoginProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLogin({ onClose, onSuccess }: AdminLoginProps) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, loading]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      const ADMIN_USERNAME = 'admin123';
      const ADMIN_PASSWORD = 'admin12345';

      await new Promise(resolve => setTimeout(resolve, 800));

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('midogifts-admin', JSON.stringify({ username, role: 'admin' }));
        setSuccess(true);
        setLoading(false);

        setTimeout(() => {
          onSuccess();
        }, 500);
      } else {
        setError('Invalid username or password. Please check your credentials and try again.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={!loading ? onClose : undefined}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
              <Shield size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Admin Access
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm animate-slideDown">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 text-sm animate-slideDown flex items-center gap-2">
            <Check size={18} />
            <span>Login successful! Redirecting to dashboard...</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading || success}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || success}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed btn-hover"
          >
            {success ? (
              <>
                <Check size={20} />
                <span>Success!</span>
              </>
            ) : (
              <>
                <Shield size={20} className={loading ? 'animate-pulse' : ''} />
                <span>{loading ? 'Authenticating...' : 'Login as Admin'}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
