import { getUserCredits, IUserRecord } from "@/app/actions";
import { useEffect, useState } from "react";

export function useUserProfile(userId: string | undefined) {
    const [user, setUser] = useState<IUserRecord | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const user = await getUserCredits(userId);
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setError("Failed to load user data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    return { user, loading, error };
}
