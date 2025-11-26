import { create } from "zustand";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { authService, type UserProfile } from "@/lib/auth";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  role: "admin" | "client" | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setRole: (role: "admin" | "client" | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  profile: null,
  role: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setRole: (role) => set({ role }),
  setLoading: (loading) => set({ loading }),
  signOut: async () => {
    await authService.signOut();
    set({ user: null, session: null, profile: null, role: null });
  },
}));

export function useAuth() {
  const store = useAuthStore();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        store.setSession(session);
        store.setUser(session?.user ?? null);

        // Defer profile and role fetching to avoid blocking
        if (session?.user) {
          setTimeout(async () => {
            const profile = await authService.getProfile(session.user.id);
            const role = await authService.getUserRole(session.user.id);
            store.setProfile(profile);
            store.setRole(role);
            store.setLoading(false);
          }, 0);
        } else {
          store.setProfile(null);
          store.setRole(null);
          store.setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      store.setSession(session);
      store.setUser(session?.user ?? null);

      if (session?.user) {
        const profile = await authService.getProfile(session.user.id);
        const role = await authService.getUserRole(session.user.id);
        store.setProfile(profile);
        store.setRole(role);
      }
      
      store.setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return store;
}
