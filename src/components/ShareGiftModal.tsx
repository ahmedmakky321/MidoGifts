import { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, Download } from 'lucide-react';
import QRCode from 'qrcode';
import { useLanguage } from '../contexts/LanguageContext';

interface ShareGiftModalProps {
  giftUrl: string;
  onClose: () => void;
}

export default function ShareGiftModal({ giftUrl, onClose }: ShareGiftModalProps) {
  const { t } = useLanguage();
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(giftUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    }).then(setQrCode);
  }, [giftUrl]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(giftUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`Check out this gift I made for you! ${giftUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.download = 'midogifts-qrcode.png';
    link.href = qrCode;
    link.click();
  };

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
            <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg">
              <Share2 size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {t('shareYourGift')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="space-y-6">
          {qrCode && (
            <div className="bg-white p-4 rounded-xl flex flex-col items-center">
              <img src={qrCode} alt="QR Code" className="w-64 h-64" />
              <button
                onClick={handleDownloadQR}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
              >
                <Download size={18} />
                <span className="text-sm font-medium">{t('downloadQR')}</span>
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('giftLink')}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={giftUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span className="text-sm font-medium">
                  {copied ? t('copied') : t('copy')}
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
          >
            <Share2 size={20} />
            <span>{t('shareViaWhatsApp')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
