import { StyleSheet, Text, View } from 'react-native';

import { SocialAvatar } from '@/src/features/social/components/social-avatar';
import { SocialProfile } from '@/src/features/social/social-data';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh } from '@/src/shared/theme/responsive';

type ProfileSummaryCardProps = {
  profile: SocialProfile;
  stats: {
    followers: number;
    following: number;
    posts: number;
  };
};

export function ProfileSummaryCard({ profile, stats }: ProfileSummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <SocialAvatar profile={profile} size={76} />
        <View style={styles.copy}>
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.handle}>@{profile.handle}</Text>
          <Text style={styles.headline}>{profile.headline}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{profile.bio}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>{profile.location}</Text>
        <Text style={styles.meta}>{profile.interests.join(' • ')}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.posts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.xl,
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
    fontSize: typography.title,
    fontWeight: '800',
  },
  handle: {
    color: colors.accent,
    fontSize: typography.label,
    fontWeight: '700',
  },
  headline: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: rh(22),
  },
  bio: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: rh(24),
  },
  metaRow: {
    gap: spacing.sm,
  },
  meta: {
    color: colors.textMuted,
    fontSize: typography.label,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stat: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    flex: 1,
    gap: 4,
    padding: spacing.md,
  },
  statValue: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
});
