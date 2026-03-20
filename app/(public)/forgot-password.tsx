import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { useAppSession } from '@/src/features/session/session-context';
import { AppButton } from '@/src/shared/ui/app-button';
import { AppTextField } from '@/src/shared/ui/app-text-field';
import { Screen } from '@/src/shared/ui/screen';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh } from '@/src/shared/theme/responsive';

export default function ForgotPasswordScreen() {
  const { sendPasswordReset, authBusy } = useAppSession();
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      const message = await sendPasswordReset(email);
      Alert.alert('Password reset', message, [{ text: 'Back to sign in', onPress: () => router.replace('/(public)/sign-in') }]);
    } catch (error) {
      Alert.alert('Unable to send reset link', error instanceof Error ? error.message : 'Please try again.');
    }
  };

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.description}>
          Enter the email address attached to your account and we will simulate a reset handoff for the demo flow.
        </Text>
        <AppTextField
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@company.com"
          value={email}
        />
        <AppButton label={authBusy ? 'Sending link...' : 'Send reset link'} onPress={handleSubmit} disabled={authBusy} />
        <AppButton
          label="Back to sign in"
          onPress={() => router.replace('/(public)/sign-in')}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  card: {
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.bodyLarge,
    lineHeight: rh(24),
  },
});
