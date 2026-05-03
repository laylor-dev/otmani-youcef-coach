import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { PageTransition } from "@/components/PageTransition";
import { GridOverlay } from "@/components/GridOverlay";
import { ScrollToTop } from "@/components/ScrollToTop";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";


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

// Viewport — must be a separate export in Next.js App Router
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  const metadataConfig = {
    ar: {
      title: "يوسف عثماني | التدريب الرياضي والتحول البدني الاحترافي",
      description: "تدريب شامل يجمع بين العلم، البيانات، والتحليل الحيوي. ارتقِ بأدائك البدني مع يوسف عثماني، خبير التغذية العلاجية.",
      siteName: "يوسف عثماني كوتشينج",
    },
    en: {
      title: "Youcef Otmani | Elite Performance & Transformation Coaching",
      description: "Unlock your ultimate athletic potential through science-driven coaching. Expert nutrition, biomechanics, and personalized protocols by Youcef Otmani.",
      siteName: "Youcef Otmani Coaching",
    },
    fr: {
      title: "Youcef Otmani | Coaching Performance & Transformation Élite",
      description: "Optimisez votre potentiel physique grâce à une approche scientifique. Nutrition thérapeutique et protocoles personnalisés par Youcef Otmani.",
      siteName: "Youcef Otmani Coaching",
    }
  };

  const currentMetadata = metadataConfig[locale as keyof typeof metadataConfig] || metadataConfig.en;
  const baseUrl = "https://youcefotmani.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: currentMetadata.title,
      template: `%s | ${currentMetadata.siteName}`
    },
    description: currentMetadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
        'ar': '/ar',
      },
    },
    openGraph: {
      title: currentMetadata.title,
      description: currentMetadata.description,
      siteName: currentMetadata.siteName,
      url: `${baseUrl}/${locale}`,
      images: [
        {
          url: '/hero.png',
          width: 1200,
          height: 630,
          alt: currentMetadata.title,
        },
      ],
      locale: locale === 'ar' ? 'ar_DZ' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: ['/hero.png'], 
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/icon.png', type: 'image/png', sizes: '1024x1024' },
        { url: '/icon.png', type: 'image/png', sizes: '512x512' },
        { url: '/icon.png', type: 'image/png', sizes: '192x192' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      ],
      shortcut: '/icon.png',
      apple: [
        { url: '/icon.png', sizes: '180x180', type: 'image/png' },
      ],
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
      <body className="font-sans bg-black text-white overflow-x-hidden" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <GridOverlay />
          <ScrollToTop />
          <Navbar />
          <SmoothScroll>
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
