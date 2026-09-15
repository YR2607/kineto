import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { ContactDialogProvider } from "@/components/contact/ContactDialogProvider";
import { getSiteUrl, siteConfig } from "@/config/site";
import { buildRootMetadata } from "@/lib/metadata";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();

  return (
    <html
      lang="ru"
      className={`${sourceSans3.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Перейти к основному содержанию
        </a>
        <ContactDialogProvider>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: siteConfig.name,
              description: siteConfig.description,
              ...(siteUrl ? { url: siteUrl.toString() } : {}),
              telephone: siteConfig.phoneInternational,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.address.street,
                addressLocality: siteConfig.address.city,
                addressCountry: siteConfig.address.country,
              },
              sameAs: [
                siteConfig.channels.instagram,
                siteConfig.channels.facebook,
              ],
            }}
          />
          {children}
        </ContactDialogProvider>
      </body>
    </html>
  );
}
