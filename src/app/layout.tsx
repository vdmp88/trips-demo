import { Metadata, Viewport } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer/Footer';
import StoreProvider from '@/app/StoreProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Tripscheck',
  description: 'Tripscheck app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </NextIntlClientProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
};
