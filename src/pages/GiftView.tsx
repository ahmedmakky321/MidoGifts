import { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Gift } from '../types';
import { occasions } from '../config/occasions';
import { supabase } from '../lib/supabase';
import ShareGiftModal from '../components/ShareGiftModal';

interface GiftViewProps {
  giftId: string;
  onCreateAnother: () => void;
}

export default function GiftView({ giftId, onCreateAnother }: GiftViewProps) {
  const { t, language } = useLanguage();
  const [gift, setGift] = useState<Gift | null>(null);
  const [isOpening, setIsOpening] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const { data, error } = await supabase
          .from('gifts')
          .select('*')
          .eq('id', giftId)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          alert('Gift not found');
          onCreateAnother();
          return;
        }

        setGift(data);
        setLoading(false);

        setTimeout(() => {
          setIsOpening(false);
        }, 3000);
      } catch (error) {
        console.error('Error fetching gift:', error);
        alert('Failed to load gift');
        onCreateAnother();
      }
    };

    fetchGift();
  }, [giftId, onCreateAnother]);

  if (loading || !gift) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('openingGift')}</p>
        </div>
      </div>
    );
  }

  const theme = occasions[gift.occasion];

  if (isOpening) {
    return (
      <div
        className="min-h-screen flex items-center justify-center overflow-hidden relative"
        style={{ background: theme.colors.background }}
      >
        <OpeningAnimation animation={theme.animation} decorations={theme.decorations} />
        <div className="text-center z-10">
          <p className="text-2xl font-light" style={{ color: theme.colors.text }}>
            {t('openingGift')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      <BackgroundDecorations decorations={theme.decorations} />

      <div className="max-w-2xl w-full space-y-8 animate-fade-in z-10">
        <div className="flex justify-center gap-4 text-5xl animate-float">
          {theme.decorations.map((decoration, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.2}s` }}>
              {decoration}
            </span>
          ))}
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold text-center"
          style={{ color: theme.colors.text }}
        >
          {theme.name[language]}
        </h1>

        {gift.image_url && (
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
              <img src={gift.image_url} alt="Gift" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <p
            className="text-xl md:text-2xl text-center leading-relaxed whitespace-pre-wrap"
            style={{ color: theme.colors.text }}
          >
            {gift.message}
          </p>
        </div>

        {gift.sender_name && (
          <p
            className="text-lg text-center opacity-90 italic"
            style={{ color: theme.colors.text }}
          >
            {t('from')} {gift.sender_name}
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-lg font-semibold transition-all shadow-lg"
            style={{ color: theme.colors.text }}
          >
            <Share2 size={20} />
            <span>{t('shareYourGift')}</span>
          </button>
          <button
            onClick={onCreateAnother}
            className="px-6 py-3 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-lg font-semibold transition-all shadow-lg"
            style={{ color: theme.colors.text }}
          >
            {t('createAnother')}
          </button>
        </div>
      </div>

      {showShareModal && (
        <ShareGiftModal
          giftUrl={`${window.location.origin}/gift/${giftId}`}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}

function OpeningAnimation({ animation, decorations }: { animation: string; decorations: string[] }) {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  if (animation === 'confetti' || animation === 'celebrate') {
    return (
      <>
        {particles.map((i) => (
          <div
            key={i}
            className="absolute text-3xl animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {decorations[Math.floor(Math.random() * decorations.length)]}
          </div>
        ))}
      </>
    );
  }

  if (animation === 'snow') {
    return (
      <>
        {particles.map((i) => (
          <div
            key={i}
            className="absolute text-3xl animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            ❄️
          </div>
        ))}
      </>
    );
  }

  return null;
}

function BackgroundDecorations({ decorations }: { decorations: string[] }) {
  const particles = Array.from({ length: 10 }, (_, i) => i);

  return (
    <>
      {particles.map((i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          {decorations[Math.floor(Math.random() * decorations.length)]}
        </div>
      ))}
    </>
  );
}
