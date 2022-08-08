import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { FavoriteProvider } from './favorites/contexts/FavoriteContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 50000,
      cacheTime: 1000 * 60 * 60 * 15,
      retry: 10,
      retryDelay: 1000,
      refetchOnWindowFocus: true,
    },
  },
});

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavoriteProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </FavoriteProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
