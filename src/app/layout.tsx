import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import SwitchLang from "@/components/ui/switch-lang";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL("https://marotta.dev"),
  title: {
    default: "Victor Marotta | Geospatial Software Engineer & Founder of Territorial",
    template: "%s | marotta.dev"
  },
  description: "Surveying and cartographic engineer building geospatial software. Founder of Territorial, an engineering consultancy, and Geographic Information Technologist at IBGE. Production platforms: pipelines, orchestration, and web, desktop and mobile clients.",
  keywords: ["geospatial software engineer", "surveying engineer", "GIS developer", "Territorial", "PostGIS", "GeoServer", "LADM", "point cloud processing", "n8n", "Next.js", "Kubernetes"],
  authors: [{ name: "Victor Marotta" }],
  creator: "Victor Marotta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marotta.dev",
    siteName: "marotta.dev",
    title: "Victor Marotta | Geospatial Software Engineer & Founder of Territorial",
    description: "Surveying engineer and full-stack developer. Founder of Territorial and Geographic Information Technologist at IBGE.",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Victor Marotta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Marotta | Geospatial Software Engineer & Founder of Territorial",
    description: "Surveying engineer and full-stack developer. Founder of Territorial and Geographic Information Technologist at IBGE.",
    images: ["/me.png"],
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
  verification: {
    // Add your verification codes here if needed
  },
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <GoogleAnalytics gaId="GTM-5PGF26TQ" />
        <link rel="canonical" href="https://marotta.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Victor Marotta",
              jobTitle: "Surveying and Cartographic Engineer",
              description: "Geospatial software engineer, founder of Territorial, and Geographic Information Technologist at IBGE.",
              url: "https://marotta.dev",
              sameAs: [
                "https://www.linkedin.com/in/victor-marotta-5055ab60/",
                "https://github.com/paschendale",
                "https://www.upwork.com/freelancers/~0147000a5df1523439",
                "https://territorial.dev",
              ],
              worksFor: [
                {
                  "@type": "Organization",
                  name: "Territorial",
                  url: "https://territorial.dev",
                },
                {
                  "@type": "GovernmentOrganization",
                  name: "IBGE - Instituto Brasileiro de Geografia e Estatística",
                  url: "https://www.ibge.gov.br",
                },
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Universidade Federal de Viçosa",
              },
              knowsAbout: [
                "GIS",
                "Geospatial Engineering",
                "PostGIS",
                "GeoServer",
                "LADM",
                "Cadastral Systems",
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "n8n",
                "Kubernetes",
                "Point cloud processing",
                "Photogrammetry",
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-4 right-4 z-50">
            <div className="flex flex-row gap-2">
              <SwitchLang/>
              <ModeToggle/>
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
