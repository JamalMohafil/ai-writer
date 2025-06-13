import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const inter = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "İngilizce Ödev Asistanı - AI Destekli Ödev Yardımcısı",
  description:
    "🚀 Yapay zeka ile İngilizce ödevlerinizi kolayca çözün! Türkçe açıklamalar, AI görseller ve kişisel web sitenizi oluşturun. İngilizce öğreniminde başarıya giden yolunuz burada başlıyor.",
  keywords: [
    "İngilizce ödev",
    "AI ödev yardımı",
    "İngilizce öğrenme",
    "Türkçe açıklama",
    "yapay zeka",
    "ödev asistanı",
    "İngilizce gramer",
    "essay yazma",
    "paragraph yazma",
    "İngilizce kompozisyon",
    "öğrenci yardımı",
    "eğitim teknolojisi",
  ],
  authors: [{ name: "Jamal Mohafil", url: "https://www.instagram.com/jamal_mohafil/" }],
  creator: "Jamal Mohafil",
  publisher: "İngilizce Ödev Asistanı",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_VERCEL_URL as string), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "İngilizce Ödev Asistanı - AI Destekli Ödev Yardımcısı",
    description:
      "🎯 Yapay zeka ile İngilizce ödevlerinizi çözün, Türkçe açıklamalar alın ve muhteşem web sitenizi oluşturun!",
    url: process.env.NEXT_PUBLIC_VERCEL_URL as string,
    siteName: "İngilizce Ödev Asistanı",
  
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İngilizce Ödev Asistanı - AI Destekli Ödev Yardımcısı",
    description: "🚀 Yapay zeka ile İngilizce ödevlerinizi çözün ve muhteşem web sitenizi oluşturun!",
    creator: "@jamal_mohafil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        {/* Additional meta tags for better SEO */}
        <meta name="theme-color" content="#1e293b" />
        <meta name="color-scheme" content="dark light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="İngilizce Ödev Asistanı" />

        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "İngilizce Ödev Asistanı",
              description:
                "Yapay zeka destekli İngilizce ödev yardımcısı. Türkçe açıklamalar, AI görseller ve kişisel web sitesi oluşturma.",
              url:process.env.NEXT_PUBLIC_VERCEL_URL as string,
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "TRY",
              },
              creator: {
                "@type": "Person",
                name: "Jamal Mohafil",
                url: "https://www.instagram.com/jamal_mohafil/",
              },
              featureList: [
                "AI destekli İngilizce ödev çözme",
                "Türkçe açıklamalar",
                "Görsel oluşturma",
                "Kişisel web sitesi oluşturma",
                "Çoklu konu desteği",
                "Responsive tasarım",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">{children}</div>

        {/* Analytics scripts can be added here */}
        {/* Google Analytics, etc. */}
      </body>
    </html>
  )
}
