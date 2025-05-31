import { UserResponse } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProfileState {
  profile: UserResponse | null;
  isAuthenticated: boolean;
  setProfile: (profile: UserResponse) => void;
  logout: () => void;
}
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      isAuthenticated: false,
      setProfile: (profile) => set({ profile, isAuthenticated: true }),
      logout: () => {
        sessionStorage.removeItem("user");
        set({ profile: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
