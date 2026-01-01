import { useState, useEffect } from 'react';
import { Star, X, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface RatingModalProps {
  onClose: () => void;
}

export default function RatingModal({ onClose }: RatingModalProps) {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
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
    if (rating === 0) return;

    setSubmitting(true);

    try {
      const userIdentifier = localStorage.getItem('midogifts-device-id') || crypto.randomUUID();
      localStorage.setItem('midogifts-device-id', userIdentifier);

      await supabase.from('ratings').insert({
        user_identifier: userIdentifier,
        star_rating: rating,
        review_text: review.trim(),
      });

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. You may have already rated.');
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
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={32} className="text-yellow-500 fill-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {t('thankYouRating')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your feedback helps us improve!
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
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {t('rateApp')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all hover:scale-110"
              >
                <Star
                  size={40}
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('reviewOptional')}
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder={t('reviewPlaceholder')}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || rating === 0}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed"
          >
            <Send size={20} />
            <span>{submitting ? t('loading') : t('submitRating')}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
