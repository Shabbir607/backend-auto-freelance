import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { SSRContext } from './contexts/SSRContext';
import { ConfirmationProvider } from './components/ConfirmationDialog';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
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
      <AuthProvider>
        <AppProvider>
          <ThemeProvider>
            <ToastProvider>
              <ConfirmationProvider>
                <div className="app-container">
                  <AppRoutes />
                </div>
              </ConfirmationProvider>
            </ToastProvider>
          </ThemeProvider>
        </AppProvider>
      </AuthProvider>
    </SSRContext.Provider>
  );
}

export default App;
