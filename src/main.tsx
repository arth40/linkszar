import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';
import './tailwinds.css';
import './index.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <main className="linkser-light text-foreground bg-background">
          <ToastProvider />
          <App />
        </main>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
);
