import type { Metadata } from "next";
import { headers } from "next/headers";
import { AuthProvider } from '@/hooks/useAuth';
import Header from "@/components/layout/Header/Header";
import ConditionalFooter from "@/components/layout/Footer/ConditionalFooter";
import ConditionalBottomNav from "@/components/layout/BottomNav/ConditionalBottomNav";
import EmailVerificationWrapper from "@/components/ui/EmailVerificationModal/EmailVerificationWrapper";
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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = await headers();
    const pathname = headersList.get("x-invoke-path") || "";

    const isCommunityManage = /^\/community\/[^/]+$/.test(pathname);
    
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content" />
            </head>
            <body className={`${boris.variable} ${nunito.variable}`}>
                <ThemeProvider
                    attribute="data-theme" 
                    defaultTheme="system"
                    enableSystem={true}
                    disableTransitionOnChange={false}>
                        <AuthProvider>
                            <Header className={isCommunityManage ? "desktop-only-flex" : ""} />
                            <main>{children}</main>
                            <ConditionalFooter />
                            <ConditionalBottomNav />
                            <EmailVerificationWrapper />
                        </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
