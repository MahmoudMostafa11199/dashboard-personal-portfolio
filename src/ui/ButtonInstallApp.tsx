/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { RiMobileDownloadLine } from 'react-icons/ri';
import { VscDesktopDownload } from 'react-icons/vsc';

let globalDeferredPrompt: any = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    globalDeferredPrompt = e;
  });
}

export function ButtonInstallApp() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<any>(globalDeferredPrompt);
  const [isInstallable, setIsInstallable] = useState(!!globalDeferredPrompt);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      globalDeferredPrompt = e;
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (globalDeferredPrompt) {
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = deferredPrompt || globalDeferredPrompt;
    if (!promptEvent) return;

    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;

    if (outcome === 'accepted') {
      setIsInstallable(false);
      globalDeferredPrompt = null;
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
      <VscDesktopDownload size={24} className="hidden md:block" />
      <RiMobileDownloadLine size={24} className="block md:hidden" />
    </button>
  );
}
