"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/database/firebase";
import { useUserStore } from "@/stores/userStore";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const { setUser } = useUserStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.replace("/auth");
            } else if (!user.emailVerified) {
                router.replace("/auth/emailVerification");
            } else {
                setAuthorized(true);
                setUser(user);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) return <div>Loading...</div>;

    if (!authorized) return null;

    return <>{children}</>;
}
