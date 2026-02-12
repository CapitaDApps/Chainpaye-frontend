// Service Worker for offline support and caching
const CACHE_NAME = 'chainpaye-payment-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/assets/chainpaye.png',
  '/assets/Favicon.png',
  // Add other static assets as needed
];

const API_CACHE_URLS = [
  '/api/v1/payment-links/',
  '/api/v1/record-transaction/',
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Installed');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Install failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy
  if (API_CACHE_URLS.some(apiUrl => url.pathname.startsWith(apiUrl))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before caching
          const responseClone = response.clone();
          
          // Only cache successful responses
          if (response.status === 200) {
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // Return a custom offline response for API calls
              return new Response(
                JSON.stringify({
                  success: false,
                  message: 'You are currently offline. Please check your internet connection.',
                  offline: true
                }),
                {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
            });
        })
    );
    return;
  }

  // Handle static resources with cache-first strategy
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response before caching
              const responseClone = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
              
              return response;
            })
            .catch(() => {
              // Return a custom offline page for navigation requests
              if (request.mode === 'navigate') {
                return new Response(
                  `
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <title>Offline - Chainpaye</title>
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <style>
                        body { 
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                          display: flex; 
                          align-items: center; 
                          justify-content: center; 
                          min-height: 100vh; 
                          margin: 0; 
                          background: #f3f4f6;
                        }
                        .container { 
                          text-align: center; 
                          padding: 2rem; 
                          background: white; 
                          border-radius: 8px; 
                          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                          max-width: 400px;
                        }
                        .icon { 
                          font-size: 4rem; 
                          margin-bottom: 1rem; 
                        }
                        h1 { 
                          color: #374151; 
                          margin-bottom: 0.5rem; 
                        }
                        p { 
                          color: #6b7280; 
                          margin-bottom: 1.5rem; 
                        }
                        button { 
                          background: #3b82f6; 
                          color: white; 
                          border: none; 
                          padding: 0.75rem 1.5rem; 
                          border-radius: 6px; 
                          cursor: pointer; 
                          font-size: 1rem;
                        }
                        button:hover { 
                          background: #2563eb; 
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <div class="icon">📡</div>
                        <h1>You're Offline</h1>
                        <p>Please check your internet connection and try again.</p>
                        <button onclick="window.location.reload()">Retry</button>
                      </div>
                    </body>
                  </html>
                  `,
                  {
                    headers: {
                      'Content-Type': 'text/html'
                    }
                  }
                );
              }
              
              return new Response('Offline', { status: 503 });
            });
        })
    );
  }
});

// Handle background sync for failed transactions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-transaction') {
    event.waitUntil(
      // Retry failed transaction recordings
      retryFailedTransactions()
    );
  }
});

// Handle push notifications (for payment status updates)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Payment status update',
      icon: '/assets/Favicon.png',
      badge: '/assets/Favicon.png',
      tag: 'payment-notification',
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'View Payment'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Chainpaye Payment', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/payment/' + event.notification.data?.paymentId || '/')
    );
  }
});

// Retry failed transactions function
async function retryFailedTransactions() {
  try {
    // Get failed transactions from IndexedDB or localStorage
    const failedTransactions = JSON.parse(localStorage.getItem('failed_transactions') || '[]');
    
    for (const transaction of failedTransactions) {
      try {
        const response = await fetch(transaction.url, transaction.options);
        
        if (response.ok) {
          // Remove successful transaction from failed list
          const updatedFailedTransactions = failedTransactions.filter(
            t => t.id !== transaction.id
          );
          localStorage.setItem('failed_transactions', JSON.stringify(updatedFailedTransactions));
          
          console.log('Background sync: Transaction retry successful', transaction.id);
        }
      } catch (error) {
        console.error('Background sync: Transaction retry failed', transaction.id, error);
      }
    }
  } catch (error) {
    console.error('Background sync: Failed to retry transactions', error);
  }
}