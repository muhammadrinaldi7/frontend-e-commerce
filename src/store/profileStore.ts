import { UserResponse } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProfileState {
  profile: UserResponse | null;
  isAuthenticated: boolean;
  isAdmin: number;
  setProfile: (profile: UserResponse) => void;
  logout: () => void;
}
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      isAuthenticated: false,
      isAdmin: 0,
      setProfile: (profile) =>
        set({ profile, isAuthenticated: true, isAdmin: profile.is_admin }),
      logout: () => {
        sessionStorage.removeItem("user");
        set({ profile: null, isAuthenticated: false, isAdmin: 0 });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
