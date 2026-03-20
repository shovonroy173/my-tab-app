import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/src/shared/ui/brand-mark';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh, rw } from '@/src/shared/theme/responsive';

export function BootSplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.orbLarge} />
      <View style={styles.orbSmall} />
      <BrandMark />
      <Text style={styles.title}>MyTabApp</Text>
      <Text style={styles.subtitle}>Preparing your workspace and restoring the session flow.</Text>
      <ActivityIndicator color={colors.accent} size="small" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: spacing.xl,
  },
  orbLarge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderRadius: rw(220),
    height: rh(220),
    position: 'absolute',
    right: -70,
    top: 120,
    width: rw(220),
  },
  orbSmall: {
    backgroundColor: colors.accentSoft,
    borderRadius: rw(150),
    bottom: 140,
    height: rh(150),
    left: -40,
    position: 'absolute',
    width: rw(150),
  },
  title: {
    color: colors.text,
    fontSize: typography.titleXL,
    fontWeight: '800',
    letterSpacing: -1,
    marginTop: spacing.lg,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: rh(23),
    marginTop: spacing.sm,
    maxWidth: rw(260),
    textAlign: 'center',
  },
  loader: {
    marginTop: spacing.lg,
  },
});
