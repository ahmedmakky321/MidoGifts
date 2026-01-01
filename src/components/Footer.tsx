import { useState } from 'react';
import { Mail, Phone, MessageCircle, Star, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import VisitorCounter from './VisitorCounter';

interface FooterProps {
  onOpenRating: () => void;
  onOpenSuggestion: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenContact: () => void;
  onOpenReviews: () => void;
}

export default function Footer({
  onOpenRating,
  onOpenSuggestion,
  onOpenPrivacy,
  onOpenTerms,
  onOpenContact,
  onOpenReviews,
}: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {t('contact')}
            </h3>
            <div className="space-y-2">
              <a
                href="tel:+201021440161"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                <Phone size={16} />
                <span>+20 102 144 0161</span>
              </a>
              <a
                href="https://wa.me/201021440161"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:ahmedmakky30@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail size={16} />
                <span>ahmedmakky30@gmail.com</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {t('quickLinks')}
            </h3>
            <div className="space-y-2">
              <button
                onClick={onOpenPrivacy}
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                {t('privacyPolicy')}
              </button>
              <button
                onClick={onOpenTerms}
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                {t('termsOfService')}
              </button>
              <button
                onClick={onOpenContact}
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                {t('contactUs')}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {t('community')}
            </h3>
            <div className="space-y-2">
              <button
                onClick={onOpenRating}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                <Star size={16} />
                <span>{t('rateUs')}</span>
              </button>
              <button
                onClick={onOpenReviews}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                <span>View Reviews</span>
              </button>
              <button
                onClick={onOpenSuggestion}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Lightbulb size={16} />
                <span>{t('suggestFeature')}</span>
              </button>
              <div className="pt-2">
                <VisitorCounter />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2026 MidoGifts. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
