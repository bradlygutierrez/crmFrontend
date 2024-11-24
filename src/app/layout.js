'use client'
import { usePathname } from 'next/navigation'; // Solo una vez
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./components/sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({ children }) {
  const pathname = usePathname(); // Solo una vez

  // Rutas donde no queremos mostrar el Sidebar
  const noSidebarRoutes = ["/pages/registro", "/pages/passwordRecovery"];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-full w-full">
          {/* Condicionalmente mostrar el Sidebar */}
          {!noSidebarRoutes.includes(pathname) && (
            <div className="flex-shrink-0 w-[13rem]">
              <Sidebar />
            </div>
          )}
          {/* Main content */}
          <div className="flex-grow bg-gray-100 p-7">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
