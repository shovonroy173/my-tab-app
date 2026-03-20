import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SocialAvatar } from '@/src/features/social/components/social-avatar';
import { SocialProfile } from '@/src/features/social/social-data';
import { AppButton } from '@/src/shared/ui/app-button';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh } from '@/src/shared/theme/responsive';

type FollowCardProps = {
  compact?: boolean;
  isFollowing: boolean;
  onOpen: () => void;
  onToggleFollow: () => void;
  profile: SocialProfile;
};

export function FollowCard({ compact = false, isFollowing, onOpen, onToggleFollow, profile }: FollowCardProps) {
  return (
    <View style={[styles.card, compact ? styles.cardCompact : undefined]}>
      <Pressable onPress={onOpen} style={styles.top}>
        <SocialAvatar profile={profile} size={compact ? 56 : 60} />
        <View style={styles.copy}>
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.handle}>@{profile.handle}</Text>
          <Text style={styles.headline}>{profile.headline}</Text>
        </View>
      </Pressable>
      <Text style={styles.bio}>{profile.bio}</Text>
      <AppButton label={isFollowing ? 'Following' : 'Follow'} onPress={onToggleFollow} variant={isFollowing ? 'secondary' : 'primary'} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  cardCompact: {
    padding: spacing.md,
  },
  top: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: colors.text,
    fontSize: typography.bodyLarge,
    fontWeight: '700',
  },
  handle: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  headline: {
    color: colors.textMuted,
    fontSize: typography.label,
    lineHeight: rh(20),
  },
  bio: {
    color: colors.textMuted,
    fontSize: typography.label,
    lineHeight: rh(22),
  },
});
