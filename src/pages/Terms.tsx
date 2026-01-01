import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsProps {
  onClose: () => void;
}

export default function Terms({ onClose }: TermsProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {t('termsOfService')}
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
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            By accessing and using MidoGifts, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            2. Use License
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Permission is granted to temporarily use MidoGifts for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            3. User Content
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You retain all rights to any content you submit, post or display on or through
            the service. By submitting content, you grant us a worldwide, non-exclusive,
            royalty-free license to use, copy, reproduce, process, and display your content.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            4. Prohibited Uses
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You may not use MidoGifts for any illegal or unauthorized purpose. You must not
            transmit any worms or viruses or any code of a destructive nature.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            5. Disclaimer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The materials on MidoGifts are provided on an 'as is' basis. MidoGifts makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            6. Limitations
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            In no event shall MidoGifts or its suppliers be liable for any damages arising
            out of the use or inability to use the materials on MidoGifts.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            7. Revisions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            MidoGifts may revise these terms of service at any time without notice. By using
            this service you are agreeing to be bound by the then current version of these terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            8. Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions about these Terms, please contact us at
            support@midogifts.com
          </p>
        </div>
      </div>
    </div>
  );
}
