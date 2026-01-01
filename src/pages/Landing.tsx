import { Sparkles, Gift, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from '../components/Logo';

interface LandingProps {
  onStart: () => void;
  onOpenLogin: () => void;
}

export default function Landing({ onStart, onOpenLogin }: LandingProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center animate-float">
          <Logo size="lg" showText={false} />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
            {t('landingTitle')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            {t('landingSubtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>{t('startButton')}</span>
            <Sparkles size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          </button>

          <button
            onClick={onOpenLogin}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-rose-500 dark:border-rose-400 text-rose-600 dark:text-rose-400 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>{t('login')}</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-12 max-w-md mx-auto">
          <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400">
            <Gift size={24} className="text-rose-500 dark:text-rose-400" />
            <span className="text-sm">10+ Occasions</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400">
            <Heart size={24} className="text-rose-500 dark:text-rose-400" />
            <span className="text-sm">Beautiful Designs</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400">
            <Sparkles size={24} className="text-rose-500 dark:text-rose-400" />
            <span className="text-sm">Easy Sharing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
