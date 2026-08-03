/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { RiMobileDownloadLine } from 'react-icons/ri';
import { VscDesktopDownload } from 'react-icons/vsc';

export function ButtonInstallApp() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      //
      e.preventDefault();

      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstallable(false);
    }

    setDeferredPrompt(null);
  };

  if (!isInstallable) return null;

  return (
    <button
      onClick={handleInstallClick}
      title="Install App"
      aria-label="Install App"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 group"
    >
      <VscDesktopDownload size={28} className="hidden md:block" />

      <RiMobileDownloadLine size={28} className="md:hidden block" />
    </button>

    // <button
    //   onClick={handleInstallClick}
    //   className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition fixed bottom-4 right-4 z-50 md:static md:bottom-auto md:right-auto md:mt-4"
    // >
    //   Install App 📱
    // </button>
  );
}
