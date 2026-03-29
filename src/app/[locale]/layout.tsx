import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { PageTransition } from "@/components/PageTransition";
import { GridOverlay } from "@/components/GridOverlay";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

// ... keep fonts ...
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

// ... wait, metadata can also be generated dynamically with `generateMetadata`, but for now I'll just change the layout.

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const isArabic = resolvedParams.locale === 'ar';
  
  const title = isArabic 
    ? "يوسف عثماني | التدريب الرياضي الاحترافي" 
    : "Youcef Otmani | Elite Performance Coaching";
    
  const description = isArabic 
    ? "تدريب شامل يجمع بين العلم، البيانات، والتحليل الحيوي. ارتقِ بأدائك." 
    : "More than just a program, a methodology forged through experience and science. Unlock your ultimate athletic potential.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'YouOtmani Coaching',
      images: [
        {
          url: '/hero.png', // Uses the public logo/image
          width: 1200,
          height: 630,
        },
      ],
      locale: isArabic ? 'ar_DZ' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero.png'], 
    },
    icons: {
      icon: '/icon.png',
      apple: '/icon.png',
    }
  };
}


export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Load messages
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${oswald.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-black text-white" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <GridOverlay />
          <SmoothScroll>
            <Navbar />
            <PageTransition>
              <main className="relative flex-1 flex flex-col">
                {children}
              </main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
