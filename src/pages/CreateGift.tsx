import { useState, useEffect } from 'react';
import { Upload, Link as LinkIcon, Check, Sparkles, Coins } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { OccasionType } from '../types';
import { occasions } from '../config/occasions';
import { supabase } from '../lib/supabase';
import { getAIMessage } from '../config/aiMessages';
import GiftPreview from '../components/GiftPreview';
import ShareGiftModal from '../components/ShareGiftModal';

export default function CreateGift() {
  const { t, language, dialect } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [occasion, setOccasion] = useState<OccasionType>('birthday');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const fetchCredits = async () => {
      if (!isAuthenticated || !user) {
        setCredits(0);
        return;
      }

      try {
        const { data } = await supabase
          .from('users')
          .select('credits')
          .eq('id', user.id)
          .maybeSingle();

        if (data) {
          setCredits(data.credits);
        }
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    fetchCredits();
  }, [user, isAuthenticated]);

  const handleGenerateAIMessage = async () => {
    setIsGeneratingAI(true);
    try {
      const generatedMessage = getAIMessage(language, dialect, occasion);
      setMessage(generatedMessage);
    } catch (error) {
      console.error('Error generating AI message:', error);
      alert('Failed to generate message. Please try again.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateLink = async () => {
    if (!message.trim()) return;

    if (!isAuthenticated || !user) {
      alert('Please login or register to create a gift!');
      return;
    }

    if (credits < 10) {
      alert('You do not have enough credits to create a gift. You need 10 credits per gift.');
      return;
    }

    setIsGenerating(true);
    try {
      let imageUrl = '';

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gift-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('gift-images')
          .getPublicUrl(uploadData.path);

        imageUrl = urlData.publicUrl;
      }

      const { data: giftData, error: giftError } = await supabase
        .from('gifts')
        .insert({
          occasion,
          message: message.trim(),
          sender_name: senderName.trim(),
          image_url: imageUrl,
          user_id: user?.id || null,
        })
        .select()
        .single();

      if (giftError) throw giftError;

      const newCredits = credits - 10;
      await supabase
        .from('users')
        .update({ credits: newCredits })
        .eq('id', user.id);

      await supabase
        .from('credits_history')
        .insert({
          user_id: user.id,
          amount: -10,
          balance_after: newCredits,
          transaction_type: 'gift_creation',
          description: 'Created a gift',
        });

      setCredits(newCredits);

      const link = `${window.location.origin}/gift/${giftData.id}`;
      setGeneratedLink(link);
      setShowShareModal(true);
    } catch (error) {
      console.error('Error creating gift:', error);
      alert('Failed to create gift. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setGeneratedLink('');
    setMessage('');
    setSenderName('');
    setImageFile(null);
    setImagePreview('');
    setOccasion('birthday');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {t('createGiftTitle')}
          </h2>
          {isAuthenticated && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg shadow-md border border-green-200 dark:border-green-800">
              <Coins size={20} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Credits: {credits}
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('selectOccasion')}
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value as OccasionType)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {Object.entries(occasions).map(([key, theme]) => (
                  <option key={key} value={key}>
                    {theme.name[language]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('yourMessage')}
                </label>
                <button
                  type="button"
                  onClick={handleGenerateAIMessage}
                  disabled={isGeneratingAI}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white text-xs font-medium rounded-lg transition-all disabled:cursor-not-allowed"
                >
                  <Sparkles size={14} className={isGeneratingAI ? 'animate-spin' : ''} />
                  <span>{isGeneratingAI ? (language === 'ar' ? 'جاري الكتابة...' : 'Writing...') : (language === 'ar' ? 'اكتب بالذكاء' : 'Write with AI')}</span>
                </button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('messagePlaceholder')}
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('senderName')}
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={t('senderPlaceholder')}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('uploadImage')}
              </label>
              <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-rose-500 dark:hover:border-rose-400 cursor-pointer transition-colors">
                <Upload size={20} />
                <span>{imageFile ? imageFile.name : t('uploadImage')}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={handleGenerateLink}
              disabled={!message.trim() || isGenerating}
              className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed"
            >
              {isGenerating ? '...' : t('generateLink')}
            </button>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
              {t('preview')}
            </h3>
            <GiftPreview
              occasion={occasion}
              message={message}
              senderName={senderName}
              imageUrl={imagePreview}
            />
          </div>
        </div>
      </div>

      {showShareModal && generatedLink && (
        <ShareGiftModal giftUrl={generatedLink} onClose={handleCloseShareModal} />
      )}
    </div>
  );
}
