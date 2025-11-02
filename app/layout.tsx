import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { AuthProvider } from '@/hooks/useAuth';
import QueryProvider from '@/components/providers/QueryProvider';
import { HeaderVariantProvider } from '@/components/providers/HeaderVariantProvider';
import Header from "@/components/layout/Header/Header";
import ConditionalFooter from "@/components/layout/Footer/ConditionalFooter";
import ConditionalBottomNav from "@/components/layout/BottomNav/ConditionalBottomNav";
import EmailVerificationWrapper from "@/components/ui/EmailVerificationModal/EmailVerificationWrapper";
import TopLoadingBar from "@/components/ui/TopLoadingBar/TopLoadingBar";
import { ThemeProvider } from 'next-themes';
import { boris, nunito } from "@/fonts/fonts";
import "@/styles/globals.css";

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    interactiveWidget: 'resizes-content',
};

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
            <body className={`${boris.variable} ${nunito.variable}`}>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="system"
                    enableSystem={true}
                    disableTransitionOnChange={false}>
                        <QueryProvider>
                            <AuthProvider>
                                <HeaderVariantProvider>
                                    <TopLoadingBar />
                                    <Header className={isCommunityManage ? "desktop-only-flex" : ""} />
                                    <main>{children}</main>
                                    <ConditionalFooter />
                                    <EmailVerificationWrapper />
                                    <ConditionalBottomNav />
                                </HeaderVariantProvider>
                            </AuthProvider>
                        </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
