import { Gift, Heart } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-xl' },
    md: { icon: 32, text: 'text-2xl' },
    lg: { icon: 48, text: 'text-4xl' },
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Gift
          size={sizes[size].icon}
          className="text-rose-500 dark:text-rose-400"
          strokeWidth={2}
        />
        <Heart
          size={sizes[size].icon * 0.4}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-600 dark:text-rose-300 fill-current"
          strokeWidth={0}
        />
      </div>
      {showText && (
        <span
          className={`${sizes[size].text} font-bold bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent`}
        >
          MidoGifts
        </span>
      )}
    </div>
  );
}
