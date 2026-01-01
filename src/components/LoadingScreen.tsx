import { useEffect, useState } from 'react';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="animate-bounce-slow">
        <Logo size="lg" showText={false} />
      </div>
      <p className="mt-6 text-2xl font-light text-gray-700 dark:text-gray-300 animate-fade-in">
        {t('loading')}
      </p>
    </div>
  );
}
