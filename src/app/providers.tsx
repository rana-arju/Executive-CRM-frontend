'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { TooltipProvider } from '@/components/ui/tooltip';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  );
}
