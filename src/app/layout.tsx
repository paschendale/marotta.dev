import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import SwitchLang from "@/components/ui/switch-lang";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Victor Marotta | Full Stack Developer | Geospatial Specialist",
    template: "%s | marotta.dev"
  },
  description: "Full stack developer specializing in geotechnologies. Expert in React, Next.js, TypeScript, and geospatial libraries like Mapbox, OpenLayers, and GeoServer. Open to freelance opportunities.",
  keywords: ["full stack developer", "geospatial developer", "React developer", "Next.js", "TypeScript", "Mapbox", "OpenLayers", "GeoServer", "PostGIS", "freelance developer"],
  authors: [{ name: "Victor Marotta" }],
  creator: "Victor Marotta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marotta.dev",
    siteName: "marotta.dev",
    title: "Victor Marotta | Full Stack Developer | Geospatial Specialist",
    description: "Full stack developer specializing in geotechnologies. Expert in React, Next.js, TypeScript, and geospatial libraries.",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Victor Marotta - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Marotta | Full Stack Developer | Geospatial Specialist",
    description: "Full stack developer specializing in geotechnologies. Expert in React, Next.js, TypeScript, and geospatial libraries.",
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
              jobTitle: "Full Stack Developer",
              description: "Full stack developer specializing in geotechnologies",
              url: "https://marotta.dev",
              sameAs: [
                "https://www.linkedin.com/in/victor-marotta-5055ab60/",
                "https://github.com/paschendale",
                "https://www.upwork.com/freelancers/~0147000a5df1523439",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Geospatial Development",
                "Mapbox",
                "OpenLayers",
                "GeoServer",
                "PostGIS",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-4 right-4 z-50">
            <div className="flex flex-row gap-2">
              {/* <SwitchLang/> */}
              <ModeToggle/>
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
