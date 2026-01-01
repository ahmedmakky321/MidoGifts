import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyProps {
  onClose: () => void;
}

export default function Privacy({ onClose }: PrivacyProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {t('privacyPolicy')}
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Last updated: January 1, 2026
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We collect information you provide directly to us when you create an account,
            create gifts, or interact with our services. This may include your name, email address,
            and the content of your gifts.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We use the information we collect to provide, maintain, and improve our services,
            to develop new features, and to protect MidoGifts and our users.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            3. Information Sharing
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We do not share your personal information with third parties except as described
            in this policy or with your consent.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            4. Data Security
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We take reasonable measures to help protect your personal information from loss,
            theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            5. Your Rights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You have the right to access, update, or delete your personal information at any time.
            You can do this through your account settings or by contacting us.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            6. Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions about this Privacy Policy, please contact us at
            privacy@midogifts.com
          </p>
        </div>
      </div>
    </div>
  );
}
