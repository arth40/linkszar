// usePWAInstallPrompt.ts
import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const PROMPT_GAP = 1 * 24 * 60 * 60 * 1000;

export function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // const alreadyPrompted = localStorage.getItem('pwa-install-prompted');
    const promptDate = localStorage.getItem('pwa-install-prompted');

    const handler = (e: Event) => {
      e.preventDefault();

      if (
        !promptDate ||
        Date.now() - new Date(promptDate!).getTime() >= PROMPT_GAP
      ) {
        const promptEvent = e as BeforeInstallPromptEvent;
        setDeferredPrompt(promptEvent);
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const promptToInstall = async () => {
    setShowPrompt(false);
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      console.log('App install: ', choice);
      localStorage.setItem('pwa-install-prompted', new Date().toISOString());
    }
  };

  const clearPromptData = async () => {
    localStorage.setItem('pwa-install-prompted', new Date().toISOString());
  };

  return { showPrompt, promptToInstall, clearPromptData };
}
