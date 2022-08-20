import './shared/styles/global.css';
import '@seed-design/stylesheet/global.css';

import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@shared/constant';
import { ModalProvider } from '@shared/contexts/ModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const queryClient = new QueryClient();
const isDev = process.env.NODE_ENV === 'development';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
        <ModalProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            {isDev && <ReactQueryDevtools initialIsOpen={false} />}
          </QueryClientProvider>
        </ModalProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
