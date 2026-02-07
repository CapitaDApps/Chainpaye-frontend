// Service Worker registration and management

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    console.log('Service Worker registered successfully:', registration);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker is available
            console.log('New service worker available');
            
            // Optionally show update notification to user
            if (window.confirm('A new version is available. Refresh to update?')) {
              window.location.reload();
            }
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const result = await registration.unregister();
      console.log('Service Worker unregistered:', result);
      return result;
    }
    return false;
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
    return false;
  }
};

// Check if the app is running in standalone mode (PWA)
export const isStandalone = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  return permission;
};

// Show local notification
export const showNotification = async (
  title: string,
  options: NotificationOptions = {}
): Promise<void> => {
  const permission = await requestNotificationPermission();
  
  if (permission === 'granted') {
    const registration = await navigator.serviceWorker.getRegistration();
    
    if (registration) {
      await registration.showNotification(title, {
        icon: '/assets/Favicon.png',
        badge: '/assets/Favicon.png',
        ...options
      });
    } else {
      new Notification(title, {
        icon: '/assets/Favicon.png',
        ...options
      });
    }
  }
};

// Background sync for failed requests
export const scheduleBackgroundSync = async (tag: string): Promise<void> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    if ('sync' in registration) {
      await (registration as any).sync.register(tag);
      console.log('Background sync scheduled:', tag);
    }
  } catch (error) {
    console.error('Background sync scheduling failed:', error);
  }
};

// Store failed transaction for retry
export const storeFailedTransaction = (
  id: string,
  url: string,
  options: RequestInit
): void => {
  try {
    const failedTransactions = JSON.parse(localStorage.getItem('failed_transactions') || '[]');
    
    failedTransactions.push({
      id,
      url,
      options: {
        ...options,
        body: typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
      },
      timestamp: Date.now()
    });
    
    // Keep only last 10 failed transactions
    if (failedTransactions.length > 10) {
      failedTransactions.splice(0, failedTransactions.length - 10);
    }
    
    localStorage.setItem('failed_transactions', JSON.stringify(failedTransactions));
    
    // Schedule background sync
    scheduleBackgroundSync('background-sync-transaction');
  } catch (error) {
    console.error('Failed to store failed transaction:', error);
  }
};

// Check online status
export const isOnline = (): boolean => {
  if (typeof window === 'undefined') return true;
  return navigator.onLine;
};

// Listen for online/offline events
export const setupOnlineOfflineListeners = (
  onOnline?: () => void,
  onOffline?: () => void
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleOnline = () => {
    console.log('App is online');
    onOnline?.();
  };

  const handleOffline = () => {
    console.log('App is offline');
    onOffline?.();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};