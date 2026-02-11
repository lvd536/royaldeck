import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavPanel from "@/components/NavPanel";
import AuthWrapper from "@/components/AuthWrapper";
import firebase from "firebase/compat/app";
import { auth } from "@/utils/database/firebase";
import { redirect } from "next/navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const clashRegular = localFont({
    src: "../public/fonts/Clash_Regular.otf",
    variable: "--font-clash-regular",
    weight: "400",
});

const clashBold = localFont({
    src: "../public/fonts/Clash_Bold.otf",
    variable: "--font-clash-bold",
    weight: "700",
});

export const metadata: Metadata = {
    title: "ClashDeck",
    description: "ClashDeck",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`flex ${geistSans.variable} ${geistMono.variable} ${clashRegular.variable} ${clashBold.variable} antialiased`}
            >
                <AuthWrapper>
                    <NavPanel />
                    <main className="w-full">{children}</main>
                </AuthWrapper>
            </body>
        </html>
    );
}
