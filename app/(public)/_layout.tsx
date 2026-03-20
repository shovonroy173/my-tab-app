import { Redirect, Stack, useSegments } from 'expo-router';

import { useAppSession } from '@/src/features/session/session-context';
import { BootSplashScreen } from '@/src/shared/ui/boot-splash-screen';

export default function PublicLayout() {
  const { isHydrated, hasCompletedOnboarding, isAuthenticated } = useAppSession();
  const segments = useSegments();
  const activePublicRoute = segments[1];

  if (!isHydrated) {
    return <BootSplashScreen />;
  }

  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  if (!hasCompletedOnboarding && activePublicRoute !== 'onboarding') {
    return <Redirect href="/(public)/onboarding" />;
  }

  if (hasCompletedOnboarding && activePublicRoute === 'onboarding') {
    return <Redirect href="/(public)/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />;
}
