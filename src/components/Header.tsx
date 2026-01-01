import { useState, useEffect } from 'react';
import { Moon, Sun, Globe, LogIn, User, LogOut, Settings, Coins } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Logo from './Logo';

interface HeaderProps {
  onOpenSettings: () => void;
}

export default function Header({ onOpenSettings }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { user, isAuthenticated, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('credits')
          .eq('id', user.id)
          .maybeSingle();

        if (data) {
          setCredits(data.credits);
        }
      } else {
        setCredits(null);
      }
    };

    fetchCredits();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.display_name || user.email?.split('@')[0] || 'User';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo size="sm" />

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={20} className="text-gray-700 dark:text-gray-300" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun size={20} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {isAuthenticated ? (
            <>
              <div
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border border-green-200 dark:border-green-800"
                title="Resets daily"
              >
                <Coins size={18} className="text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  {credits ?? 0} / 100
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 hidden sm:inline">
                  Daily
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <User size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                    {getUserDisplayName()}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <button
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenSettings();
                      }}
                    >
                      <Settings size={18} className="text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Settings</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left border-t border-gray-200 dark:border-gray-700"
                    >
                      <LogOut size={18} className="text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
