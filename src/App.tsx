import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import CreateGift from './pages/CreateGift';
import GiftView from './pages/GiftView';
import Reviews from './pages/Reviews';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import SuggestionModal from './components/SuggestionModal';
import RatingModal from './components/RatingModal';
import DonationModal from './components/DonationModal';

type Page = 'landing' | 'create' | 'view' | 'admin' | 'reviews';
type Modal = 'login' | 'register' | 'admin' | 'privacy' | 'terms' | 'contact' | 'suggestion' | 'rating' | 'settings' | null;

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [giftId, setGiftId] = useState<string>('');
  const [activeModal, setActiveModal] = useState<Modal>(null);
  const [navigationHistory, setNavigationHistory] = useState<Page[]>(['landing']);

  useEffect(() => {
    const hasVisited = localStorage.getItem('midogifts-visited');
    if (hasVisited) {
      setShowLoading(false);
    }

    const path = window.location.pathname;
    const giftMatch = path.match(/\/gift\/([a-f0-9-]+)/);

    if (giftMatch) {
      setGiftId(giftMatch[1]);
      setCurrentPage('view');
      setShowLoading(false);
    } else if (path === '/admin') {
      const adminData = localStorage.getItem('midogifts-admin');
      if (adminData) {
        setCurrentPage('admin');
        setShowLoading(false);
      } else {
        window.history.pushState({}, '', '/');
        setShowLoading(false);
      }
    } else if (path === '/reviews') {
      setCurrentPage('reviews');
      setShowLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    localStorage.setItem('midogifts-visited', 'true');
    setShowLoading(false);
  };

  const navigateToPage = (page: Page, path: string) => {
    setCurrentPage(page);
    setNavigationHistory(prev => [...prev, page]);
    window.history.pushState({}, '', path);
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousPage = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentPage(previousPage);

      const paths: Record<Page, string> = {
        landing: '/',
        create: '/create',
        view: `/gift/${giftId}`,
        admin: '/admin',
        reviews: '/reviews'
      };
      window.history.pushState({}, '', paths[previousPage]);
    } else {
      setCurrentPage('landing');
      setNavigationHistory(['landing']);
      window.history.pushState({}, '', '/');
    }
  };

  const handleStart = () => {
    navigateToPage('create', '/create');
  };

  const handleCreateAnother = () => {
    setGiftId('');
    navigateToPage('create', '/create');
  };

  const handleAdminLogout = () => {
    setCurrentPage('landing');
    setNavigationHistory(['landing']);
    window.history.pushState({}, '', '/');
  };

  const handleOpenReviews = () => {
    navigateToPage('reviews', '/reviews');
  };

  if (showLoading) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <LoadingScreen onComplete={handleLoadingComplete} />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <DonationModal />
          {currentPage === 'admin' ? (
            <AdminDashboard onLogout={handleAdminLogout} />
          ) : currentPage === 'reviews' ? (
            <Reviews onGoBack={handleGoBack} />
          ) : (
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
              {currentPage !== 'view' && <Header onOpenSettings={() => setActiveModal('settings')} />}

              <main className="flex-1">
                {currentPage === 'landing' && (
                  <Landing onStart={handleStart} onOpenLogin={() => setActiveModal('login')} />
                )}
                {currentPage === 'create' && <CreateGift />}
                {currentPage === 'view' && (
                  <GiftView giftId={giftId} onCreateAnother={handleCreateAnother} />
                )}
              </main>

              {currentPage !== 'view' && (
                <Footer
                  onOpenRating={() => setActiveModal('rating')}
                  onOpenSuggestion={() => setActiveModal('suggestion')}
                  onOpenPrivacy={() => setActiveModal('privacy')}
                  onOpenTerms={() => setActiveModal('terms')}
                  onOpenContact={() => setActiveModal('contact')}
                  onOpenReviews={handleOpenReviews}
                />
              )}

              {activeModal === 'login' && (
                <Login
                  onClose={() => setActiveModal(null)}
                  onSwitchToRegister={() => setActiveModal('register')}
                  onSwitchToAdmin={() => setActiveModal('admin')}
                />
              )}

              {activeModal === 'register' && (
                <Register
                  onClose={() => setActiveModal(null)}
                  onSwitchToLogin={() => setActiveModal('login')}
                />
              )}

              {activeModal === 'admin' && (
                <AdminLogin
                  onClose={() => setActiveModal(null)}
                  onSuccess={() => {
                    setActiveModal(null);
                    setCurrentPage('admin');
                    window.history.pushState({}, '', '/admin');
                  }}
                />
              )}

              {activeModal === 'privacy' && <Privacy onClose={() => setActiveModal(null)} />}

              {activeModal === 'terms' && <Terms onClose={() => setActiveModal(null)} />}

              {activeModal === 'contact' && <Contact onClose={() => setActiveModal(null)} />}

              {activeModal === 'suggestion' && (
                <SuggestionModal onClose={() => setActiveModal(null)} />
              )}

              {activeModal === 'rating' && <RatingModal onClose={() => setActiveModal(null)} />}

              {activeModal === 'settings' && <Settings onClose={() => setActiveModal(null)} />}
            </div>
          )}
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
