import { X, Mail, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactProps {
  onClose: () => void;
}

export default function Contact({ onClose }: ContactProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {t('contactUs')}
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We'd love to hear from you! Reach out to us through any of these channels.
        </p>

        <div className="space-y-6">
          <a
            href="mailto:ahmedmakky30@gmail.com"
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
              <Mail className="text-rose-600 dark:text-rose-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">ahmedmakky30@gmail.com</p>
            </div>
          </a>

          <a
            href="tel:+201021440161"
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Phone className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+20 102 144 0161</p>
            </div>
          </a>

          <a
            href="https://wa.me/201021440161"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <MessageCircle className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">WhatsApp</h3>
              <p className="text-gray-600 dark:text-gray-400">+20 102 144 0161</p>
            </div>
          </a>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (EST)
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-300 mt-2">
            We typically respond within 24 hours during business days.
          </p>
        </div>
      </div>
    </div>
  );
}
