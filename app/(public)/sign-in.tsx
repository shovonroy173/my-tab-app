import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';

import { useAppSession } from '@/src/features/session/session-context';
import { AppButton } from '@/src/shared/ui/app-button';
import { AppTextField } from '@/src/shared/ui/app-text-field';
import { BrandMark } from '@/src/shared/ui/brand-mark';
import { Screen } from '@/src/shared/ui/screen';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh } from '@/src/shared/theme/responsive';

export default function SignInScreen() {
  const { signIn, authBusy } = useAppSession();
  const [email, setEmail] = useState('founder@mytabapp.dev');
  const [password, setPassword] = useState('Password123');

  const handleSignIn = async () => {
    try {
      await signIn({ email, password });
      router.replace('/(app)/(tabs)');
    } catch (error) {
      Alert.alert('Unable to sign in', error instanceof Error ? error.message : 'Please try again.');
    }
  };

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <BrandMark />
        <View style={styles.copyBlock}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.description}>
            Sign in to continue where you left off. Demo credentials are prefilled so the flow is easy to test.
          </Text>
        </View>
      </View>

      <View style={styles.formCard}>
        <AppTextField
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@company.com"
          value={email}
        />
        <AppTextField
          autoComplete="password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
        />

        <Pressable onPress={() => router.push('/(public)/forgot-password')}>
          <Text style={styles.inlineLink}>Forgot your password?</Text>
        </Pressable>

        <AppButton label={authBusy ? 'Signing in...' : 'Sign in'} onPress={handleSignIn} disabled={authBusy} />
      </View>

      <Text style={styles.footerText}>
        New here?{' '}
        <Link href="/(public)/sign-up" style={styles.footerLink}>
          Create an account
        </Link>
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  header: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  copyBlock: {
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.titleXL,
    fontWeight: '800',
    letterSpacing: -1,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.bodyLarge,
    lineHeight: rh(24),
  },
  formCard: {
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  inlineLink: {
    color: colors.accent,
    fontSize: typography.label,
    fontWeight: '700',
    textAlign: 'right',
  },
  footerText: {
    color: colors.textMuted,
    fontSize: typography.body,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  footerLink: {
    color: colors.text,
    fontWeight: '700',
  },
});
