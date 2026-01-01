import { useEffect, useState } from 'react';
import { Shield, Users, Gift, TrendingUp, LogOut, BarChart3, RefreshCw, Lightbulb, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Suggestion {
  id: string;
  text_content: string;
  language: string;
  user_type: string;
  created_at: string;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalGifts: 0,
    totalUsers: 0,
    giftsToday: 0,
    giftsThisWeek: 0,
    totalSuggestions: 0,
    totalRatings: 0,
    avgRating: 0
  });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    const adminData = localStorage.getItem('midogifts-admin');
    if (!adminData) {
      window.location.href = '/';
      return;
    }

    fetchStats();
    fetchSuggestions();
  }, []);

  useEffect(() => {
    let filtered = suggestions;

    if (filterLanguage !== 'all') {
      filtered = filtered.filter(s => s.language === filterLanguage);
    }

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.text_content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSuggestions(filtered);
  }, [suggestions, filterLanguage, searchTerm]);

  const fetchStats = async () => {
    try {
      const { count: totalGifts } = await supabase
        .from('gifts')
        .select('*', { count: 'exact', head: true });

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count: giftsToday } = await supabase
        .from('gifts')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const { count: giftsThisWeek } = await supabase
        .from('gifts')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString());

      const { count: totalSuggestions } = await supabase
        .from('suggestions')
        .select('*', { count: 'exact', head: true });

      const { data: ratingsData } = await supabase
        .from('ratings')
        .select('star_rating');

      const totalRatings = ratingsData?.length || 0;
      const avgRating = totalRatings > 0
        ? ratingsData!.reduce((sum, r) => sum + r.star_rating, 0) / totalRatings
        : 0;

      setStats({
        totalGifts: totalGifts || 0,
        totalUsers: 0,
        giftsToday: giftsToday || 0,
        giftsThisWeek: giftsThisWeek || 0,
        totalSuggestions: totalSuggestions || 0,
        totalRatings,
        avgRating
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const { data, error } = await supabase
        .from('suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleRefreshSuggestions = () => {
    fetchSuggestions();
  };

  const handleLogout = () => {
    localStorage.removeItem('midogifts-admin');
    onLogout();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const languages = Array.from(new Set(suggestions.map(s => s.language)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Shield size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Welcome, Admin
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and manage MidoGifts platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Gift size={24} className="text-blue-500" />
              </div>
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              Total Gifts
            </h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {stats.totalGifts}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <BarChart3 size={24} className="text-green-500" />
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              Gifts This Week
            </h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {stats.giftsThisWeek}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Lightbulb size={24} className="text-yellow-500" />
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              Suggestions
            </h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {stats.totalSuggestions}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Star size={24} className="text-orange-500" />
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              Avg Rating
            </h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {stats.avgRating.toFixed(1)} ({stats.totalRatings})
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Lightbulb size={24} className="text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                User Suggestions
              </h3>
            </div>
            <button
              onClick={handleRefreshSuggestions}
              disabled={loadingSuggestions}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={loadingSuggestions ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>

          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search suggestions..."
              className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang.toUpperCase()}</option>
              ))}
            </select>
          </div>

          {loadingSuggestions ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : filteredSuggestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No suggestions found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        suggestion.user_type === 'logged_in'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {suggestion.user_type === 'logged_in' ? 'User' : 'Guest'}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                        {suggestion.language.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(suggestion.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {suggestion.text_content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
