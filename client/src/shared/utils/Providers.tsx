import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface ProviderProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = (props) => {
  const queryClient = new QueryClient();
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {props.children}
          {isDev && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Providers;
