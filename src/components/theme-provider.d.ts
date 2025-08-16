declare module '@/components/theme-provider' {
  import { ReactNode } from 'react';
  
  interface ThemeProviderProps {
    children: ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
  }
  
  export function ThemeProvider(props: ThemeProviderProps): JSX.Element;
}
