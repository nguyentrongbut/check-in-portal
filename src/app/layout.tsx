import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import React from "react";
import ProgressWrapper from "@/components/common/progress.wrapper";
import ScrollToTop from "@/components/common/scroll.to.top";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://localhunt.io.vn'),
    title: 'Local Hunt - Location-based Check-in Marketing Platform',
    description:
        'Local Hunt is a location-based marketing platform that helps merchants attract customers through check-in tasks, reward points, and digital vouchers.',
    generator: 'Next.js',
    applicationName: 'Local Hunt',
    referrer: 'origin-when-cross-origin',
    keywords: [
        'Local Hunt',
        'check-in marketing',
        'location-based marketing',
        'local advertising',
        'reward points',
        'voucher platform',
        'merchant marketing',
    ],
    authors: [
        { name: 'Cloly' },
        { name: 'Local Hunt', url: 'https://localhunt.io.vn' },
    ],
    creator: 'Local Hunt',
    publisher: 'Local Hunt',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Local Hunt - Location-based Check-in Marketing Platform',
        description:
            'Discover Local Hunt, the ecosystem that enables merchants to launch check-in campaigns while users earn points and redeem digital vouchers.',
        url: 'https://localhunt.io.vn',
        siteName: 'Local Hunt',
        images: [
            {
                url: '/icon/localhunt-icon.png',
                width: 1200,
                height: 630,
                alt: 'Local Hunt Logo',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@localhunt',
        creator: '@localhunt',
        title: 'Local Hunt - Check-in Marketing Platform',
        description:
            'Local Hunt helps merchants attract and engage customers with check-in campaigns, points, and digital rewards.',
        images: ['/icon/localhunt-icon.png'],
    },
    alternates: {
        canonical: 'https://localhunt.io.vn',
        languages: {
            en: 'https://localhunt.io.vn/en',
            vi: 'https://localhunt.io.vn/vi',
        },
    },
    category: 'Marketing',
    themeColor: '#ff6c2f',
    colorScheme: 'light',
    icons: {
        icon: [
            { url: "/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/icon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
            { url: "/icon/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
        ],
        apple: [
            { url: "/icon/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
            { url: "/icon/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
            { url: "/icon/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
            { url: "/icon/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
            { url: "/icon/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
            { url: "/icon/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
            { url: "/icon/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
            { url: "/icon/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
            { url: "/icon/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
        ],
    },
    manifest: "/icon/manifest.json",
    verification: {
        google: `${process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_CODE}`,
    },
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/icon/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="manifest" href="/icon/manifest.json" />
            <meta name="msapplication-config" content="/icon/browserconfig.xml" />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f9f7f7]`}
        >
        <ProgressWrapper>
            <main className='select-none'>
                {children}
            </main>
        </ProgressWrapper>
        <Toaster
            position="top-center"
            toastOptions={{
                className: 'text-sm shadow-md rounded-lg text-amber-500 text-center',
            }}
        ></Toaster>
        </body>
        </html>
    );
}
