import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { SSRContext } from './contexts/SSRContext';
import { ConfirmationProvider } from './contexts/ConfirmationContext';
import { Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';

function App({ initialData }: { initialData?: any }) {
  // Get initial data from window if present (Hydration) or from global if server
  const ssrData = initialData
    || (typeof window !== 'undefined' ? (window as any).__SSR_DATA__ : null)
    || (typeof globalThis !== 'undefined' ? (globalThis as any).context : null)
    || {};

  return (
    <SSRContext.Provider value={ssrData}>
      <ConfirmationProvider>
        <div className="app-container">
          <Suspense fallback={<LoadingScreen />}>
            <AppRoutes />
          </Suspense>
        </div>
      </ConfirmationProvider>
    </SSRContext.Provider>
  );
}

export default App;
