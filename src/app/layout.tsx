import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'REALMN | Premium Streetwear Brand India',
    template: '%s | REALMN',
  },
  description:
    'Shop premium shirts, pants and streetwear online in India. Cash on Delivery available. Wear Confident — realmn.in',
  keywords: [
    'REALMN',
    'streetwear India',
    'buy shirts online India',
    'buy pants online India',
    'premium shirts COD',
    'streetwear brand India',
    'oversized shirts India',
    'casual shirts online',
    'men clothing India',
    'COD clothing India',
    'realmn.in',
    'wear confident',
    'fashion brand India',
    'affordable streetwear India',
    'online clothing store India',
  ],
  metadataBase: new URL('https://realmn.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'REALMN | Premium Streetwear Brand India',
    description:
      'Shop premium shirts, pants and streetwear online in India. Cash on Delivery available. Wear Confident.',
    url: 'https://realmn.in',
    siteName: 'REALMN',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // apni best product image yahan upload karo /public folder mein
        width: 1200,
        height: 630,
        alt: 'REALMN — Premium Streetwear Brand India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REALMN | Premium Streetwear Brand India',
    description:
      'Shop premium shirts, pants and streetwear. COD available across India. Wear Confident.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_KEY', // Google Search Console se key lena
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}