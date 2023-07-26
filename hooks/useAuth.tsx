import { create } from "zustand";

interface AuthStore {
    logggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const useAuth = create<AuthStore>((set) => ({
    logggedIn: false,
    login: () => set({logggedIn: true}),
    logout: () => set({logggedIn: false})
}))

export default useAuth;