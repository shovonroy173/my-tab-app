import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { FollowCard } from '@/src/features/social/components/follow-card';
import { PostCard } from '@/src/features/social/components/post-card';
import { ProfileSummaryCard } from '@/src/features/social/components/profile-summary-card';
import { useSocial } from '@/src/features/social/social-context';
import { Screen } from '@/src/shared/ui/screen';
import { colors, spacing, typography } from '@/src/shared/theme/tokens';
import { rh } from '@/src/shared/theme/responsive';

export default function PublicProfileScreen() {
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const { followUser, followingIds, getPostsByProfileId, getProfileByHandle, profilesById, stats, unfollowUser } = useSocial();
  const profile = getProfileByHandle(handle);

  if (!profile) {
    return (
      <Screen contentContainerStyle={styles.fallback}>
        <Text style={styles.fallbackTitle}>Profile not found</Text>
        <Text style={styles.fallbackCopy}>That creator does not exist in the current demo dataset.</Text>
      </Screen>
    );
  }

  const profilePosts = getPostsByProfileId(profile.id);
  const isFollowing = followingIds.includes(profile.id);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={profilePosts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <ProfileSummaryCard profile={profile} stats={stats(profile.id)} />
            <FollowCard
              compact
              profile={profile}
              isFollowing={isFollowing}
              onOpen={() => undefined}
              onToggleFollow={() => (isFollowing ? unfollowUser(profile.id) : followUser(profile.id))}
            />
            <Text style={styles.sectionTitle}>Recent posts</Text>
          </View>
        }
        renderItem={({ item }) => (
          <PostCard
            post={item}
            author={profilesById[item.authorId]}
            onPressAuthor={() => undefined}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '700',
  },
  separator: {
    height: spacing.md,
  },
  fallback: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  fallbackTitle: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
  },
  fallbackCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: rh(22),
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
