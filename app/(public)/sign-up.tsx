import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';

import { useAppSession } from '@/src/features/session/session-context';
import { AppButton } from '@/src/shared/ui/app-button';
import { AppTextField } from '@/src/shared/ui/app-text-field';
import { BrandMark } from '@/src/shared/ui/brand-mark';
import { Screen } from '@/src/shared/ui/screen';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh } from '@/src/shared/theme/responsive';

export default function SignUpScreen() {
  const { signUp, authBusy } = useAppSession();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async () => {
    try {
      await signUp({ fullName, email, password });
      router.replace('/(app)/(tabs)');
    } catch (error) {
      Alert.alert('Unable to create account', error instanceof Error ? error.message : 'Please try again.');
    }
  };

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <BrandMark compact />
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.description}>
          This stack is set up for real authentication later, but already handles validation, route protection, and session state.
        </Text>
      </View>

      <View style={styles.formCard}>
        <AppTextField
          autoCapitalize="words"
          autoComplete="name"
          label="Full name"
          onChangeText={setFullName}
          placeholder="Shovon Ahmed"
          value={fullName}
        />
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
          autoComplete="new-password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Minimum 8 characters"
          secureTextEntry
          value={password}
        />
        <AppButton
          label={authBusy ? 'Creating account...' : 'Create account'}
          onPress={handleCreateAccount}
          disabled={authBusy}
        />
      </View>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Link href="/(public)/sign-in" style={styles.footerLink}>
          Sign in
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
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: typography.titleLarge,
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
