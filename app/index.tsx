import { Redirect } from 'expo-router';

import { BootSplashScreen } from '@/src/shared/ui/boot-splash-screen';
import { useAppSession } from '@/src/features/session/session-context';

export default function IndexScreen() {
  const { isHydrated, hasCompletedOnboarding, isAuthenticated } = useAppSession();

  if (!isHydrated) {
    return <BootSplashScreen />;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/(public)/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(public)/sign-in" />;
  }

  return <Redirect href="/(app)/(tabs)" />;
}
