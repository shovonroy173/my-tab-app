import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { FollowCard } from "@/src/features/social/components/follow-card";
import { useSocial } from "@/src/features/social/social-context";
import { rh } from "@/src/shared/theme/responsive";
import { colors, spacing, typography } from "@/src/shared/theme/tokens";
import { Screen } from "@/src/shared/ui/screen";

export default function NetworkScreen() {
  const { discoverProfiles, followUser, followingIds, unfollowUser } =
    useSocial();

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={discoverProfiles}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Network</Text>
            <Text style={styles.title}>Build your following graph.</Text>
            <Text style={styles.subtitle}>
              Follow and unfollow people from a dedicated discovery view so the
              feed reflects your interests.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <FollowCard
            profile={item}
            isFollowing={followingIds.includes(item.id)}
            onOpen={() => router.push(`/(app)/profile/${item.handle}`)}
            onToggleFollow={() =>
              followingIds.includes(item.id)
                ? unfollowUser(item.id)
                : followUser(item.id)
            }
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
    // paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.xl,
  },
  header: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    color: colors.text,
    fontSize: typography.titleLarge,
    fontWeight: "800",
    letterSpacing: -1,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: rh(23),
  },
  separator: {
    height: spacing.md,
  },
});
