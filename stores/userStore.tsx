import { User } from "firebase/auth";
import { create } from "zustand";

interface IUserStore {
    user: User | null;
    setUser: (u: User | null) => void;
}

export const useUserStore = create<IUserStore>()((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
