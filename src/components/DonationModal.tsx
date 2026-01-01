import { useEffect, useState } from 'react';
import { Heart, X } from 'lucide-react';

export default function DonationModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenDonation = localStorage.getItem('hasSeenDonation');
    if (!hasSeenDonation) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenDonation', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mb-4">
            <Heart size={32} className="text-white" fill="currentColor" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            ادعم التطبيق
          </h2>

          <div className="text-right mb-6 space-y-3 text-gray-700 dark:text-gray-300">
            <p className="text-lg">لو عجبك التطبيق وعايز تدعمني ❤️</p>
            <p className="text-lg">تقدر تحول دونيشن على الرقم:</p>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 my-4">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 select-all">
                01021440161
              </p>
            </div>
            <p className="text-base">دعمك بيفرق وبيخلّيني أكمّل التطوير 🙏</p>
          </div>

          <button
            onClick={handleClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
          >
            متابعة استخدام التطبيق
          </button>
        </div>
      </div>
    </div>
  );
}
