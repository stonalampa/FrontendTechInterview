import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
    isLogged: boolean;
    jwtToken: string;
    email: string;
    setIsLogged: (isLogged: boolean) => void;
    setJwtToken: (jwtToken: string) => void;
    setEmail: (email: string) => void;
}

export const useStore = create<Store>(
    devtools(
        persist(
            (set) => ({
                isLogged: false,
                jwtToken: "",
                email: "",
                setIsLogged: (isLogged) => set({ isLogged }),
                setJwtToken: (jwtToken) => set({ jwtToken }),
                setEmail: (email) => set({ email }),
            }),
            { name: "store" }
        )
    ) as StateCreator<Store, [], []>
);
