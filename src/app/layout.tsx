import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SwitchLang from "@/components/ui/switch-lang";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfólio | marotta.dev",
  description: "Hello, welcome to my portfolio | marotta.dev",
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <GoogleAnalytics gaId="GTM-5PGF26TQ" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-4 right-4">
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
