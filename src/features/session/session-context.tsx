import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { delay } from '@/src/shared/lib/delay';
import { appStorage } from '@/src/shared/lib/storage';

type AuthUser = {
  email: string;
  fullName: string;
};

type PersistedSession = {
  hasCompletedOnboarding: boolean;
  user: AuthUser | null;
};

type SignInPayload = {
  email: string;
  password: string;
};

type SignUpPayload = {
  email: string;
  fullName: string;
  password: string;
};

type AppSessionContextValue = {
  authBusy: boolean;
  completeOnboarding: () => Promise<void>;
  currentUser: AuthUser | null;
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
  isHydrated: boolean;
  resetDemo: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<string>;
  signIn: (payload: SignInPayload) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
};

const defaultSession: PersistedSession = {
  hasCompletedOnboarding: false,
  user: null,
};

const AppSessionContext = createContext<AppSessionContextValue | null>(null);

export function AppSessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<PersistedSession>(defaultSession);
  const [isHydrated, setIsHydrated] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      const storedSession = await appStorage.get<PersistedSession>('app-session');
      await delay(900);

      if (!isMounted) {
        return;
      }

      if (storedSession) {
        setSession(storedSession);
      }

      setIsHydrated(true);
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateSession = async (nextSession: PersistedSession) => {
    setSession(nextSession);
    await appStorage.set('app-session', nextSession);
  };

  const value = useMemo<AppSessionContextValue>(
    () => ({
      authBusy,
      completeOnboarding: async () => {
        await updateSession({
          ...session,
          hasCompletedOnboarding: true,
        });
      },
      currentUser: session.user,
      hasCompletedOnboarding: session.hasCompletedOnboarding,
      isAuthenticated: Boolean(session.user),
      isHydrated,
      resetDemo: async () => {
        await updateSession(defaultSession);
      },
      sendPasswordReset: async (email: string) => {
        validateEmail(email);
        setAuthBusy(true);
        try {
          await delay(700);
          return `A reset link would be sent to ${email} in a real backend integration.`;
        } finally {
          setAuthBusy(false);
        }
      },
      signIn: async ({ email, password }) => {
        validateEmail(email);
        validatePassword(password);
        setAuthBusy(true);

        try {
          await delay(900);
          await updateSession({
            hasCompletedOnboarding: true,
            user: {
              email: email.trim().toLowerCase(),
              fullName: inferNameFromEmail(email),
            },
          });
        } finally {
          setAuthBusy(false);
        }
      },
      signOut: async () => {
        await updateSession({
          ...session,
          user: null,
        });
      },
      signUp: async ({ email, fullName, password }) => {
        validateName(fullName);
        validateEmail(email);
        validatePassword(password);
        setAuthBusy(true);

        try {
          await delay(1000);
          await updateSession({
            hasCompletedOnboarding: true,
            user: {
              email: email.trim().toLowerCase(),
              fullName: fullName.trim(),
            },
          });
        } finally {
          setAuthBusy(false);
        }
      },
    }),
    [authBusy, isHydrated, session],
  );

  return <AppSessionContext.Provider value={value}>{children}</AppSessionContext.Provider>;
}

export function useAppSession() {
  const context = useContext(AppSessionContext);

  if (!context) {
    throw new Error('useAppSession must be used within an AppSessionProvider.');
  }

  return context;
}

function validateEmail(email: string) {
  if (!email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error('Enter a valid email address.');
  }
}

function validatePassword(password: string) {
  if (password.trim().length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }
}

function validateName(fullName: string) {
  if (fullName.trim().length < 3) {
    throw new Error('Full name must be at least 3 characters long.');
  }
}

function inferNameFromEmail(email: string) {
  const [firstPart] = email.trim().split('@');
  return firstPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((segment) => `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`)
    .join(' ');
}
