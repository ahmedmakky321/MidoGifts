import { X, Moon, Sun, Globe, Volume2, VolumeX, Zap, ZapOff, Languages, Coins, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Language, ArabicDialect } from '../types';
import { dialectNames } from '../config/translations';
import { supabase } from '../lib/supabase';

interface SettingsProps {
  onClose: () => void;
}

interface UserProfile {
  email: string;
  credits: number;
}

export default function Settings({ onClose }: SettingsProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, dialect, setLanguage, setDialect, t } = useLanguage();
  const { user } = useAuth();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showDialectDropdown, setShowDialectDropdown] = useState(false);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('users')
        .select('credits')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      setCredits(data?.credits || 0);
    } catch (err) {
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedSound = localStorage.getItem('midogifts-sound');
    const savedAnimations = localStorage.getItem('midogifts-animations');

    if (savedSound !== null) {
      setSoundEnabled(savedSound === 'true');
    }
    if (savedAnimations !== null) {
      setAnimationsEnabled(savedAnimations === 'true');
    }

    fetchUserProfile();
  }, [user]);

  const handleSoundToggle = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('midogifts-sound', String(newValue));
  };

  const handleAnimationsToggle = () => {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    localStorage.setItem('midogifts-animations', String(newValue));

    if (newValue) {
      document.documentElement.classList.remove('reduce-animations');
    } else {
      document.documentElement.classList.add('reduce-animations');
    }
  };

  const languageNames: Record<Language, string> = {
    en: 'English',
    ar: 'العربية',
    franco: 'Franco (عربيزي)',
    fr: 'Français',
    es: 'Español'
  };

  const dialects: ArabicDialect[] = [
    'msa', 'egyptian', 'saudi', 'emirati', 'kuwaiti', 'yemeni',
    'jordanian', 'palestinian', 'lebanese', 'syrian',
    'moroccan', 'algerian', 'tunisian', 'sudanese'
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const handleDialectSelect = (d: ArabicDialect) => {
    setDialect(d);
    setShowDialectDropdown(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {t('languageSelector')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {user && (
            <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                {language === 'ar' ? 'الحساب' : language === 'fr' ? 'Compte' : language === 'es' ? 'Cuenta' : language === 'franco' ? 'El Hesab' : 'Account'}
              </h3>

              <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-1">
                  <Coins size={20} className="text-green-600 dark:text-green-400" />
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'الرصيد' : language === 'fr' ? 'Crédits' : language === 'es' ? 'Créditos' : language === 'franco' ? 'El Raseed' : 'Credits'}
                  </span>
                </div>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} className="text-green-600 dark:text-green-400 animate-spin" />
                    <p className="text-lg text-green-600 dark:text-green-400">
                      {language === 'ar' ? 'جاري التحميل...' : language === 'fr' ? 'Chargement...' : 'Loading...'}
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {credits}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('email')}
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    {user.email}
                  </p>
                </div>

                {user.user_metadata?.display_name && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('displayName')}
                    </p>
                    <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                      {user.user_metadata.display_name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
              {language === 'ar' ? 'اللغة' : language === 'fr' ? 'Langue' : language === 'es' ? 'Idioma' : language === 'franco' ? 'El Logha' : 'Language'}
            </h3>

            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('languageSelector')}
                </label>
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-rose-500 dark:hover:border-rose-400 transition-colors"
                >
                  <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <Languages size={18} />
                    {languageNames[language]}
                  </span>
                  <Globe size={18} className="text-gray-400" />
                </button>

                {showLanguageDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {(Object.keys(languageNames) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageSelect(lang)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          language === lang ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-medium' : 'text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {language === 'ar' && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('dialectSelector')}
                  </label>
                  <button
                    onClick={() => setShowDialectDropdown(!showDialectDropdown)}
                    className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-rose-500 dark:hover:border-rose-400 transition-colors"
                  >
                    <span className="text-gray-800 dark:text-gray-200">
                      {dialectNames[dialect].ar}
                    </span>
                    <Globe size={18} className="text-gray-400" />
                  </button>

                  {showDialectDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                      {dialects.map((d) => (
                        <button
                          key={d}
                          onClick={() => handleDialectSelect(d)}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            dialect === d ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-medium' : 'text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          {dialectNames[d].ar}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mt-6">
              {language === 'ar' ? 'المظهر والتفضيلات' : language === 'fr' ? 'Apparence & Préférences' : language === 'es' ? 'Apariencia & Preferencias' : language === 'franco' ? 'El Mazhar wel Tafdeelat' : 'Appearance & Preferences'}
            </h3>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                {theme === 'light' ? (
                  <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Moon size={20} className="text-gray-700 dark:text-gray-300" />
                )}
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {language === 'ar' ? 'المظهر' : language === 'fr' ? 'Thème' : language === 'es' ? 'Tema' : language === 'franco' ? 'El Mazhar' : 'Theme'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {theme === 'light'
                      ? language === 'ar' ? 'فاتح' : language === 'fr' ? 'Clair' : language === 'es' ? 'Claro' : language === 'franco' ? 'Fate7' : 'Light'
                      : language === 'ar' ? 'داكن' : language === 'fr' ? 'Sombre' : language === 'es' ? 'Oscuro' : language === 'franco' ? 'Daaken' : 'Dark'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-rose-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                {animationsEnabled ? (
                  <Zap size={20} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <ZapOff size={20} className="text-gray-700 dark:text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {language === 'ar' ? 'الحركات' : language === 'fr' ? 'Animations' : language === 'es' ? 'Animaciones' : language === 'franco' ? 'El 7arakat' : 'Animations'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {animationsEnabled
                      ? language === 'ar' ? 'مفعّلة' : language === 'fr' ? 'Activées' : language === 'es' ? 'Activadas' : language === 'franco' ? 'Mefaa3la' : 'Enabled'
                      : language === 'ar' ? 'معطّلة' : language === 'fr' ? 'Désactivées' : language === 'es' ? 'Desactivadas' : language === 'franco' ? 'Me3attala' : 'Disabled'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleAnimationsToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  animationsEnabled ? 'bg-rose-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 size={20} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <VolumeX size={20} className="text-gray-700 dark:text-gray-300" />
                )}
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {language === 'ar' ? 'الأصوات' : language === 'fr' ? 'Son' : language === 'es' ? 'Sonido' : language === 'franco' ? 'El Aswat' : 'Sound'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {soundEnabled
                      ? language === 'ar' ? 'مفعّلة' : language === 'fr' ? 'Activé' : language === 'es' ? 'Activado' : language === 'franco' ? 'Mefaa3al' : 'Enabled'
                      : language === 'ar' ? 'معطّلة' : language === 'fr' ? 'Désactivé' : language === 'es' ? 'Desactivado' : language === 'franco' ? 'Me3attal' : 'Disabled'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSoundToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  soundEnabled ? 'bg-rose-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
