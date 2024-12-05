import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/query-provider";

import { Space_Mono, Source_Code_Pro } from "next/font/google";
import CallLogProvider from "@/context/call-log-provider";
import { Toaster } from "@/components/ui/toaster";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-scp",
});

export const metadata: Metadata = {
  title: "Bravo Dispatch",
  description: "Your AI powered assistant for emergency dispatch calls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${sourceCodePro.variable} font-scp antialiased`}>
        <QueryProvider>
          <CallLogProvider>
            {children}
            {/* <Toaster /> */}
          </CallLogProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
