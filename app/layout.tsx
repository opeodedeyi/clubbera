import type { Metadata } from "next";
import { AuthProvider } from '@/hooks/useAuth';
import AuthToggle from '@/components/dev/AuthToggle';
import Header from "@/components/layout/Header/Header";
import { ThemeProvider } from 'next-themes';
import { boris, nunito } from "@/fonts/fonts";
import "@/styles/globals.css";


export const metadata: Metadata = {
    title: "Clubbera",
    description: "Finding your tribe",
    icons: {
        icon: [
            { url: '/icons/favicon.ico' },
            { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
            { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
            </head>
            <body className={`${boris.variable} ${nunito.variable}`}>
                <ThemeProvider
                    attribute="data-theme" 
                    defaultTheme="system"
                    enableSystem={true}
                    disableTransitionOnChange={false}>
                        <AuthProvider>
                            <Header />
                            <main>{children}</main>
                            <AuthToggle />
                        </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
