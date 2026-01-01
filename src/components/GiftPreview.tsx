import { OccasionType } from '../types';
import { occasions } from '../config/occasions';
import { useLanguage } from '../contexts/LanguageContext';

interface GiftPreviewProps {
  occasion: OccasionType;
  message: string;
  senderName: string;
  imageUrl?: string;
}

export default function GiftPreview({ occasion, message, senderName, imageUrl }: GiftPreviewProps) {
  const { t, language } = useLanguage();
  const theme = occasions[occasion];

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[3/4] max-w-md mx-auto"
      style={{ background: theme.colors.background }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
        <div className="flex gap-3 text-4xl animate-float">
          {theme.decorations.map((decoration, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.2}s` }}>
              {decoration}
            </span>
          ))}
        </div>

        <h2
          className="text-3xl font-bold text-center"
          style={{ color: theme.colors.text }}
        >
          {theme.name[language]}
        </h2>

        {imageUrl && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
            <img src={imageUrl} alt="Gift" className="w-full h-full object-cover" />
          </div>
        )}

        <div
          className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 max-w-sm"
        >
          <p
            className="text-center text-lg leading-relaxed whitespace-pre-wrap"
            style={{ color: theme.colors.text }}
          >
            {message || t('messagePlaceholder')}
          </p>
        </div>

        {senderName && (
          <p
            className="text-sm opacity-80 italic"
            style={{ color: theme.colors.text }}
          >
            {t('from')} {senderName}
          </p>
        )}
      </div>
    </div>
  );
}
