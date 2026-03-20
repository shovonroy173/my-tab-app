import { Redirect, Stack } from 'expo-router';

import { useAppSession } from '@/src/features/session/session-context';
import { BootSplashScreen } from '@/src/shared/ui/boot-splash-screen';

export default function AppLayout() {
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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="profile/[handle]" />
    </Stack>
  );
}
