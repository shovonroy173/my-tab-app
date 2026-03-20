import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/src/shared/theme/tokens';
import { rh, rw } from '@/src/shared/theme/responsive';

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <View style={[styles.shell, compact ? styles.shellCompact : undefined]}>
      <View style={styles.dot} />
      <View style={styles.bar} />
      <View style={styles.barShort} />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: rw(24),
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    height: rh(72),
    justifyContent: 'center',
    width: rw(72),
  },
  shellCompact: {
    height: rh(60),
    width: rw(60),
  },
  dot: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    height: rh(14),
    width: rw(14),
  },
  bar: {
    backgroundColor: colors.text,
    borderRadius: radius.pill,
    height: rh(26),
    width: rw(10),
  },
  barShort: {
    backgroundColor: '#38BDF8',
    borderRadius: radius.pill,
    height: rh(18),
    width: rw(10),
  },
});
