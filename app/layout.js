import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "@/components/SessionWrapper";

// Import and configure the Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
export const metadata = {
  title: "QEvent", // Sets the page title
};

/**
 * Root layout component that wraps the entire application.
 * Provides session management, theming, and a global header.
 */
export default function RootLayout({ children }) {
  return (
    // Wraps the entire app in a session provider for authentication
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          {/* Provides theme support with a default light theme */}
          <ThemeProvider attribute="class" defaultTheme="light">
            {/* Global header component */}
            <Header />
            {/* Renders the main content of the page */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
