import { useState, useEffect } from 'react';
import { Lightbulb, X, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface SuggestionModalProps {
  onClose: () => void;
}

export default function SuggestionModal({ onClose }: SuggestionModalProps) {
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [suggestion, setSuggestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, submitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setSubmitting(true);

    try {
      await supabase.from('suggestions').insert({
        user_id: user?.id || null,
        text_content: suggestion.trim(),
        language: language,
        user_type: isAuthenticated ? 'logged_in' : 'guest',
        status: 'pending',
      });

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('Failed to submit suggestion. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {t('suggestionSubmitted')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We appreciate your feedback!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
              <Lightbulb size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {t('suggestIdea')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder={t('suggestionPlaceholder')}
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
              required
            />
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
              {suggestion.length} characters
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !suggestion.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed"
          >
            <Send size={20} />
            <span>{submitting ? t('loading') : t('submitSuggestion')}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
