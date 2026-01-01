import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export default function VisitorCounter() {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const trackVisit = async () => {
      let visitorId = localStorage.getItem('midogifts-visitor-id');
      const lastVisit = localStorage.getItem('midogifts-last-visit');

      const now = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      const shouldCount = !visitorId || !lastVisit || (now - parseInt(lastVisit)) > twentyFourHours;

      if (shouldCount) {
        if (!visitorId) {
          visitorId = crypto.randomUUID();
          localStorage.setItem('midogifts-visitor-id', visitorId);
        }

        localStorage.setItem('midogifts-last-visit', now.toString());

        try {
          const { data: existing } = await supabase
            .from('visitor_counter')
            .select('id, visited_at')
            .eq('session_id', visitorId)
            .maybeSingle();

          if (existing) {
            await supabase
              .from('visitor_counter')
              .update({ visited_at: new Date().toISOString() })
              .eq('session_id', visitorId);
          } else {
            await supabase.from('visitor_counter').insert({
              session_id: visitorId,
            });
          }
        } catch (error) {
          console.error('Error tracking visit:', error);
        }
      }

      const { count: totalCount } = await supabase
        .from('visitor_counter')
        .select('*', { count: 'exact', head: true });

      setCount(totalCount || 0);
    };

    trackVisit();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <Users size={16} />
      <span>
        {formatNumber(count)} {t('visitors')}
      </span>
    </div>
  );
}
