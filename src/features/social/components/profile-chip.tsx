import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SocialAvatar } from '@/src/features/social/components/social-avatar';
import { SocialProfile } from '@/src/features/social/social-data';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rw } from '@/src/shared/theme/responsive';

type ProfileChipProps = {
  onPress: () => void;
  profile: SocialProfile;
};

export function ProfileChip({ onPress, profile }: ProfileChipProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <SocialAvatar profile={profile} size={52} />
      <View style={styles.copy}>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.handle}>@{profile.handle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
    width: rw(150),
  },
  copy: {
    gap: 2,
  },
  name: {
    color: colors.text,
    fontSize: typography.label,
    fontWeight: '700',
    textAlign: 'center',
  },
  handle: {
    color: colors.textMuted,
    fontSize: typography.caption,
    textAlign: 'center',
  },
});
