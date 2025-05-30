import { UserResponse } from "@/lib/types";
import { create } from "zustand";

export interface ProfileState {
  profile: UserResponse | null;
  setProfile: (profile: UserResponse) => void;
}
export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
