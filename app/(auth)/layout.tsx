"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/database/firebase";
import { useUserStore } from "@/stores/userStore";
import { browserRoutes } from "@/consts/browserRoutes";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                router.replace(browserRoutes.home.link);
            } else if (user && !user.emailVerified) {
                router.replace(browserRoutes.auth.emailVerification.link);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) return <div>Loading...</div>;

    return <>{children}</>;
}
