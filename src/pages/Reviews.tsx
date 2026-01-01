import { useEffect, useState } from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface Rating {
  id: string;
  star_rating: number;
  review_text: string;
  created_at: string;
}

interface ReviewsProps {
  onGoBack: () => void;
}

export default function Reviews({ onGoBack }: ReviewsProps) {
  const { t } = useLanguage();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const ratingsData = data || [];
      setRatings(ratingsData);

      const total = ratingsData.length;
      const average = total > 0
        ? ratingsData.reduce((sum, r) => sum + r.star_rating, 0) / total
        : 0;

      const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      ratingsData.forEach(r => {
        distribution[r.star_rating as keyof typeof distribution]++;
      });

      setStats({ total, average, distribution });
    } catch (error) {
      console.error('Error fetching ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              User Reviews
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See what our users are saying about MidoGifts
            </p>

            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl font-bold text-gray-800 dark:text-gray-100">
                  {stats.average.toFixed(1)}
                </span>
                <Star size={40} className="text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Based on {stats.total} {stats.total === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                    {stars} ★
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${stats.total > 0 ? (stats.distribution[stars as keyof typeof stats.distribution] / stats.total) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {stats.distribution[stars as keyof typeof stats.distribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {ratings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <Star size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Recent Reviews
            </h2>
            {ratings.map((rating) => (
              <div
                key={rating.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={`${
                          star <= rating.star_rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(rating.created_at)}
                  </span>
                </div>
                {rating.review_text && (
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {rating.review_text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
